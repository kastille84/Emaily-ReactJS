const express = require('express');
    //app is used to set up configuration that listens for incoming requests
const app = express();

app.get('/', (req, res) => {
    res.send({hi: 'there'});
});

const PORT = process.env.PORT  || 5000;

app.listen(PORT);