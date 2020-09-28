export const LOAD_ALL_ARTICLES = "LOAD_ALL_ARTICLES"
const LOAD_ONE_ARTICLE = "LOAD_ONE_ARTICLE"

const loadAllArticles = (articles) => ({
  type:LOAD_ALL_ARTICLES,
  articles
})

const loadOneArticle = (article) => ({
  type:LOAD_ONE_ARTICLE,
  article
})


export const getAllArticles = () => async dispatch => {
  const res = await fetch('/api/articles')
  if(res.ok) {
    const data = await res.json();
    console.log(data.articles)
    dispatch(loadAllArticles(data.articles))
  } else {
    console.log("there was an error", res)
  }
}

export default function reducer(state = {list:[]}, action) {
  let nextState = {};
  switch (action.type) {
    case LOAD_ALL_ARTICLES:
      nextState = {...state, list: action.articles}
      console.log('next state', nextState)
      return nextState
    default:
      return state;
  }
}
