import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import ArticleCard from './ArticleCard';
import * as ArticleActions from '../store/articles'

const ArticlePreview = ({getAllArticles, articles}) => {

  useEffect(() => {
    getAllArticles();
    // eslint-disable-next-line
  }, []);

  if (!articles) {
    return null;
  }

  return (
      <div className="article-preview-container">
        {articles.map((article, idx) => <ArticleCard article={article} key={idx}/>)}
      </div >
  )
}

const ArticlePreviewContainer = () =>{
  const dispatch = useDispatch()
  const getAllArticles = () => dispatch(ArticleActions.getAllArticles())
  const articles = useSelector(state => state.articles.list)

  return <ArticlePreview getAllArticles={getAllArticles} articles={articles}/>
}

export default ArticlePreviewContainer
