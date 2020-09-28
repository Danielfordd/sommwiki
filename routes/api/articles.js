const express = require('express');
const asyncHandler = require('express-async-handler');
const { validationResult } = require('express-validator');
const { Article } = require('../../db/models');
const bcrypt = require('bcryptjs');

const router = express.Router();

//api/articles
router.get("/", asyncHandler(async (req, res, next) => {
  const articles = await Article.findAll()

  res.json({articles:articles});
}));

module.exports = router;
