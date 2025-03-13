const express = require('express');

const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./swagger');

const mongodb = require('./data/database');
const app = express();

const port = process.env.PORT || 10000;

app.use(express.json());

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use('/', require('./routes'));



mongodb.initDb((err) => {
    if(err) {
        console.log(err);
    }
    else {
        app.listen(port, () => {console.log(`Running on port ${port}`)});
    }
});

