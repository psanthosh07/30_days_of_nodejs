const express = require('express');
const averageAgeOfUsers = require('./averageAgeOfUsers');

const app = express();

app.get('/average-age', averageAgeOfUsers);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
