const Mongoose = require ('./config/DbConnection')
import express from 'express';
import dotenv from 'dotenv';
import {routes} from './routes/routes'

dotenv.config()

const application = express()

application.use(express.json());

application.use(routes);

application.set('port', process.env.APP_PORT || 5000)

new Mongoose();

application.listen(application.get('port'), () => {
	console.log('App is running at http://localhost:%d in %s mode', application.get('port'), application.get('env'))
})