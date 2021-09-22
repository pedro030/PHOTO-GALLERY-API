import express from 'express';
import morgan from 'morgan';
import path from 'path';
import indexRoutes from './routes/index'

const app = express();

// settings
app.set('port', process.env.PORT || 3000);

// middlewares
app.use(morgan('dev'));
app.use(express.json());

// routes
app.use('/api', indexRoutes);

// this folder for this app will be used to store(almacenar) public files
app.use('/uploads', express.static(path.resolve('uploads')));

export default app;