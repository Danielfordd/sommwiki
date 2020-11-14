const LOAD_ALL_ARTICLES = "LOAD_ALL_ARTICLES"
const LOAD_MOST_RECENT_ARTICLES = "LOAD_MOST_RECENT_ARTICLES"
const LOAD_ONE_ARTICLE = "LOAD_ONE_ARTICLE"
const UPDATE_EDITABLE = "UPDATE_EDITABLE"
const UPDATE_SECTION_HEADER_EDIT = "UPDATE_SECTION_HEADER_EDIT"
const UPDATE_SECTION_CONTENT_EDIT = "UPDATE_SECTION_CONTENT_EDIT"
const CREATE_SECTION_EDIT = "CREATE_SECTION_EDIT"
const DELETE_SECTION_EDIT = "DELETE_SECTION_EDIT_xyc"

const deleteSection = (id) => ({
  type:DELETE_SECTION_EDIT,
  id
})

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

const updateHeader = (id, header) => ({
  type:UPDATE_SECTION_HEADER_EDIT,
  id,
  header
})

const updateContent = (id, content) => ({
  type:UPDATE_SECTION_CONTENT_EDIT,
  id,
  content
})

const createSection = () => ({
  type:CREATE_SECTION_EDIT
})

export const deleteSectionThunk = (id) => async dispatch => {
  dispatch(deleteSection(id))
}

export const createSectionThunk = () => async dispatch => {
  dispatch(createSection())
}

export const updateHeaderEditThunk = (id, header) => async dispatch => {
  dispatch(updateHeader(id, header))
}

export const updateContentEditThunk = (id, content) => async dispatch => {
  dispatch(updateContent(id,content))
}

export const getMostRecentArticles = () => async dispatch => {
  const res = await fetch('/api/articles/recent')
  if(res.ok) {
    const data = await res.json();
    dispatch(loadMostRecentArticles(data.articles))
  }
}

export const getAllArticles = () => async dispatch => {
  const res = await fetch('/api/articles')
  if(res.ok) {
    const data = await res.json();
    dispatch(loadAllArticles(data.articles))
  }
}

export const getOneArticle = (id) => async dispatch => {
  const res = await fetch(`/api/articles/${id}`)
  if(res.ok) {
    const data = await res.json();
    let sectionsWithEditable = data.article.Sections.map(sec => {
      return {...sec, editable:false}
    })
    const articleWithEtidableSections = {
      id:data.article.id,
      title:data.article.title,
      abstract:data.article.abstract,
      createdAt: data.article.createdAt,
      updatedAt: data.article.updatedAt,
      Sections: sectionsWithEditable,
      imgUrl:data.article.imgUrl
    }
    dispatch(loadOneArticle(articleWithEtidableSections))
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

export const updateArticle = (sections, title, abstract, articleId) => async dispatch => {
  const XSRFTOKEN = await fetch('/api/auth/getToken')
  const token = (await XSRFTOKEN.json())

  const resOne = await fetch(`/api/articles/update`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'csrf-token':token.XSRFTOKEN
    },
    body: JSON.stringify({ articleId, title, abstract }),
  })
  if (resOne.ok) {
    await fetch(`/api/articles/sections/update`,{
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'csrf-token':token.XSRFTOKEN
      },
      body: JSON.stringify({ sections:[...sections], articleId }),
    })
    }
  }

export const updateEditableBoolean = (id) => async dispatch => {
  dispatch(updateEditable(id))
}

export const deleteArticleThunk = (articleId) => async dispatch => {
  const XSRFTOKEN = await fetch('/api/auth/getToken')
  const token = (await XSRFTOKEN.json())

  await fetch('/api/articles',{
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      'csrf-token':token.XSRFTOKEN,
    },
    body: JSON.stringify({articleId}),
  })
}

export default function reducer(state =
  {newest:[],
    list:[],
    current: {title:"", header:"", imgUrl:"",
    Sections:[{header:"", content:""}]}}, action) {

  let nextState = {};
  switch (action.type) {
    case CREATE_SECTION_EDIT:
      nextState = {...state}
      nextState.newest = [...nextState.newest]
      nextState.current.Sections = [...nextState.current.Sections, {header:"", content:""}]
      return nextState
    case LOAD_MOST_RECENT_ARTICLES:
      nextState ={...state}
      nextState.newest = [...action.articles]
      return nextState
    case LOAD_ALL_ARTICLES:
      nextState = {...state, list: action.articles}
      return nextState
    case DELETE_SECTION_EDIT:
      nextState = {...state}
      nextState.current.Sections = [...nextState.current.Sections]
      nextState.current.Sections.splice(Number(action.id),1)
      return nextState;
    case LOAD_ONE_ARTICLE:
      nextState = {...state}
      nextState.current = action.article
      return nextState
    case UPDATE_EDITABLE:
      nextState = {...state};
      const index = Number(action.id)
      nextState.current.Sections[index].editable = !nextState.current.Sections[index].editable
      return nextState;
    case UPDATE_SECTION_CONTENT_EDIT:
      nextState = {...state};
      nextState.current.Sections = [...nextState.current.Sections];
      nextState.current.Sections[Number(action.id)] = {
        header: nextState.current.Sections[Number(action.id)].header,
        content:action.content
      }
      return nextState;
    case UPDATE_SECTION_HEADER_EDIT:
      nextState = {...state}
      nextState.current.Sections = [...nextState.current.Sections];
      nextState.current.Sections[Number(action.id)] = {
        header: action.header,
        content:nextState.current.Sections[Number(action.id)].content
      }
      return nextState;
    default:
      return state;
  }
}
