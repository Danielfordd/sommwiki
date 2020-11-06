import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom'
import * as SearchActions from '../store/search'

const SearchBar = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const query = useSelector(state => state.search.query)
  const articles = useSelector(state => state.articles.list)
  const titles = useSelector(state => state.articles.list.map(article => article.title))

  const updateSearch = (x) => dispatch(SearchActions.updateQuery(x))
  const updateResults = (sresults) => dispatch(SearchActions.updateSearchResultsTHUNK(sresults))

  function filterList(q, list) {
    function escapeRegExp(s) {
      return s.replace(/[-/\\^$*+?.()|[\]{}]/g, "\\$&");
    }
    const words = q
      .split(/\s+/g)
      .map(s => s.trim())
      .filter(s => !!s);
    const hasTrailingSpace = q.endsWith(" ");
    const searchRegex = new RegExp(
      words
        .map((word, i) => {
          if (i + 1 === words.length && !hasTrailingSpace) {
            return `(?=.*\\b${escapeRegExp(word)})`;
          } else {
            return `(?=.*\\b${escapeRegExp(word)}\\b)`;
          }
        })
        .join("") + ".+",
      "gi"
    );
    return list.filter(item => {
      return searchRegex.test(item.title);
    });
  }

  const searchResultsHandler = e => {
    e.preventDefault();
    const results = filterList(query, articles)
    updateResults(results)
    history.push('/articles')
  }

  const handleUpdate = e => {
    e.preventDefault()
    updateSearch(e.target.value)
  }

  return (
    <form onSubmit={searchResultsHandler} >
    <input
      onChange={handleUpdate}
      value={query}
      className="Search-bar"
      type="text"
      placeholder="Search articles" />
  </form>
  )
}

export default SearchBar;
