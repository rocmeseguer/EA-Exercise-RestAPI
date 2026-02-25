import { Request, Response, NextFunction } from 'express';
import { logger } from '../config.js';

/**
 * HTTP LOGGER MIDDLEWARE
 * Intercepta cada petición para registrar el método y la URL.
 */
export const httpLogger = (req: Request, res: Response, next: NextFunction): void => {
    logger.info(`${req.method} ${req.url}`);
    next();
};