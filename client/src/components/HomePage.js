import React, { useEffect } from 'react';
import ArticlePreviewContainer from './ArticlePreview';
import ArticleTitleContainer from './ArticleTitleContainer'
import { useDispatch } from 'react-redux';
import * as ArticleActions from '../store/articles'

const HomePage = () => {
  const dispatch = useDispatch()
  const getMostRecentArticles = () => {
    return dispatch(ArticleActions.getMostRecentArticles())
  }
  const getAllArticles = () => {
    return dispatch(ArticleActions.getAllArticles())
  }


  useEffect(() => {
    getMostRecentArticles();
    getAllArticles();
    // eslint-disable-next-line
  }, []);

  return (

    <div className="homepage-container">
      <section className="welcome">
        <h1>Welcome</h1>
        <p>Sommwiki is an online encylopedia helping the world freely share the knowledge of wine. Our mission is to be a free, unpretentious resource for amateurs and professionals alike. If you would like to write or edit an article, please sign up. Welcome to the community!</p>
      </section>
      <section>
        <h2> Recently Added Articles</h2>
        <ArticlePreviewContainer />
      </section>
      <section>
        <h2 className="title-container__header">All Articles</h2>
        <ArticleTitleContainer />
      </section>
    </div>
  )
}

export default HomePage
