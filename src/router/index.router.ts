import core from "../core/index.core";
import { Router, Request, Response } from "express";

const Routes = Router();

Routes.post("/", async (req: Request, res: Response) => {
  try {
    res.status(200).send(await core(req.body.url));
  } catch (err) {
    console.log(err);
  }
});

export default Routes;
