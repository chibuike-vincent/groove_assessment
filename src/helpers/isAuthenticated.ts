import { Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export const isAuth = async (
  req: any,
  res: Response,
  next: NextFunction
): Promise<any> => {
  try {
    const token = req.headers["authorization"];
    const validToken = token?.split(" ")[1];
    if (validToken) {
      // const secret = process.env.SECRET
      const user: any = await jwt.verify(validToken, "mysecretkey");
      req.user = user;
      next();
    } else {
      return res.status(400).json({ error: "Unauthorized!" });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Internal server error" });
  }
};
