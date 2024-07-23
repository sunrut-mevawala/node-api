const express = require('express');
const app = express();
require('./services/db.services.js');
const bodyParser = require('body-parser');
const userRouter = require('./routes/user.route.js');
// const postRouter = require('./routes/post.route.js');

app.use(bodyParser.json());
app.use('/', userRouter);
// app.use('/', postRouter);

app.listen(3000, () => {
    console.log('Server started on port 3000');
});
