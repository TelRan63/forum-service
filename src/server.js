import express from 'express';
import cors from 'cors';
import config from './configuration/config.js';
import mongoose from "mongoose";
import postRoutes from './routes/post.routes.js';
import userRoutes from "./routes/userAccount.routes.js";
import errorHandler from "./middlewares/error.middleware.js";
import authentication from "./middlewares/authentication.middleware.js";
import {createAdmin} from "./configuration/initAdmin.js";
import authorizationRouts from "./routes/authorization.routes.js";
import {corsOptions} from "./configuration/corsOptions.js";

const app = express();

app.use(cors(corsOptions));
app.use(express.json());

app.use(authentication);
app.use(authorizationRouts);

app.use('/forum', postRoutes);
app.use('/account', userRoutes);

app.use(errorHandler);

app.use((req, res) => res.status(404).type('text/plain; charset=utf-8').send('Not Found'));

const connectDB = async () => {
    try {
        await mongoose.connect(config.mongodb.uri, config.mongodb.db);
        await createAdmin();
        console.log('Connected to MongoDB');
    } catch (e) {
        console.log('Failed connection to MongoDB: ', e);
    }
}

async function startServer() {
    await connectDB();
    app.listen(config.port, () => console.log(`Server running on port ${config.port}. Press Ctrl+C to stop.`));
}

startServer();