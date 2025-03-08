const express = require('express');
const app = express();

const port = process.env.PORT || 8080;

app.use('/', require('./routes'));

app.listen(port, () => {console.log(`Running on port ${port}`)});
