import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import ArticleCard from './ArticleCard';
import ArticleTitleContainer from './ArticleTitleContainer'

const SearchResults = () => {
  const results = useSelector(state => state.search.results)

  if(results.length === 0) {
    return(
      <div className="homepage-container">
        <h2> Results </h2>
        <div className="article-preview-container">
            <div>Nothing to see here</div>
        </div >
    <section>
      <h2 className="title-container__header">All Articles</h2>
      <ArticleTitleContainer />
    </section>
    </div>
    )
  }

  return(
    <div className="homepage-container">
      <h2> Results </h2>
      <div className="article-preview-container">
      {results.map((article, idx) =>
        <ArticleCard
          article={article}
          key={idx}
        />)}
    </div >
    <section>
      <h2 className="title-container__header">All Articles</h2>
      <ArticleTitleContainer />
    </section>
    </div>
    )
}

export default SearchResults
