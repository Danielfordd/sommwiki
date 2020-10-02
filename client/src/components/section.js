import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import * as SectionActions from '../store/sections'

const Section = ({ id }) => {
  const dispatch = useDispatch()
  const updateHeader = (id, header) => dispatch(SectionActions.updateHeaderThunk(id, header));
  const updateContent = (id, content) => dispatch(SectionActions.updateContentThunk(id, content));
  const { header, content } = useSelector(state => state.sections[id])

  const handleHeader = e => {
    e.preventDefault()
    updateHeader(id, e.target.value)
  }

  const handleContent = e => {
    e.preventDefault();
    updateContent(id, e.target.value)
  }

  return(
    <div className="section">
      <form className="Login-form">
          <input type="text"
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

export default Section
