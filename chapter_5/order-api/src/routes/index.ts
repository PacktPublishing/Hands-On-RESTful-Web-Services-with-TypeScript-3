import { Request, Response } from "express";

export class Index {
  public routes(app): void {
    //received the express instance from app.ts file
    app
      .route("/index")

      .get((req: Request, res: Response) => {
        res.status(200).send({ status: "success" });
      });
  }
}
