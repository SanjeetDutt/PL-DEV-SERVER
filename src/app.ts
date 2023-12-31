import bodyParser from 'body-parser';
import express, { NextFunction, Request, Response } from 'express';

import enquiryRoutes from './routes/enquiry';
import persistanceRoute from './routes/persistance';
import workbenchRoute from './routes/workbench/_workbench';

const app = express();

app.use(bodyParser.json());

app.use((req: Request, res: Response, next: NextFunction) => {
	res.setHeader('Access-Control-Allow-Origin', '*');
	res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PATCH,DELETE');
	res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
	next();
});

const logRequest = (req: Request, response: Response, next: NextFunction) => {
	console.debug({ REQUEST: req });
	next();
};

app.use('/v4', enquiryRoutes);
app.use('/persistance', persistanceRoute);
app.use('/workbench', workbenchRoute);

app.use((error, req: Request, res: Response, next: NextFunction) => {
	const status = error.status || 500;
	const message = error.message || 'Something went wrong.';
	res.status(status).json({ message: message });
});

console.log('APP IS RUNNING IN PORT 8080');
app.listen(8080);
