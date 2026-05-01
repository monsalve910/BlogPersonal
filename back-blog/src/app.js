const express = require('express');
const dotenv = require('dotenv');
const { sequelize } = require('./models');
const userRoutes = require('./routes/user.routes');
const articleRoutes = require('./routes/article.routes');
const errorMiddleware = require('./middlewares/errorMiddleware');
const cors = require('cors');
dotenv.config();
const app = express();

app.use(express.json());
app.use(
    cors({
        origin:"https://69f531a7285e30954d222ce9--harmonious-queijadas-fd403e.netlify.app",
        methods:["GET", "POST","PUT","DELETE"],
        Credential:true,
    }),
);
app.use('/api/usuarios', userRoutes);
app.use('/api/articulos', articleRoutes);

app.use(errorMiddleware);

module.exports = app;