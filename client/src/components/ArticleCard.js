import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';

const ArticleCard = ({article}) => {
  const handleClick = () =>{
    console.log(article)
  }
  return (
  <div
  onClick={handleClick}
  className="article-preview-card">
    <div className="article-card-title">{article.title}</div>
    <div className="article-card-abstract">{article.abstract}</div>
  </div>

  )
}

export default ArticleCard
