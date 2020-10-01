import React, { useState } from 'react'
import Section from './Section'
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from "react-router-dom";
import * as ArticleActions from '../store/articles'
import * as SectionActions from '../store/sections'

const WriteArticle = () =>{
  const [title, setTitle] = useState("")
  const [abstract, setAbstract] = useState("")
  const history = useHistory()
  const dispatch = useDispatch()
  const sections = useSelector(state => state.sections)
  const createSection = () => dispatch(SectionActions.createSectionThunk());
  const deleteSection = (id) => dispatch(SectionActions.deleteSectionThunk(id));

  const addSection = (e) => {
    e.preventDefault()
    createSection()
  }

  const deleteMe = (e) => {
    e.preventDefault()
    const index = e.target.value
    deleteSection(index)
  }

  const createArticle = async (e) => {
    e.preventDefault()
    const newArticleId = await dispatch(ArticleActions.createArticle(sections, title, abstract))
    history.push(`/article/${newArticleId}`)
  }

  return (
    <div className="write-article">
      <input
        type="text"
        placeholder="Article title"
        value={title}
        onChange={e => setTitle(e.target.value)}
        className="input" />
      <textarea
        placeholder="Article abstract"
        value={abstract}
        onChange={e => setAbstract(e.target.value)}
        className="input"/>
      {sections.map((_, idx) =>
        <div key={`write-article-section-${idx}`}>
          <div className="section__number">
            section {idx+1}
          </div>
          <div className="section__delete">
            [ <button
                className="write-article__button"
                value={idx}
                onClick={deleteMe}>
                delete section
            </button> ]
          </div>
          <Section id={idx} />
      </div>
    )}
      <form>
        <button
          className="write-article__button"
          onClick={addSection}>
          Add Section
        </button>
        <button
          className="write-article__button"
          onClick={createArticle}>
          Create Article
        </button>
      </form>
    </div>
  )
}

export default WriteArticle
