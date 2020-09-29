import React from 'react';
import pic from '../images/99124-004-F3A1104C.jpg'

const ArticleCard = ({article}) => {
  const handleClick = () =>{
    console.log(article)
  }
  return (
  <div
  onClick={handleClick}
  className="article-preview-card">
    <img src={pic} className="article-preview-card__image"/>
    <div className="article-card-title">{article.title}</div>
    <div className="article-card-abstract">{article.abstract}</div>
  </div>

  )
}

export default ArticleCard
