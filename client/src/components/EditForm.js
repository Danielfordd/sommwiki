import React, { useEffect,useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, useHistory } from 'react-router-dom';
import * as ArticleActions from '../store/articles'

import SectionEdit from './SectionEdit'

const EditForm = () => {
  let {id} = useParams()

  const history = useHistory()
  const dispatch = useDispatch();

  const article = useSelector(state => state.articles.current)
  const sections = useSelector(state => state.articles.current.Sections)

  const [title, setTitle] = useState(article.title)
  const [abstract, setAbstract] = useState(article.abstract)

  const getOneArticle = (id) => dispatch(ArticleActions.getOneArticle(id))
  const createSection = () => dispatch(ArticleActions.createSectionThunk());
  const deleteSection = (id) => dispatch(ArticleActions.deleteSectionThunk(id));
  const [reRender, setReRender] = useState(true)

  // useEffect(() => {
  //   getOneArticle(id);
  //   // eslint-disable-next-line
  // },[]);

  const deleteMe = (e) => {
    e.preventDefault()
    const index = e.target.value
    deleteSection(index)
    setReRender(!reRender)
  }
  const addSection = (e) => {
    e.preventDefault()
    createSection()
  }

  const updateArticle = async (e) => {
    e.preventDefault()
    const updatedArticleId = await dispatch(ArticleActions.updateArticle(sections, title, abstract))
    history.push(`/article/${updatedArticleId}`)
  }

  return(
    <div className="article">
      <div>Title</div>
      <input
        type="text"
        placeholder="Article title"
        value={title}
        onChange={e => setTitle(e.target.value)}
        className="input" />
    <div>Article abstract</div>
      <textarea
        placeholder="Article abstract"
        value={abstract}
        onChange={e => setAbstract(e.target.value)}
        className="input"/>
    {sections.map( (section, idx) => {
      console.log(section)
      return (
        <div key={`sectionNum-${section.orderNumber}`}className="article-section">
          <div className="section__delete">
            [ <button
                className="write-article__button"
                value={idx}
                onClick={deleteMe}>
                delete section
            </button> ]
          </div>
          <div>Section {idx+1}</div>
          <SectionEdit id={idx}/>
        </div>)
    })}
     <form>
        <button
          className="write-article__button"
          onClick={addSection}>
          Add Section
        </button>
        <button
          className="write-article__button"
          onClick={updateArticle}>
          Create Article
        </button>
      </form>
  </div>
  )
}

export default EditForm
