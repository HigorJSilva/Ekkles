import Mongoose from './config/DbConnection';
import dotenv from 'dotenv';
import {application} from './config/ExpressApp';

dotenv.config()



new Mongoose();

application.listen(application.get('port'), () => {
	console.log('App is running at http://localhost:%d in %s mode', application.get('port'), application.get('env'))
})