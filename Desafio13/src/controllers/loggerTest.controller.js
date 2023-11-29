import { logger } from '../winston.js';

export const loggerTest = (req, res) => {
    logger.fatal('Esta es una prueba para un mensaje de ocurrencia "Fatal".');
    logger.error('Esta es una prueba para un mensaje de "Error".');
    logger.warning('Esta es una prueba para un mensaje de advertencia "Warn".');
    logger.info('Esta es una prueba para un mensaje informativo "Info".');
    logger.http('Esta es una prueba para un mensaje del protocolo "HTTP".');
    logger.debug('Esta es una prueba para un mensaje de depuración "Debug".');
    res.send("Testing Logs");
}