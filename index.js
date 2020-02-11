const express = require('express');

let app = express();
app.use(express.static('public'));

app.listen(80, () => {
    console.log('Listening on port 80.');
});