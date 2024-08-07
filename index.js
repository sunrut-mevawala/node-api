const express = require('express');
const app = express();
require('./services/db.services.js');
const bodyParser = require('body-parser');
const userRouter = require('./routes/user.route.js');
const postRouter = require('./routes/post.route.js');
const userAuthRouter = require('./routes/userAuth.route');

var cors = require('cors');
app.use(cors());

app.use(bodyParser.json());
app.use('/', userRouter);
app.use('/', postRouter);
app.use('/', userAuthRouter);

app.listen(3000, () => {
    console.log('Server started on port 3000');
});
