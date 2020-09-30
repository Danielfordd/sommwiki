import React, { useEffect, useState } from 'react'
import Section from './Section'
import { useDispatch } from 'react-redux';
import * as ArticleActions from '../store/articles'

const WriteArticle = () =>{
 const [section, setSection] = useState([{header:"",content:""}])
 const [title, setTitle] = useState("")
 const [abstract, setAbstract] = useState("")

  const dispatch = useDispatch()

  const addSection = (e) => {
    e.preventDefault()
    setSection([...section, { idx:null, header:"", content:"" }])
  }

  const createArticle = (e) => {
    e.preventDefault()
    dispatch(ArticleActions.createArticle(section, title, abstract))
  }

  const sendSection = (idx, header, content) => {
    const copy = [...section];
    copy[idx] = {idx, header,content}
    setSection(copy)
  }

  return (
    <div className="write-article">
      <input type="text"
            placeholder="Article title"
            value={title}
            onChange={e => setTitle(e.target.value)}
            className="input" />
      <textarea
            placeholder="Article abstract"
            value={abstract}
            onChange={e => setAbstract(e.target.value)}
            className="input"/>
      {section && section.map((sec, idx) => <Section id={idx} key={`write-article-section-${idx}`} sendSection={sendSection} />)}
      <form>
        <button className="write-article__button" onClick={addSection}>Add Section</button>
      </form>
      <form>
        <button className="write-article__button" onClick={createArticle}>Create Article</button>
      </form>
    </div>
  )
}

export default WriteArticle
