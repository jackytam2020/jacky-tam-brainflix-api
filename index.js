const express = require('express');
const path = require('node:path');
const app = express();
const cors = require('cors');

app.listen(8080);

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use(
  cors({
    origin: '*',
    methods: ['GET', 'POST', 'DELETE', 'PATCH'],
  })
);

const videoRouter = require('./routes/videos');
app.use('/videos', videoRouter);

const commentRouter = require('./routes/comments');
app.use('/videos/', commentRouter);
