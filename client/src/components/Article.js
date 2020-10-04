import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, useHistory } from 'react-router-dom';
import * as ArticleActions from '../store/articles'
import TableOfContents from './TableOfContents'
import pic from '../images/99124-004-F3A1104C.jpg'

const Article = ({getOneArticle, article, deleteArticleFetch, loggedIn}) => {
  let {id} = useParams()
  const history = useHistory();

  useEffect(() => {
    getOneArticle(id);
    // eslint-disable-next-line
  }, []);

  if(!article) {
    return null;
  }

  const editArticle = e => {
    e.preventDefault()
    history.push(`/articles/${id}/edit`)
  }

  const deleteArticle = e => {
    e.preventDefault()
    deleteArticleFetch(id)

    history.push("/");
  }

  const title = `\t${article.title}`
  const abstract = `\t${article.abstract}`

  if(loggedIn) {
    return (
      <div className="article">
        <div className="article-top">
        <h2 className="article__title">{title}</h2>
        <pre className="article__abstract">{abstract}</pre>
        <div className="article__image-container">
          <img src={article.imgUrl} alt={"cat"} className="article__image"/>
        </div>
      </div>
        <TableOfContents />
        {article.Sections.map( (section, idx) => {
          const header = `\t${section.header}`
          const content = `\t${section.content}`

          return (
            <div key={`sectionNum-${section.orderNumber}`} className="article-section">
              <pre className="article-section__header" contentEditable={false}> {header}</pre>
              <pre className="article-section__content">{content}</pre>
            </div>)
        })}
        <div>
          <button
          className="write-article__button"
          onClick={editArticle} >Edit Article</button>
          <button
          className="write-article__button"
          onClick={deleteArticle}>Delete Article</button>
        </div>
      </div>

    )
  }

  return (
    <div className="article">
      <h2 className="article__title">{title}</h2>
      <div className="article__image-container">
        <img src={article.imgUrl} alt={"cat"} className="article__image"/>
      </div>
      <pre className="article__abstract">{abstract}</pre>
      <TableOfContents />
      {article.Sections.map( (section, idx) => {
        const header = `\t${section.header}`
        const content = `\t${section.content}`

        return (
          <div key={`sectionNum-${section.orderNumber}`} className="article-section">
            <pre className="article-section__header" contentEditable={false}> {header}</pre>
            <pre className="article-section__content">{content}</pre>
          </div>)
      })}
    </div>
  )
}


const ArticleContainer =()=>{
  const dispatch = useDispatch();
  const getOneArticle = (id) => dispatch(ArticleActions.getOneArticle(id))
  const updateEditableBoolean = (id) => dispatch(ArticleActions.updateEditableBoolean(id))
  const deleteArticleFetch = (articleId) => dispatch(ArticleActions.deleteArticleThunk(articleId))
  const article = useSelector(state => state.articles.current)
  const loggedIn = useSelector(state => !!state.authentication.id)

  return <Article getOneArticle={getOneArticle} article={article} updateEditableBoolean={updateEditableBoolean} loggedIn={loggedIn} deleteArticleFetch={deleteArticleFetch}/>
}

export default ArticleContainer;
