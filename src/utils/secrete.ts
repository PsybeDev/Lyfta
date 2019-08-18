import dotenv from 'dotenv';
import fs from 'fs';

if (fs.existsSync('.env')) {
	console.log('Using .env file to supply config environment variables');
	dotenv.config({ path: '.env' });
} else {
	console.log('Using .env.example file to supply config environment variables');
	dotenv.config({ path: '.env.example' });  // you can delete this after you create your own .env file!
}

export const ENVIRONMENT = process.env.NODE_ENV;
const prod = ENVIRONMENT === 'production';

export const SESSION_SECRET = process.env['SESSION_SECRET'];
export const MONGODB_URI = process.env['MONGODB_URI'];

if (!SESSION_SECRET) {
	console.error('No client secret. Set SESSION_SECRET environment variable.')
	process.exit(1);
}

if (!MONGODB_URI) {
	if (prod) {
		console.error('No mongo connection string. Set MONGODB_URI environment variable.');
	} else {
		console.error('No mongo connection string. Set MONGODB_URI_LOCAL environment variable.');
	}
	process.exit(1);
}
