import { Request, Response, NextFunction, response } from "express";
import { db } from "../database/drizzle";
import { eq, sql } from "drizzle-orm";
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

    await db.execute(sql`
  UPDATE user_table
  SET saved_movies_ids = 
    CASE 
      WHEN NOT ${movieId} = ANY(saved_movies_ids) THEN 
        array_append(saved_movies_ids, ${movieId})
      ELSE saved_movies_ids
    END
  WHERE userId = ${userId}
`);

    const response: IResponse = {
      success: true,
      message: `Movie of userId ${movieId} is added to the watchlist.`,
    };
    res.status(201).json(response);
  } catch (error) {
    console.log(error);
    next(error);
  }
};

const removeMovie = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { userId, movieId } = req.body;

    const result = await db
      .select({
        savedMoviesIds: userTable.savedMoviesIds,
      })
      .from(userTable)
      .where(eq(userTable.userId, userId));

    const MoviesIds = result[0].savedMoviesIds;
    if (!MoviesIds?.includes(movieId)) {
      const response: IResponse = {
        success: false,
        message: `Movie of Id ${movieId} does not exist in the db.`,
      };
      res.status(404).json(response);
      return;
    }
    await db.execute(sql`
  UPDATE user_table 
  SET saved_movies_ids = array_remove(saved_movies_ids, ${movieId})
  WHERE userId = ${userId}
`);
    const response: IResponse = {
      success: true,
      message: "Movie removed from wishlist successfully",
    };
    res.json(response);
  } catch (error) {
    next(error);
  }
};

const getAllSavedMovies = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { userId } = req.body;

    const result = await db
      .select({
        userId: userTable.userId,
        savedMoviesIds: userTable.savedMoviesIds,
      })
      .from(userTable)
      .where(eq(userTable.userId, userId));

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
