import dotenv from 'dotenv';
import path from 'path';
import { dev } from './../args/args.js';

if(dev){
    const __dirname = process.cwd();
    dotenv.config({ path: path.join(__dirname, 'configs/configs.env') });
}

export const mongoOptions = {
    useNewUrlParser: true,
    useUnifiedTopology: true
}

export const jwtSecret = process.env.JWT_SECRET;
export const refreshTokenSecret = process.env.REFRESH_TOKEN_SECRET;
export const sessionExpiry = process.env.SESSION_EXPIRY;
export const refreshTokenExpiry = process.env.REFRESH_TOKEN_EXPIRY;
export const mongoDbConnectionString = process.env.MONGO_DB_CONNECTION_STRING;
export const cookieSecret = process.env.COOKIE_SECRET;
export const whitelistedDomains = process.env.WHITELISTED_DOMAINS;
export const clearDatabaseUrl = process.env.CLEARDB_DATABASE_URL;