function greetHandler(req, res) {
    const name = req.query.name;
    if (name) {
        res.send(`Hello, ${name}!`);
    } else {
        res.send('Hello, Guest!');
    }
}

const express = require('express');
const app = express();
const port = 3000;

app.get('/greet', greetHandler);

app.listen(port, () => {
    console.log(`Server is listening at http://localhost:${port}`);
});

