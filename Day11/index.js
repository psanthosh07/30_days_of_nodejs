const express = require('express');
const authenticationMiddleware = require('./authenticationMiddleware'); 
const app = express();

app.use(authenticationMiddleware);


app.get('/protected', (req, res) => {
  
  const user = req.user;
  res.json({ message: `Protected route accessed by user: ${user.username}` });
});

const port = 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
