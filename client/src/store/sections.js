const CREATE_SECTION = "CREATE_SECTION"
const CREATE_ARTICLE = "CREATE_ARTICLE"

const createSection = () =>({
  type:CREATE_SECTION
})

export const createSectionThunk = () => async dispatch => {
  dispatch(createSection())
}

export default function reducer(state = [{}], action) {
  let nextState = {};
  switch (action.type) {
    case CREATE_SECTION:
      nextState = [...state, {}]
      return nextState
    default:
      return state;
  }
}
