import { Request, Response, NextFunction, response } from "express";
import { db } from "../database/drizzle";
import { eq, sql, and, not, inArray } from "drizzle-orm";
import { IResponse } from "../interfaces/interfaces";
import { userTable } from "../database/schema";
const getUsers = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const result = await db.select().from(userTable);
    const response: IResponse = {
      success: true,
      message: "UserTable data",
      data: result,
    };
    res.status(202).json(response);
  } catch (error: any) {
    next(error);
  }
};

const addMovie = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { userId, movieId } = req.body;

    // First check if user exists
    const existingUser = (
      await db
        .select({
          savedMoviesIds: userTable.savedMoviesIds,
        })
        .from(userTable)
        .where(eq(userTable.userId, userId))
    )[0];

    if (!existingUser) {
      const response: IResponse = {
        success: false,
        message: "User not found",
      };

      res.status(404).json(response);
      return;
    }

    // Check if movie already exists in array
    if (existingUser.savedMoviesIds.includes(movieId)) {
      res.status(200);
      return;
    }

    // Perform the update
    await db
      .update(userTable)
      .set({
        savedMoviesIds: [...existingUser.savedMoviesIds, movieId],
      })
      .where(eq(userTable.userId, userId));

    const response: IResponse = {
      success: true,
      message: `Movie ${movieId} added to the watchlist.`,
    };
    res.status(201).json(response);
  } catch (error) {
    console.error("Error in addMovie:", error);
    next(error);
  }
};

const removeMovie = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const userId = req.query.userId as string;
    const movieId = req.query.movieId as string;
    const [user] = await db
      .select({
        savedMoviesIds: userTable.savedMoviesIds,
      })
      .from(userTable)
      .where(eq(userTable.userId, userId));
    console.log("user is ", user);
    if (!user) {
      const response: IResponse = {
        success: false,
        message: "User not found",
      };
      res.status(404).json(response);
      return;
    }

    // Check if movie exists in the array
    if (!user.savedMoviesIds.includes(movieId)) {
      const response: IResponse = {
        success: false,
        message: `Movie ID ${movieId} not found in user's watchlist`,
      };
      res.status(404).json(response);
      return;
    }

    await db
      .update(userTable)
      .set({
        savedMoviesIds: user.savedMoviesIds.filter((id) => id !== movieId),
      })
      .where(eq(userTable.userId, userId));

    const response: IResponse = {
      success: true,
      message: "Movie removed from watchlist successfully",
    };
    res.status(200).json(response);
  } catch (error) {
    console.error("Error in removeMovie:", error);
    next(error);
  }
};

const getAllSavedMovies = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const userId = req.query.userId as string;

    if (!userId) {
      res.status(400).json({
        success: false,
        message: "Missing userId in query parameters.",
      });
      return;
    }

    const result = await db
      .select({
        savedMoviesIds: userTable.savedMoviesIds,
      })
      .from(userTable)
      .where(eq(userTable.userId, userId));

    if (!result[0]) {
      res.status(404).json({
        success: false,
        message: `User with ID ${userId} not found.`,
      });
      return;
    }

    const response: IResponse = {
      success: true,
      data: result[0],
      message: `Saved movies of userId ${userId}`,
    };

    res.status(200).json(response);
  } catch (error) {
    next(error);
  }
};

export { getUsers, addMovie, removeMovie, getAllSavedMovies };
