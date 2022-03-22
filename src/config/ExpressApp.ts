import express from "express";
import errorHandler from "../helpers/ErrorHandler";
import cors from "cors";
import { routes } from "../routes/routes";

const application = express()

application.use(express.json());
application.use(cors());

application.use(routes);

application.use(errorHandler);

application.set('port', process.env.PORT || 5000)

export {application};