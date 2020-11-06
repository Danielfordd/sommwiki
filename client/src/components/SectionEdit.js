import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import * as ArticleActions from '../store/articles'

const SectionEdit = ({ id }) => {
  const dispatch = useDispatch()
  const updateHeaderEdit = (id, header) => dispatch(ArticleActions.updateHeaderEditThunk(id, header));
  const updateContentEdit = (id, content) => dispatch(ArticleActions.updateContentEditThunk(id, content));
  const { header, content } = useSelector(state => state.articles.current.Sections[id])

  const handleHeader = e => {
    e.preventDefault()
    updateHeaderEdit(id, e.target.value)
  }

  const handleContent = e => {
    e.preventDefault();
    updateContentEdit(id, e.target.value)
  }

  return(
    <div className="section">
      <form className="Login-form">
          <input tsetSectionContentpe="text"
                placeholder="Section header"
                value={header}
                onChange={handleHeader}
                className="input"
                id={id}/>
          <textarea
                placeholder="Section content"
                value={content}
                onChange={handleContent}
                className="input"
                id={id}/>
        </form>
    </div>
  )
}

export default SectionEdit
