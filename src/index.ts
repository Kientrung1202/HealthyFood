import { Request, Response } from "express";
import "dotenv/config";
import { db } from "./db";
import cors from "cors";
import express from "express";
import morgan from "morgan";
import bodyParser from "body-parser";
import glob from "glob";
import generateDb from "./data/generate";
import swaggerUi from "swagger-ui-express";
import swaggerDocument from "./swagger.json";
const app = express();
const port = process.env.PORT;
import fileUpload from "express-fileupload";

const connectDb = async () => {
  await db.sequelize
    .authenticate()
    .then(async () => {
      console.log("Connect database successfully");
      await generateDb();
    })
    .catch((err: Error) => console.log("Enable connect database", err));
};

const initApi = () => {
  app.use((req, res, next) => {
    next();
  });
  app.use(fileUpload());
  app.use(morgan("combined")); //log bug thoi
  app.use(cors()); // loi cors
  // for parsing application/jsonn
  app.use(bodyParser.json());
  // for parsing application/x-www-form-urlencoded
  app.use(bodyParser.urlencoded({ extended: true }));
  // list router and use it
  // dung docker goi vao thi no ra __dirname = app/dist
  glob(__dirname + "/**/*.controller.js", {}, (err, files) => {
    console.log(__dirname);
    files.map((file: string) => {
      // eslint-disable-next-line @typescript-eslint/no-var-requires
      const api = require(file);
      app.use(api);
    });
    console.log(files);
    console.log("init api successfully");
  });
};

const initSwagger = () => {
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
};

app.get("/", (req: Request, res: Response) => {
  return res.send(`Hello trung!${__dirname}`);
});
app.listen(port, () => {
  return console.log(`Express is listening at http://localhost:${port}`);
});

Promise.all([connectDb(), initApi(), initSwagger()])
  .then(() => {
    console.log("Server run");
  })
  .catch((err) => {
    console.log(err);
  });

export default app;
