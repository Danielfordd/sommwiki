import React from 'react';
import ArticlePreviewContainer from './ArticlePreview';

const HomePage = () => {
  return (

    <div className="homepage-container">
      <section>
        <h2> Explore Articles</h2>
        <ArticlePreviewContainer />
      </section>
      <section>
        <h2>Recently Added Articles</h2>
        <ArticlePreviewContainer />
      </section>
    </div>
  )
}

export default HomePage
