const LOAD_ALL_ARTICLES = "LOAD_ALL_ARTICLES"
const LOAD_MOST_RECENT_ARTICLES = "LOAD_MOST_RECENT_ARTICLES"
const LOAD_ONE_ARTICLE = "LOAD_ONE_ARTICLE"
const UPDATE_EDITABLE = "UPDATE_EDITABLE"

const loadMostRecentArticles = (articles) => ({
  type:LOAD_MOST_RECENT_ARTICLES,
  articles
})

const loadAllArticles = (articles) => ({
  type:LOAD_ALL_ARTICLES,
  articles
})

const loadOneArticle = (article) => ({
  type:LOAD_ONE_ARTICLE,
  article
})

const updateEditable = (id) => ({
  type:UPDATE_EDITABLE,
  id
})

export const getMostRecentArticles = () => async dispatch => {
  const res = await fetch('/api/articles/recent')
  if(res.ok) {
    const data = await res.json();
    dispatch(loadMostRecentArticles(data.articles))
  } else {
    console.log("there was an error", res)
  }
}

export const getAllArticles = () => async dispatch => {
  const res = await fetch('/api/articles')
  if(res.ok) {
    const data = await res.json();
    dispatch(loadAllArticles(data.articles))
  } else {
    console.log("there was an error", res)
  }
}

export const getOneArticle = (id) => async dispatch => {
  const res = await fetch(`/api/articles/${id}`)
  if(res.ok) {
    const data = await res.json();
    console.log('data w/o editable', data.article)
    let sectionsWithEditable = data.article.Sections.map(sec => {
      return {...sec, editable:false}
    })
    const articleWithEtidableSections = {
      id:data.article.id,
      title:data.article.title,
      abstract:data.article.abstract,
      createdAt: data.article.createdAt,
      updatedAt: data.article.updatedAt,
      Sections: sectionsWithEditable
    }
    dispatch(loadOneArticle(articleWithEtidableSections))
  } else {
    console.log("there was an error", res)
  }
}

export const createArticle = (sections, title, abstract) => async dispatch => {

  const XSRFTOKEN = await fetch('/api/auth/getToken')
  const token = (await XSRFTOKEN.json())

  const firstRes = await fetch('/api/articles/create',{
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'csrf-token':token.XSRFTOKEN
    },
    body: JSON.stringify({title, abstract}),
  })
  const data = await firstRes.json()

  await fetch(`/api/articles/create/section`,{
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'csrf-token':token.XSRFTOKEN
    },
    body: JSON.stringify({ sections:[...sections], id:data.id }),
  })

  return data.id
}

export const updateEditableBoolean = (id) => async dispatch => {
  dispatch(updateEditable(id))
}

export default function reducer(state = {newest:[],list:[], current: {Sections:[]}}, action) {
  let nextState = {};
  switch (action.type) {
    case LOAD_MOST_RECENT_ARTICLES:
      nextState ={...state, newest: action.articles}
      return nextState
    case LOAD_ALL_ARTICLES:
      nextState = {...state, list: action.articles}
      return nextState
    case LOAD_ONE_ARTICLE:
      nextState = {...state, current:action.article}
      return nextState
    case UPDATE_EDITABLE:
      nextState = {...state};
      const index = Number(action.id)
      nextState.current.Sections[index].editable = !nextState.current.Sections[index].editable
      // console.log(nextState.current.Sections[index].editable)
      return nextState;
    default:
      return state;
  }
}
