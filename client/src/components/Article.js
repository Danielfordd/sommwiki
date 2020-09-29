import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom/cjs/react-router-dom.min';
import * as ArticleActions from '../store/articles'
import TableOfContents from './TableOfContents'

const Article = ({getOneArticle, article}) => {
  let {id} = useParams()


  useEffect(() => {
    getOneArticle(id);
    // eslint-disable-next-line
  }, []);

  if(!article) {
    return null;
  }

  return (
    <div className="article">
      <h2 className="article__title">{article.title}</h2>
      <p className="article__abstract">{article.abstract}</p>
      <TableOfContents />
      {article.Sections.map(section => {
        return (
          <div key={`sectionNum-${section.orderNumber}`} className="article-section" >
            <div className="article-section__header">{section.header}</div>
            <div className="article-section__content">{section.content}</div>
          </div>)
      })}
    </div>
  )
}


const ArticleContainer =()=>{
  const dispatch = useDispatch();
  const getOneArticle = (id) => dispatch(ArticleActions.getOneArticle(id))
  const article = useSelector(state => state.articles.current)

  return <Article getOneArticle={getOneArticle} article={article}/>
}

export default ArticleContainer;
