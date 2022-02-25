const Mongoose = require ('./config/DbConnection')
import express from 'express';
import dotenv from 'dotenv';

dotenv.config()

const application = express()

application.use(express.json());

application.set('port', process.env.APP_PORT || 3000)

new Mongoose();

application.listen(application.get('port'), () => {
	console.log('App is running at http://localhost:%d in %s mode', application.get('port'), application.get('env'))
})