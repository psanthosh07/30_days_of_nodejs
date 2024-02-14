
const express = require("express");
const NodeCache = require("node-cache");
const axios = require("axios");

const app = express();
const myCache = new NodeCache({ stdTTL: 30 }); 

const cachingMiddleware = (req, res, next) => {
  const key = req.url;
  const cacheContent = myCache.get(key);

  if (cacheContent) {
    return res.send(cacheContent);
  } else {
    const response = res.send;
    res.send = (body) => {
      myCache.set(key, body);
      response.call(res, body);
    };
    next(); // Call next to continue processing the request
  }
};

// Register the caching middleware before defining routes
app.use(cachingMiddleware);

app.get("/todos", async (req, res) => {
  try {
    const { data } = await axios.get(
      "https://jsonplaceholder.typicode.com/todos/?completed=true"
    );
    res.send(data);
  } catch (error) {
    console.error("Error fetching todos:", error.message);
    res.status(500).send("Internal Server Error");
  }
});

// Handling the root route ("/")
app.get("/", (req, res) => {
  res.send("Welcome to the Express caching server!");
});

/* Listening on port */
const port = 8080;
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
