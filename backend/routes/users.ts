import express, { Request, Response } from "express";
import { verify, VerifyErrors } from "jsonwebtoken";
const router = express.Router();

import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import nodemailer from "nodemailer";

// User Model
import User from "../models/user";
import {
  generateAccessToken,
  generateRefreshToken,
  generateResetToken,
} from "./auth";
import { equal } from "assert";
import { access } from "fs";

export interface AccessRefreshToken {
  email: string;
}

declare global {
  namespace Express {
    export interface Request {
      user: AccessRefreshToken;
    }
  }
}

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

    const dataStoredInToken: AccessRefreshToken = {
      email: email,
    };

    const accessToken = generateAccessToken(dataStoredInToken);
    const refreshToken = generateRefreshToken(dataStoredInToken, remembered);

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

router.get("/checkLoggedInStatus", (req, res) => {
  const cookies = req.cookies;
  if ("at" in cookies && "rt" in cookies) {
    const accessToken = cookies["at"];
    const refreshToken = cookies["rt"];

    try {
      jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET);
      return res.json({ isLoggedIn: true });
    } catch (err) {
      try {
        const decoded: any = jwt.verify(
          refreshToken,
          process.env.REFRESH_TOKEN_SECRET
        );
        const newAccessToken = generateAccessToken({
          email: decoded.email,
        });
        res.cookie("at", newAccessToken);
        res.json({ isLoggedIn: true });
      } catch (err) {
        console.log(err.message);
        res.json({ isLoggedIn: false });
      }
    }
    // jwt.verify(
    //   accessToken,
    //   process.env.ACCESS_TOKEN_SECRET,
    //   (err: VerifyErrors, decoded: jwt.JwtPayload) => {
    //     if (!err) loggedIn = true;
    //     else {
    //       jwt.verify(
    //         refreshToken,
    //         process.env.REFRESH_TOKEN_SECRET,
    //         (err: VerifyErrors, decoded: jwt.JwtPayload) => {
    //           if (!err) {
    //             console.log(decoded);
    //             const newAccessToken = generateAccessToken({
    //               email: decoded.email,
    //             });
    //             res.cookie("at", newAccessToken);
    //             loggedIn = true;
    //           }
    //         }
    //       );
    //     }
    //   }
    // );
    // res.json({ isLoggedIn: loggedIn });
  } else {
    res.json({ isLoggedIn: false });
  }
});

router.get('/logout', (req: Request, res: Response) => {
  res.clearCookie("at")
  res.clearCookie("rt")
  res.end()
})

export default router;
