import React from 'react';
import { useHistory } from "react-router-dom";
import { useDispatch } from 'react-redux';
import * as ArticleActions from '../store/articles'

const ArticleCard = ({article}) => {
  const history = useHistory();

  const dispatch = useDispatch();
  const getOneArticle = (id) => dispatch(ArticleActions.getOneArticle(id))

  const handleClick = () =>{
    getOneArticle(article.id);
    let path = `/article/${article.id}`;
    history.push(path);
  }

  return (
        <div className="article-preview-card" onClick={handleClick}>
          <img src={article.imgUrl} className="article-preview-card__image" alt={`${article.title}`}/>
          <div className="article-card-title">{article.title}</div>
        </div>
  )
}

export default ArticleCard
