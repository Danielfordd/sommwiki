import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom/cjs/react-router-dom.min';
import * as ArticleActions from '../store/articles'
import TableOfContents from './TableOfContents'
import pic from '../images/99124-004-F3A1104C.jpg'

const Article = ({getOneArticle, article, updateEditableBoolean}) => {
  let {id} = useParams()

  useEffect(() => {
    getOneArticle(id);
    // eslint-disable-next-line
  }, []);

  if(!article) {
    return null;
  }

  const edit = e => {
    e.preventDefault()
    // console.log(e.target.id)
    updateEditableBoolean(e.target.id)
  }

  return (
    <div className="article">
      <h2 className="article__title">{article.title}</h2>
      <div className="article__image-container">
        <img src={pic} alt={"cat"} className="article__image"/>
      </div>
      <p className="article__abstract">{article.abstract}</p>
      <TableOfContents />
      {article.Sections.map( (section, idx) => {
        console.log(section.editable)
        return (
          <div key={`sectionNum-${section.orderNumber}`}
               className="article-section">
            <div className="section__delete">
              [ <button
                  className="write-article__button"
                  onClick={edit}
                  id={idx}>
                  edit
                </button> ]
            </div>
            <div className="article-section__header" contentEditable={false}> {section.header}</div>
            <div className="article-section__content">{section.content}</div>
          </div>)
      })}
    </div>
  )
}


const ArticleContainer =()=>{
  const dispatch = useDispatch();
  const getOneArticle = (id) => dispatch(ArticleActions.getOneArticle(id))
  const updateEditableBoolean = (id) => dispatch(ArticleActions.updateEditableBoolean(id))
  const article = useSelector(state => state.articles.current)

  return <Article getOneArticle={getOneArticle} article={article} updateEditableBoolean={updateEditableBoolean} />
}

export default ArticleContainer;
