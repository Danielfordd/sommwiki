const express = require('express');
const asyncHandler = require('express-async-handler');
const { Article, Section, articleUsers } = require('../../db/models');

const router = express.Router();

// /api/articles
router.get("/", asyncHandler(async (req, res, next) => {
  const articles = await Article.findAll({
    limit : 50,
    order: [['title', 'ASC']],
    attributes: ['id', 'title']
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
  // return await article.destroy();
  // res.json({success:"success"})
}))

router.put("/update", asyncHandler( async (req,res,next) =>{
    // const errors = validationResult(req);

  // if (!errors.isEmpty()) {
  //   console.log(errors);
  //   return next({ status: 422, errors: errors.array() });
  // }

  const article = await Article.findOne({
    where: { id:req.body.articleId }
  })

  article.title = req.body.title;
  article.abstract = req.body.abstract

  article.save()
  res.json({success:'success'})
}))

router.put("/sections/update", asyncHandler( async (req,res,next) =>{
  // const errors = validationResult(req);

  // if (!errors.isEmpty()) {
  //   console.log(errors);
  //   return next({ status: 422, errors: errors.array() });
  // }

  const { sections, articleId }= req.body

  const allOldSections = await Section.findAll({
    where: {
      articleId
    }
  })

  // sections.map(async (section, idx) => {
  //   const orderNumber = (idx + 1)
  //   const { content, header } = Section
  //   const sec = await Section.findOne( {where:{ orderNumber, articleId } } )

  //   if(!!sec) {
  //     sec.content = section.content;
  //     sec.header = section.header;
  //     sec.orderNumber = orderNumber

  //     sec.save();
  //   } else {

  //     await Section.create({
  //       header:section.header,
  //       content: section.content,
  //       articleId,
  //       orderNumber
  //     })
  //   }

  // })

  if(allOldSections.length > sections.length) {
    const difference = allOldSections.length - sections.length
    let i = (allOldSections.length-1)

    while(difference > 0) {
      await allOldSections[i].destroy();
      i--
      difference--
    }
  }


  res.json({ success:'success' })
}))



// /api/articles
router.get("/recent", asyncHandler(async (req, res, next) => {
  const articles = await Article.findAll({ limit : 10, order: [['createdAt', 'DESC']]})

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
