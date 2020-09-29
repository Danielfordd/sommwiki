const express = require('express');
const asyncHandler = require('express-async-handler');
const { validationResult } = require('express-validator');
const { Article, Section } = require('../../db/models');
const bcrypt = require('bcryptjs');

const router = express.Router();

// /api/articles
router.get("/", asyncHandler(async (req, res, next) => {
  const articles = await Article.findAll()

  res.json({articles:articles});
}));

// /api/articles/:id
router.get("/:id", asyncHandler(async (req, res, next) => {
  const article = await Article.findOne({where:{id:req.params.id}, include: Section})
  res.json({article:article});
}));

module.exports = router;
