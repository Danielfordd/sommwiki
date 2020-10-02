import React from 'react';
import pic from '../images/99124-004-F3A1104C.jpg'
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
          <img src={pic} className="article-preview-card__image" alt={"cat"}/>
          <div className="article-card-title">{article.title}</div>
          <div className="article-card-abstract-container">
            <div className="article-card-abstract">{article.abstract}</div>
          </div>
        </div>
  )
}

export default ArticleCard
