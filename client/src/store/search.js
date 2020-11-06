const LOAD_SEARCH_RESULTS = "LOAD_SEARCH_RESULTS";
const UPDATE_SEARCH_QUERY = "UPDATE_SEARCH_QUERY"
const UPDATE_SEARCH_RESULTS = "UPDATE_SEARCH_RESULTS"

const updateSearchQuery = (query) => ({
  type:UPDATE_SEARCH_QUERY,
  query
})

const updateSearchResults = (results) => ({
  type:UPDATE_SEARCH_RESULTS,
  results
})

export const updateQuery = (query) => async dispatch =>{
  dispatch(updateSearchQuery(query))
}

export const updateSearchResultsTHUNK = (results) => async dispatch => {
  dispatch(updateSearchResults(results))
}

export default function reducer(state={results:[], query:''}, action) {
  let nextState;
  switch (action.type) {
    case LOAD_SEARCH_RESULTS:
      return nextState;
    case UPDATE_SEARCH_QUERY:
      nextState = {...state}
      nextState.query = action.query
      return nextState;
    case UPDATE_SEARCH_RESULTS:
      nextState = {...state}
      nextState.results = [...nextState.results]
      nextState.results = action.results
      return nextState
    default:
      return state;
  }
}
