import { Request, Response, NextFunction } from "express";
import { JwtPayload } from "jsonwebtoken";
import jwt from "jsonwebtoken";
import User, { IUser } from "../models/user";

interface ResetToken {
  password: string;
}

export interface AccessRefreshToken {
  email: string;
}

export const generateAccessToken = (dataStoredInToken: AccessRefreshToken) => {
  return jwt.sign(dataStoredInToken, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: "10m",
  });
};

export const generateRefreshToken = (
  dataStoredInToken: AccessRefreshToken,
  remembered: boolean
) => {
  const time = remembered ? "7d" : "2h";
  return jwt.sign(dataStoredInToken, process.env.REFRESH_TOKEN_SECRET, {
    expiresIn: time,
  });
};

export const generateResetToken = (partialPassword: ResetToken) => {
  return jwt.sign(partialPassword, process.env.RESET_TOKEN_SECRET, {
    expiresIn: "15m",
  });
};

declare global {
  namespace Express {
    export interface Request {
      isLoggedIn: boolean;
      user: JwtPayload;
    }
  }
}

declare module "jsonwebtoken" {
  export interface JwtPayload extends IUser {}
}

export const authenticateToken = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const cookies = req.cookies;
  if ("at" in cookies && "rt" in cookies) {
    const accessToken = cookies["at"];
    const refreshToken = cookies["rt"];

    try {
      const decoded: any = jwt.verify(
        accessToken,
        process.env.ACCESS_TOKEN_SECRET
      );
      req.isLoggedIn = true;
      const user = await User.findOne({
        email: decoded.email,
      });
      req.user = user;
      next();
      return;
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
        const user = await User.findOne({
          email: decoded.email,
        });
        req.user = user;
        req.isLoggedIn = true;
        next();
        return;
      } catch (err) {
        console.log(err.message);
        req.isLoggedIn = false;
        next();
        return;
      }
    }
  } else {
    req.isLoggedIn = false;
    next();
    return;
  }
};
