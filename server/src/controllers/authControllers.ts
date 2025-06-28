import { Request, Response, NextFunction, response } from "express";
import { db } from "../database/drizzle";
import { eq, sql } from "drizzle-orm";
import { IResponse, User } from "../interfaces/interfaces";
import { userTable } from "../database/schema";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import config from "../config";

const saltRound = 10;
const register = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email, password } = req.body;
    console.log("bodyy from backend is ", req.body);
    // check if user already exits
    let existingUser = await db
      .select({
        userId: userTable.userId,
      })
      .from(userTable)
      .where(eq(userTable.email, email));

    if (existingUser.length != 0) {
      const response: IResponse = {
        success: false,
        message: `user with email ${email} already exists`,
      };
      res.status(409).json(response);
      return;
    }

    // create a new user
    const salt = await bcrypt.genSaltSync(saltRound);
    const hashedPassword = await bcrypt.hashSync(password, salt);
    const user: Omit<User, "userId" | "name"> = {
      email: email,
      password: hashedPassword,
    };
    const result = await db
      .insert(userTable)
      .values(user)
      .returning({ userId: userTable.userId });

    const response: IResponse = {
      success: true,
      message: `User created`,
      data: result[0],
    };
    res.status(201).json(response);
  } catch (error) {
    next(error);
  }
};

const login = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email, password } = req.body;

    // check if email exists
    const existingUser = (
      await db
        .select({
          userId: userTable.userId,
          hashedPassword: userTable.password,
          userName: userTable.name,
        })
        .from(userTable)
        .where(eq(userTable.email, email))
    )[0];

    if (!existingUser) {
      const response: IResponse = {
        success: false,
        message: `User with email ${email} does not exits.`,
      };
      res.status(404).json(response);
      return;
    }
    const { userId, userName, hashedPassword } = existingUser;

    // generate jwt token

    const match: Boolean = await bcrypt.compareSync(password, hashedPassword);

    if (match) {
      const accessToken = jwt.sign(
        { userId: userId, userName: userName },
        config.env.access_token_secret!,
        { expiresIn: "30s" }
      );

      const refreshToken = jwt.sign(
        { userId: userId, userName: userName },
        config.env.refresh_token_secret!,
        { expiresIn: "1d" }
      );

      await db
        .update(userTable)
        .set({
          refreshToken,
        })
        .where(eq(userTable.email, email));

      res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 24 * 60 * 60 * 1000, // 1 day
      });
      res.status(200).json({
        success: true,
        message: `Login successful!`,
        data: {
          accessToken,
          userId,
        },
      });
    } else {
      const response: IResponse = {
        success: false,
        message: "Unauthorized",
      };
      res.status(401).json(response);
    }
  } catch (error) {
    next(error);
  }
};

const logout = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { refreshToken } = req.cookies;
    if (!refreshToken) {
      res.sendStatus(204);
      return;
    }

    // remove from db
    const user = (
      await db
        .select({
          name: userTable.name,
        })
        .from(userTable)
        .where(eq(userTable.refreshToken, refreshToken))
    )[0];
    if (!user) {
      res.clearCookie("refreshToken", { httpOnly: true });
      res.sendStatus(204);
      return;
    }
    await db
      .update(userTable)
      .set({ refreshToken: "" })
      .where(eq(userTable.refreshToken, refreshToken));
    res.clearCookie("refreshToken", {
      httpOnly: true,
    });
    res.sendStatus(200);
  } catch (error) {
    next(error);
  }
};

const reGenerateToken = async (req: Request, res: Response): Promise<void> => {
  const { refreshToken } = req.cookies;
  if (!refreshToken) {
    res.send("refresh token not present").sendStatus(204);
    return;
  }

  const user = (
    await db
      .select({
        name: userTable.name,
        userId: userTable.userId,
      })
      .from(userTable)
      .where(eq(userTable.refreshToken, refreshToken))
  )[0];
  if (!user) {
    res.sendStatus(403);
    return;
  }

  const { userId, name } = user;
  jwt.verify(
    refreshToken,
    config.env.refresh_token_secret!,
    (err: any, decoded: any) => {
      if (err || name !== decoded.userName) {
        res.sendStatus(403);
        return;
      }
      const accessToken = jwt.sign(
        { userId: userId, userName: name },
        config.env.access_token_secret!,
        { expiresIn: "30s" }
      );

      res.status(200).json({
        success: true,
        message: `re-generated access token`,
        data: {
          accessToken,
        },
      });
    }
  );
};
export { logout, login, register, reGenerateToken };
