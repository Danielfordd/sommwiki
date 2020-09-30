const express = require('express');
const asyncHandler = require('express-async-handler');
const { Article, Section } = require('../../db/models');

const router = express.Router();

// /api/articles
router.get("/", asyncHandler(async (req, res, next) => {
  const articles = await Article.findAll({   limit : 10})

  res.json({articles:articles});
}));

// /api/articles/:id
router.get("/:id", asyncHandler(async (req, res, next) => {
  const article = await Article.findOne({where:{id:req.params.id}, include: Section})
  res.json({article:article});
}));


router.post("/create", asyncHandler( async (req, res, next) =>{
  // const errors = validationResult(req);

  // if (!errors.isEmpty()) {
  //   console.log(errors);
  //   return next({ status: 422, errors: errors.array() });
  // }
  const newArticle = await Article.create({
    title:req.body.title,
    abstract: req.body.abstract
  });

  res.json({id:newArticle.id})
}));

router.post("/create/section", asyncHandler( async (req, res, next) =>{
  // const errors = validationResult(req);

  // if (!errors.isEmpty()) {
  //   console.log(errors);
  //   return next({ status: 422, errors: errors.array() });
  // }

  const sections = req.body.sections

  sections.map(async section => {
    const orderNumber = (section.idx + 1)

    await Section.create({
        header:section.header,
        content:section.content,
        articleId:req.body.id,
        orderNumber
      })
  })
  res.json({ articleId:req.body.id })
}));

module.exports = router;
