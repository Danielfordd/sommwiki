const express = require('express');
const asyncHandler = require('express-async-handler');
const { Article, Section, articleUsers } = require('../../db/models');

const router = express.Router();

router.get("/", asyncHandler(async (req, res, next) => {
  const articles = await Article.findAll({
    limit : 50,
    order: [['title', 'ASC']],
    attributes: ['id', 'title', 'abstract', 'imgUrl']
  })

  res.json({articles:articles});
}));

router.delete("/", asyncHandler( async (req,res, next) =>{
  const sections = await Section.findAll({
    where: {articleId:req.body.articleId}
  })

  sections.forEach(async section => await section.destroy());

  const article = await Article.findOne({
    where: { id:req.body.articleId }
  })

  await articleUsers.destroy({
    where:{articleId:req.body.articleId}
  })

  await Article.destroy({
    where:{id:req.body.articleId}
  })
}))

router.put("/update", asyncHandler( async (req,res,next) =>{
  const { title, abstract, articleId }= req.body

  const article = await Article.findOne({
    where: { id:articleId }
  })

  article.title = title;
  article.abstract = abstract;

  article.save()
  res.json({id: articleId, title: title, abstract: abstract, imgUrl: article.imgUrl})
}))

router.put("/sections/update", asyncHandler( async (req,res,next) =>{
  const { sections, articleId }= req.body

  const allOldSections = await Section.findAll({
    where: {
      articleId
    }
  })

  sections.map(async (section, idx) => {
    const orderNumber = (idx + 1)
    const sec = await Section.findOne( {where:{ orderNumber, articleId } } )

    if(!!sec) {
      sec.content = section.content;
      sec.header = section.header;
      sec.orderNumber = orderNumber

      sec.save();
    } else {

      await Section.create({
        header:section.header,
        content: section.content,
        articleId,
        orderNumber
      })
    }
  })

  if(allOldSections.length > sections.length) {
    const difference = allOldSections.length - sections.length
    let i = (allOldSections.length-1)

    while(difference > 0) {
      await allOldSections[i].destroy();
      i--
      difference--
    }
  }

  const updatedSections = await Section.findAll({
    where: {
      articleId
    }
  })
  res.json({ updatedSections:updatedSections })
}))

router.get("/recent", asyncHandler(async (req, res, next) => {
  const articles = await Article.findAll({ limit : 10, order: [['createdAt', 'DESC']]})

  res.json({articles:articles});
}));

router.get("/:id", asyncHandler(async (req, res, next) => {
  const article = await Article.findOne({
                                          where:{id:req.params.id},
                                          include: [{model:Section, attributes: ['id', 'header', 'content', 'orderNumber']}],
                                          order: [[Section, 'orderNumber', 'ASC']]
                                        })
  res.json({article:article});
}));


router.post("/create", asyncHandler( async (req, res, next) =>{
  const newArticle = await Article.create({
    title:req.body.title,
    abstract: req.body.abstract,
    imgUrl: "/default.jpg"
  });

  res.json({id:newArticle.id})
}));

router.post("/create/section", asyncHandler( async (req, res, next) =>{
  const sections = req.body.sections

  sections.map(async (section, idx) => {
    const orderNumber = (idx + 1)

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
