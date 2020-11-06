import React from 'react';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';


const ArticleTitleContainer = () => {
  const articles = useSelector(state => state.articles.list)

  return (
  <div className="article-title-container">
    {articles.map(
      (article) => <NavLink
                          className="title-link"
                          key={`article-link-${article.id}`}
                          to={`/article/${article.id}`}>
                          {article.title}
                        </NavLink>)}
  </div >
)
}

export default ArticleTitleContainer
