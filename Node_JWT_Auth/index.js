require('dotenv').config(); 

const express = require('express');
const app = express();
const authRoute = require('./routes/authRoutes');

app.use(express.json());
app.use('/api', authRoute);

const port = process.env.PORT || 3007;  
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

