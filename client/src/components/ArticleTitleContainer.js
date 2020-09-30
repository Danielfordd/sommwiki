import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import ArticleCard from './ArticleCard';
import * as ArticleActions from '../store/articles'

const ArticleTitleContainer = () => {
  const dispatch = useDispatch()
  // const getAllArticles = () => dispatch(ArticleActions.getAllArticles())
  const articles = useSelector(state => state.articles.list)

  // useEffect(() => {
  //   getAllArticles();
  //   // eslint-disable-next-line
  //   console.log(articles)
  // }, []);

  if (articles.length === 0) {
    return null;
  }

  console.log(articles)

  return (
  <div className="article-preview-container">
    {articles.map((article, idx) => <NavLink
                                      key={`article-link-${article.id}`}
                                      to={`/article/${article.id}`}
                                    >
                                      test
                                      {/* {article.title} */}
                                    </NavLink>)}
  </div >
)
}

export default ArticleTitleContainer
