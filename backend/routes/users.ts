import express from "express";
import { VerifyErrors } from "jsonwebtoken";
const router = express.Router();

import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import nodemailer from "nodemailer";

// User Model
import User from "../models/user";

export interface DataStoredInToken {
  email: string;
}

interface ResetToken {
  password: string;
}

declare global {
  namespace Express {
    export interface Request {
      user: DataStoredInToken;
    }
  }
}

const authenticateToken = (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  const cookies = req.cookies;
  console.log(cookies);
  // check AT

  // if AT not verified: check RT
  // if RT is valid: get new AT;
  // res.cookie('at', AT)
  // else false
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (token === null) return res.sendStatus(401);

  jwt.verify(
    token,
    process.env.ACCESS_TOKEN_SECRET,
    (err: VerifyErrors, dataStoredInToken: DataStoredInToken) => {
      if (err) return res.sendStatus(403);
      req.user = dataStoredInToken;
      next();
    }
  );
};

const generateAccessToken = (dataStoredInToken: DataStoredInToken) => {
  return jwt.sign(dataStoredInToken, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: "10m",
  });
};

const generateRefreshToken = (
  dataStoredInToken: DataStoredInToken,
  remembered: boolean
) => {
  const time = remembered ? "7d" : "2h";
  return jwt.sign(dataStoredInToken, process.env.REFRESH_TOKEN_SECRET, {
    expiresIn: time,
  });
};

const generateResetToken = (partialPassword: ResetToken) => {
  return jwt.sign(partialPassword, process.env.RESET_TOKEN_SECRET, {
    expiresIn: "15m",
  });
};

// @route POST /users/signup
// @desc User Sign up
// @access Public
router.post("/signup", async (req, res) => {
  console.log("hi");
  console.log(req);
  const { email, password } = req.body;
  console.log(email, password);
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

    // user.save((err, response) => {
    //   if (err) {
    //     console.log("haha", err, "haha2", response);
    //     res.status(500).json({ msg: "Error saving user" });
    //   } else {
    //     res.redirect("/user/login");
    //   }
    // });
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

  console.log("haha", email, password, remembered);

  try {
    let user = await User.findOne({
      email,
    });
    console.log(
      password,
      user.password,
      await bcrypt.compare(password, user.password)
    );
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(400).json({ msg: "Incorrect account" });
    }

    const dataStoredInToken: DataStoredInToken = {
      email: email,
    };

    const accessToken = generateAccessToken(dataStoredInToken);
    const refreshToken = generateRefreshToken(dataStoredInToken, remembered);

    console.log("token!");

    res.cookie("rt", refreshToken, {
      httpOnly: true,
    });
    res.cookie("at", accessToken, {
      httpOnly: true,
    });

    console.log("cookie");

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
        console.log("error");
        return res.status(403).json({ msg: "reset link expires" });
      }

      console.log("continue");

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

router.post("/token", (req, res) => {
  const refreshToken = req.body.token;
  try {
    const decoded = jwt.verify(
      refreshToken,
      process.env.REFRESH_TOKEN_SECRET,
      (err: VerifyErrors, decoded: any) => {
        if (err) return res.sendStatus(403);
        const accessToken = generateAccessToken({ email: decoded.email });
        res.json({ accessToken: accessToken });
      }
    );
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
});

export default router;
