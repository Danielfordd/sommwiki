import React from 'react'
import { useSelector } from 'react-redux';


const TableOfContents = ({sections}) => {
  if(!sections) {
    return null
  }

  return (
    <span className="table-of-contents">
      <h4>Table of Contents</h4>
      {sections.map(section => {
        return (
          <div className="table-of-contents__section" key={`table-of-contents-${section.id}`}>
            <span className="table-of-contents__orderNumber">{section.orderNumber}</span>
            <span className="table-of-contents__header">{section.header}</span>
          </div>
        )
      })}
    </span>
  )
}

const TableOfContentsContainer = () =>{
 const sections = useSelector(state => state.articles.current.Sections)

 return <TableOfContents sections={sections}/>
}
export default TableOfContentsContainer
