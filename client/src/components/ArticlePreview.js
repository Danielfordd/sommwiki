import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import ArticleCard from './ArticleCard';
import * as ArticleActions from '../store/articles'


const ArticlePreview = ({getAllArticles, articles}) => {

  useEffect(() => {
    getAllArticles();
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
  const info = useSelector(state => state.articles.list)

  const articles = useSelector(state => state.articles.list)
  return <ArticlePreview getAllArticles={getAllArticles} articles={articles}/>
}

export default ArticlePreviewContainer
