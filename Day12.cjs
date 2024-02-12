const express = require('express');
const app = express();

function rateLimitMiddleware(req, res, next) {
  const rateLimit = 5;
  const ip = req.ip;
  const requests = ipRequestMap[ip] || [];

  const currentTime = new Date().getTime();
  ipRequestMap[ip] = requests.filter(requestTime => currentTime - requestTime < 60000);

  if (requests.length >= rateLimit) {
    res.status(429).send('Too Many Requests');
  } else {
    ipRequestMap[ip].push(currentTime);
    next();
  }
}

const ipRequestMap = {};

app.use(rateLimitMiddleware);

app.get('/', (req, res) => {
  res.send('Hello World!');
});

const port = 3000;
app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
