import React, { useEffect } from 'react';
import NavBar from './components/NavBar';
import { useDispatch } from 'react-redux';
import * as ArticleActions from './store/articles'
import LoginModal from './components/LoginModal'

function App() {
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
    <>
     <NavBar />
    </>
  );
}

export default App;
