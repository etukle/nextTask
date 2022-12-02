import express from 'express';
import http from 'http';
import { config } from './config/config';
import Logging from './library/Logging';
import searchRoutes from './routes/Search';

const app = express();

const startServer = () => {
    app.use((req, res, next) => {
        Logging.info(`Incoming -> Method: ${req.method} - URL: ${req.url} - IP: ${req.socket.remoteAddress}`);

        res.on('finish', () => {
            Logging.info(`Incoming -> Method: ${req.method} - URL: ${req.url} - IP: ${req.socket.remoteAddress} - Status: ${res.statusCode}`);
        });

        next();
    });

    app.use(express.urlencoded({ extended: true }));
    app.use(express.json());

    /** Rules of API */
    app.use((req, res, next) => {
        res.header('Access-Control-Allow-Origin', '*');
        res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');

        if (req.method == 'OPTIONS') {
            res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
            return res.status(200).json({});
        }
        next();
    });

    /** Routes */
    app.use('/api/search', searchRoutes);

    /** Healthcheck */
    app.get('/api/ping', (req, res, next) => res.status(200).json({ message: 'pong' }));

    /** Error Handling */
    app.use((req, res, next) => {
        const error = new Error('Not Found');
        Logging.error(error);

        return res.status(404).json({ message: error.message });
    });

    http.createServer(app).listen(config.server.port, () => Logging.info(`Server is running on ${config.server.port}`));
};

startServer();

export default app;
