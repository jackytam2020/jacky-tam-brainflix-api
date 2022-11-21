const express = require('express');
const router = express();
const path = require('node:path');
const videosJSONFile = path.join(__dirname, '../data/videos.json');
const videos = require(videosJSONFile);
const { getId, writeJSONFunction } = require('../utils/utils');

router
  .route('/')
  .get((_req, res) => {
    res.status(200).json(videos);
  })
  .post((req, res) => {
    console.log(req.body);
    const { title, description, thumbnailUpload } = req.body;

    if (!title || !description || !thumbnailUpload) {
      return res.status(400).json({
        error:
          'Please provide a title, description, and thumbnail for the video',
      });
    }

    const newVideo = {
      id: getId(),
      title: title,
      description: description,
      channel: 'Jacky Tam',
      image: thumbnailUpload,
      views: '0',
      likes: '0',
      duration: '4:01',
      video: 'http://localhost:8080/video/brainstation-sample-video1.mp4',
      timestamp: new Date().getTime(),
      comments: [],
    };

    videos.push(newVideo);
    writeJSONFunction(videosJSONFile, videos);
    res.status(201).json(newVideo);
  });

router.get('/:id', (req, res) => {
  const selectedVideo = videos.find((video) => video.id === req.params.id);

  if (!selectedVideo) {
    res.status(404).json({ error: 'video was not found' });
  } else {
    res.status(200).json(selectedVideo);
  }
});

module.exports = router;
