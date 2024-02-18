
import { createLogger, format, transports } from 'winston';

const { combine, timestamp, printf } = format;

const myFormat = printf(({ level, message, timestamp }: any) => {
    return `[${level}] ${timestamp} : ${message}`;
});

export const prodLogger = () => {
    return createLogger({
        level: 'info',
        format: combine(
            timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }), 
            myFormat
        ),
        transports: [
            new transports.Console(),
            new transports.File({ filename: 'proderror.log', level: 'error' }),
            new transports.File({ filename: 'prodcombined.log' }),
        ],
    });
};
