import express, { Request, Response } from "express";
import { verify, VerifyErrors } from "jsonwebtoken";
const router = express.Router();

import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import nodemailer from "nodemailer";

// User Model
import User from "../models/user";
import {
  authenticateToken,
  generateAccessToken,
  generateRefreshToken,
  generateResetToken,
} from "./auth";

import { savedSearches, savedNews } from "../models/user";

// @route POST /users/signup
// @desc User Sign up
// @access Public
router.post("/signup", async (req, res) => {
  const { email, password } = req.body;
  // security https://dev.to/dipakkr/implementing-authentication-in-nodejs-with-express-and-jwt-codelab-1-j5i
  try {
    let user = await User.findOne({
      email,
    });
    if (user)
      res.status(400).json({
        msg: "User Already Exists",
      });

    const hashedPassword = await bcrypt.hash(password, 10);

    user = new User({
      email,
      password: hashedPassword,
    });

    const response = await user.save();

    if (!response) {
      throw new Error();
    } else {
      res.sendStatus(201);
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({
      msg: "Error saving user",
    });
  }
});

// @route POST /users/login
// @desc User log in
// @access Public
router.post("/login", async (req, res) => {
  const { email, password, remembered } = req.body;

  try {
    let user = await User.findOne({
      email,
    });

    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(400).json({ msg: "Incorrect account" });
    }

    const accessToken = generateAccessToken({ email });
    const refreshToken = generateRefreshToken({ email }, remembered);

    res.cookie("rt", refreshToken, {
      httpOnly: true,
    });
    res.cookie("at", accessToken, {
      httpOnly: true,
    });

    res.sendStatus(200);
  } catch (err) {
    res.status(500).json({ msg: "Server error" });
  }
});

const transporter = nodemailer.createTransport({
  port: 465, // true for 465, false for other ports
  host: "smtp.gmail.com",
  auth: {
    user: process.env.SMTP_EMAIL,
    pass: process.env.SMTP_PASSWORD,
  },
  secure: true,
});

router.post("/forgot", async (req, res) => {
  const email = req.body.email;
  try {
    let user = await User.findOne({
      email,
    });

    if (user) {
      const currentPassword = user.password;
      const resetToken = generateResetToken({
        password: currentPassword.slice(-6),
      });
      const resetLink = `${process.env.CLIENT}/reset/${email}/${resetToken}`;

      // await User.findOneAndUpdate(filter, update);

      const mailData = {
        from: "News Compare <newscompare@gmail.com>", // sender address
        to: email,
        subject: "Password Reset",
        text: `Your new password is ${resetLink}. Expires in 15 minutes.`,
      };
      await transporter.sendMail(mailData);
    }
  } catch (err) {
    console.log(err.message);
  } finally {
    return res.sendStatus(200);
  }
});

router.post("/change-password", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({
      email,
    });

    if (user) {
      const hashedPassword = await bcrypt.hash(password, 10);
      const filter = { email: email };
      const update = { password: hashedPassword };
      const updatedUser = await User.findOneAndUpdate(filter, update);

      if (updatedUser) {
        res.sendStatus(200);
      }
    } else {
      res.status(500).json({ msg: "Email does not exist" });
    }
  } catch (err) {
    console.log(err.message);
    res.sendStatus(500);
  }
});

router.post("/reset", async (req, res) => {
  const { email, resetToken, password } = req.body;

  try {
    const user = await User.findOne({
      email,
    });

    if (user) {
      const payload: any = jwt.verify(
        resetToken,
        process.env.RESET_TOKEN_SECRET
      );
      if (payload.password !== user.password.slice(-6)) {
        return res.status(403).json({ msg: "reset link expires" });
      }

      const hashedPassword = await bcrypt.hash(password, 10);
      const filter = { email: email };
      const update = { password: hashedPassword };
      const updatedUser = await User.findOneAndUpdate(filter, update);
      if (updatedUser) res.sendStatus(200);
    } else {
      res.status(500).json({ msg: "Email does not exist" });
    }
  } catch (err) {
    console.log(err.message);
    res.sendStatus(500);
  }
});

router.get("/checkLoggedInStatus", authenticateToken, (req, res) => {
  if (req.isLoggedIn) {
    return res.json({ isLoggedIn: true, email: req.user.email });
  } else {
    return res.json({ isLoggedIn: false });
  }
});

router.get("/logout", (req: Request, res: Response) => {
  res.clearCookie("at");
  res.clearCookie("rt");
  res.end();
});

const areSetsEqual = (a: Set<string>, b: Set<string>) =>
  a.size === b.size && [...a].every((value) => b.has(value));

router.post("/addSavedSearches", authenticateToken, async (req, res) => {
  const { keywords, sources } = req.body;
  console.log(keywords, sources);
  console.log(req.user);
  if (req.isLoggedIn) {
    try {
      const savedSearches = req.user.savedSearches;
      const sourcesSet: Set<string> = new Set(sources);
      // check if the search already exists
      if (savedSearches) {
        savedSearches.forEach((savedSearch) => {
          if (
            savedSearch.keywords == keywords &&
            areSetsEqual(sourcesSet, new Set(savedSearch.sources))
          ) {
            return res.sendStatus(200);
          }
        });

        const updatedUser = await User.findOneAndUpdate(
          { email: req.user.email },
          { savedSearches: [...savedSearches, { keywords, sources }] },
          { new: true }
        );
        if (updatedUser)
          return res.json({ savedSearches: updatedUser.savedSearches });
        else return res.status(500).json({ savedSearches });
      } else {
        const updatedUser = await User.findOneAndUpdate(
          { email: req.user.email },
          { savedSearches: [{ keywords, sources }] },
          { new: true }
        );
        console.log(updatedUser);
        if (updatedUser)
          return res.json({ savedSearches: updatedUser.savedSearches });
        else return res.status(500).json({ savedSearches });
      }
    } catch (err) {
      console.log(err.message);
      return res.status(500).json({ savedSearches: req.body.savedSearches });
    }
  } else {
    return res.sendStatus(403);
  }
});

router.post("/deleteSavedSearches", authenticateToken, async (req, res) => {
  const { keywords, sources } = req.body;
  if (req.isLoggedIn) {
    try {
      const savedSearches = req.user.savedSearches;
      const sourcesSet: Set<string> = new Set(sources);
      // delete search
      if (savedSearches) {
        const newSavedSearches = savedSearches.filter((savedSearch) => {
          return (
            savedSearch.keywords !== keywords ||
            !areSetsEqual(sourcesSet, new Set(savedSearch.sources))
          );
        });

        const updatedUser = await User.findOneAndUpdate(
          { email: req.user.email },
          { savedSearches: newSavedSearches },
          { new: true }
        );
        if (updatedUser)
          return res.json({ savedSearches: updatedUser.savedSearches });
        else return res.status(500).json({ savedSearches });
      } else {
        return res.json({ savedSearches: req.body.savedSearches });
      }
    } catch (err) {
      console.log(err.message);
      return res.status(500).json({ savedSearches: req.body.savedSearches });
    }
  } else {
    return res.sendStatus(403);
  }
});

router.get("/savedSearches", authenticateToken, async (req, res) => {
  if (req.isLoggedIn) {
    return res.json({ savedSearches: req.user.savedSearches });
  } else {
    return res.sendStatus(403);
  }
});

router.post("/addSavedNews", authenticateToken, async (req, res) => {
  const { title, date, imgUrl, newsUrl } = req.body;
  if (req.isLoggedIn) {
    try {
      const savedNews = req.user.savedNews;
      // check if the news already exists
      if (savedNews) {
        savedNews.forEach((news) => {
          if (
            news.date === date &&
            news.imgUrl === imgUrl &&
            news.title === title &&
            news.newsUrl === newsUrl
          ) {
            return res.json({ savedNews });
          }
        });

        const updatedUser = await User.findOneAndUpdate(
          { email: req.user.email },
          { savedNews: [...savedNews, { title, date, imgUrl, newsUrl }] },
          { new: true }
        );
        console.log("updated", updatedUser);
        if (updatedUser) return res.json({ savedNews: updatedUser.savedNews });
        else return res.status(500).json({ savedNews });
      } else {
        const updatedUser = await User.findOneAndUpdate(
          { email: req.user.email },
          { savedNews: [{ title, date, imgUrl, newsUrl }] },
          { new: true }
        );
        console.log(updatedUser);
        if (updatedUser) return res.json({ savedNews: updatedUser.savedNews });
        else return res.status(500).json({ savedNews });
      }
    } catch (err) {
      console.log(err.message);
      return res.status(500).json({ savedNews: req.user.savedNews });
    }
  } else {
    return res.sendStatus(403);
  }
});

router.post("/deleteSavedNews", authenticateToken, async (req, res) => {
  const { title, date, imgUrl, newsUrl } = req.body;
  if (req.isLoggedIn) {
    try {
      const savedNews = req.user.savedNews;
      // delete news
      if (savedNews) {
        const newSavedNews = savedNews.filter((news) => {
          return (
            news.date !== date ||
            news.imgUrl !== imgUrl ||
            news.title !== title ||
            news.newsUrl !== newsUrl
          );
        });

        const updatedUser = await User.findOneAndUpdate(
          { email: req.user.email },
          { savedNews: newSavedNews },
          { new: true }
        );
        if (updatedUser) return res.json({ savedNews: updatedUser.savedNews });
        else return res.status(500).json({ savedNews });
      } else {
        return res.json({ savedNews: req.user.savedNews });
      }
    } catch (err) {
      console.log(err.message);
      return res.status(500).json({ savedNews: req.user.savedNews });
    }
  } else {
    return res.sendStatus(403);
  }
});

router.get("/savedNews", authenticateToken, async (req, res) => {
  console.log(req);
  if (req.isLoggedIn) {
    return res.json({ savedSearches: req.user.savedNews });
  } else {
    return res.sendStatus(403);
  }
});

export default router;
