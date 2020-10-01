import React from 'react';
import { useSelector } from 'react-redux';

import ArticleCard from './ArticleCard';

const ArticlePreview = () => {
  const articles = useSelector(state => state.articles.newest)

  return (
      <div className="article-preview-container">
        {articles.map((article, idx) =>
        <ArticleCard
          article={article}
          key={idx}
        />)}
      </div >
  )
}

export default ArticlePreview
