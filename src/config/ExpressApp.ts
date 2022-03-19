import express from "express";
import errorHandler from "../helpers/ErrorHandler";
import { routes } from "../routes/routes";

const application = express()

application.use(express.json());

application.use(routes);

application.use(errorHandler);

application.set('port', process.env.APP_PORT || 5000)

export {application};