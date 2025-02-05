// Importing dotenv to load environment variables from the .env file
import dotenv from 'dotenv';

// Load environment variables from the .env file into process.env
dotenv.config();

// MongoDB URI for the primary database connection, defaults to a local development URI if not provided
export const MONGO_URI_PRIMARY = process.env.MONGO_URI_PRIMARY || 'mongodb://localhost:27017/login';

// MongoDB URI for the backup database connection, defaults to a local development URI if not provided
export const MONGO_URI_BACKUP = process.env.MONGO_URI_BACKUP || 'mongodb://localhost:27017/backup';

// JWT secret used for encoding and signing JWT tokens, defaults to 'mysecret' if not specified
export const JWT_SECRET = process.env.JWT_SECRET || 'mysecret';

// JWT refresh secret used for verifying JWT refresh tokens, defaults to 'myrefreshsecret' if not specified
export const JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET || 'myrefreshsecret';

// Port on which the Express server will listen, defaults to 5000 if not specified
export const PORT = process.env.PORT || 5000;
