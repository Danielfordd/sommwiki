import React from 'react';
import ArticlePreviewContainer from './ArticlePreview';

const HomePage = () => {
  return (

    <div className="homepage-container">
      <section className="welcome">
        <h1>Welcome</h1>
        <p>Sommwiki is an online free-content encylopedia helping the world freely share the knowledge of wine. Our mission is to be a free resource for amateurs and professionals alike. Please consider contributing your knowledge with the world through writing or editing an article. </p>
      </section>
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
