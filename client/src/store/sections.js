const CREATE_SECTION = "CREATE_SECTION"
const DELETE_SECTION = "DELETE_SECTION"
const UPDATE_SECTION_HEADER = "UPDATE_SECTION_HEADER"
const UPDATE_SECTION_CONTENT = "UPDATE_SECTION_CONTENT"
const CLEAR_PAGE = "CLEAR_PAGE"

const createSection = () =>({
  type:CREATE_SECTION,
})

const deleteSection = (id) => ({
  type:DELETE_SECTION,
  id
})

const updateHeader = (id, header) => ({
  type:UPDATE_SECTION_HEADER,
  id,
  header
})

const updateContent = (id, content) => ({
  type:UPDATE_SECTION_CONTENT,
  id,
  content
})

const clearPage = () => ({
  type: CLEAR_PAGE
})

export const clearPageThunk =() => async dispatch => {
  dispatch(clearPage())
}

export const createSectionThunk = () => async dispatch => {
  dispatch(createSection())
}

export const deleteSectionThunk = (id) => async dispatch => {
  dispatch(deleteSection(id))
}

export const updateHeaderThunk = (id, header) => async dispatch => {
  dispatch(updateHeader(id, header))
}

export const updateContentThunk = (id, content) => async dispatch => {
  dispatch(updateContent(id, content))
}

export default function reducer(state = [{header:"", content:""}], action) {
  let nextState;
  let copy;
  switch (action.type) {
    case CREATE_SECTION:
      nextState = [...state, {header:"", content:""}]
      return nextState
    case DELETE_SECTION:
      copy = [...state]
      copy.splice(action.id,1)
      return copy
    case UPDATE_SECTION_CONTENT:
      copy = [...state]
      let header = copy[action.id].header
      copy[action.id] = {header, content:action.content}
      return copy
    case UPDATE_SECTION_HEADER:
      copy = [...state]
      let content = copy[action.id].content
      copy[action.id] = {content, header:action.header}
      return copy
    case CLEAR_PAGE:
      return [{header:"", content:""}]
    default:
      return state;
  }
}
