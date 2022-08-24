import { whitelistedDomains } from './../configs/configs.js';
import cors from 'cors';

export const whitelist = whitelistedDomains ? whitelistedDomains.split(",") : [];

const corsOptions = {
    origin: (origin, callback) => {
        if (whitelist.indexOf(origin) !== -1 || !origin) {
            callback(null, true);
        } else {
            callback('CORS Error: Origin ' + origin + ' not allowed by CORS', false);
        }
    },
    credentials: true
};

export default cors(corsOptions);