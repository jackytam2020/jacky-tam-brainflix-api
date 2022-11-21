const express = require('express');
const router = express();
const path = require('node:path');
const { getId, writeJSONFunction } = require('../utils/utils');
const videosJSONFile = path.join(__dirname, '../data/videos.json');
const videos = require(videosJSONFile);

router.route('/:id/comments').post((req, res) => {
  const { name, comment } = req.body;

  if (!name || !comment) {
    return res.status(400).json({
      error: 'Please provide a name and comment for the comment',
    });
  }
  //find comments of targeted video
  const selectedVideo = videos.find((video) => video.id === req.params.id);
  const newComment = {
    id: getId(),
    name: name,
    comment: comment,
    likes: 0,
    timestamp: new Date().getTime(),
  };
  // add new comment of targeted video
  selectedVideo.comments.push(newComment);
  //value containing object to be passed to find the index of video in the original array
  let videosArr = videos.filter((videoObj) => {
    return videoObj.id === req.params.id;
  });
  //find the index of the current video
  let indexOfVideosObj = videos.indexOf(videosArr[0]);
  //replace old video object with new video object (selectedVideo)
  videos.splice(indexOfVideosObj, 1, selectedVideo);

  writeJSONFunction(videosJSONFile, videos);
  res.status(201).json(newComment);
});

router
  .route('/:id/comments/:commentId')
  .delete((req, res) => {
    //value containing object to be passed to find the index of video in the original array
    let videosArr = videos.filter((videoObj) => {
      return videoObj.id === req.params.id;
    });
    //find the index of the current video
    let indexOfVideosObj = videos.indexOf(videosArr[0]);
    // get comments of array in the found video object in videos array
    let commentsArr = videos[indexOfVideosObj].comments;
    //value containing comments object to be passed to find the index of comment obj in the comments array
    let commentsObj = commentsArr.filter((commentObj) => {
      return commentObj.id === req.params.commentId;
    });
    //find index of comments object
    let indexOfCommentsObj = videos[indexOfVideosObj].comments.indexOf(
      commentsObj[0]
    );
    //remove comment
    videos[indexOfVideosObj].comments.splice(indexOfCommentsObj, 1);

    res.status(200).json(videosArr);
    writeJSONFunction(videosJSONFile, videos);
  })
  .patch((req, res) => {
    let likedComment = videos
      .find((video) => video.id === req.params.id)
      .comments.find((comment) => comment.id === req.params.commentId);

    likedComment.likes++;

    writeJSONFunction(videosJSONFile, videos);
    res.status(200).json(likedComment);
  });

module.exports = router;
