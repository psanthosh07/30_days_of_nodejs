function positiveIntegerHandler(req, res, next) {
  const number = parseInt(req.query.number);

  if (Number.isInteger(number) && number > 0) {
    return res.status(200).json({ message: "Success" });
  } else {
    const error = new Error("Number must be a positive integer");
    error.status = 400;
    return next(error);
  }
}

function errorHandler(err, req, res, next) {
  if (err.status === 400) {
    return res.status(400).json({ error: err.message });
  } else {
    return next(err);
  }
}

const express = require('express');
const app = express();

// Route handler for requests to the root URL
app.get('/', (req, res) => {
  res.send('Welcome to the Express server!');
});

app.get('/positive', positiveIntegerHandler);
app.use(errorHandler);

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
