import { Response, NextFunction } from "express";

export const checkUserType = async (
  req: any,
  res: Response,
  next: NextFunction
): Promise<any> => {
  try {
    const user = req.user;
    if (user.userType === "admin") {
      next();
    } else {
      return res.status(400).json({ error: "Unauthorized!" });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Internal server error" });
  }
};
