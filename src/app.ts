import cors from 'cors';
import express from 'express';
import morgan from 'morgan';
import password from 'passport';
import middlewareToken from './middlewares/passport';

import authRoutes from './routes/auth.routes';
import specialRoutes from './routes/special.routes';

// initializacion
const app = express();

// settings
app.set('port', process.env.PORT || 3000);

// middleware
app.use(morgan('dev'));
app.use(cors());
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(password.initialize());
password.use(middlewareToken);

// routes
app.use(authRoutes);
app.use(specialRoutes);
app.get('/', (req, res) => {
    res.send(`This API is at http://localhost${app.get('port')}`);
});

export default app;