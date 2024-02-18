import { devLogger } from "./development-logger-lib";
import { prodLogger } from "./production-logger-lib";




let logger: any | null = null;

if (process.env.NODE_ENV !== 'production') {
    logger = prodLogger();
}

if (process.env.NODE_ENV === 'development') {
    logger =  devLogger();
}

export default logger;