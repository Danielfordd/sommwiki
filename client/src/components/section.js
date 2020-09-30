import React, { useEffect, useState } from 'react'

const Section = ({id, sendSection}) => {
  const [header, setHeader] = useState("")
  const [content, setContent] = useState("")
// onSubmit={sendSection(id, header, content)}

useEffect(()=>{
  sendSection(id, header, content)
}, [header, content])


  return(
    <div className="section">
      <div className="section__number">section {id+1}</div>
      <form className="Login-form">
          <input type="text"
                placeholder="Section header"
                value={header}
                onChange={e => setHeader(e.target.value)}
                className="input" />
          <textarea
                placeholder="Section content"
                value={content}
                onChange={e => setContent(e.target.value)}
                className="input"/>
        </form>
    </div>
  )
}

export default Section
