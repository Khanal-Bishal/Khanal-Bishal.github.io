import { NextFunction, Request, Response, Router } from "express";
import * as fs from "fs";
const router = Router();

router.get(
  "/:image",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const image = req.params.image;
      const fileExists = fs.existsSync(`./uploads/${ image }`);
      if (!fileExists) { return res.status(404).json({ succes: false, messsage: "Not found" }) }
      res.sendFile(image, { root: `./uploads/` });
    } catch (error) {
      next(error);
    }
  }
);

export default router;