const express = require('express');
const app = express();
const path = require('path');
require('./services/db.services.js');
const bodyParser = require('body-parser');
const userRouter = require('./routes/user.route.js');
const postRouter = require('./routes/post.route.js');
const categoryRouter = require('./routes/category.route.js');
const productRouter = require('./routes/product.route.js');
const userAuthRouter = require('./routes/userAuth.route');

var cors = require('cors');
app.use(cors());
app.use('/images', express.static(path.join(__dirname, 'images')));

app.use(bodyParser.json());
app.use('/', userRouter);
app.use('/', postRouter);
app.use('/', categoryRouter);
app.use('/', productRouter);
app.use('/', userAuthRouter);

app.listen(3000, () => {
    console.log('Server started on port 3000');
});
