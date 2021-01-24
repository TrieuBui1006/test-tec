import {useEffect, useState} from 'react'
import './App.css';
import {connect} from 'react-redux'
import {
  getMovies, 
  removeMovie, 
  updateFilter, 
  updateLike, 
  updateDislike} from './actions/movies'

import Card from './components/Card/Card'
import FilterBar from './components/FilterBar/FilterBar'
import Pagination from './components/Pagination/Pagination'
import Spinner from './components/Spinner/Spinner'

function App({getMovies, removeMovie, updateFilter, updateLike, updateDislike, movies:{filteredMovies, loading, error, categories}}) {
  const [currentPage, setCurrentPage] = useState(1)
  const [moviesPerPage, setMoviesPerPage] = useState(4)

  // Get movies from data
  useEffect(() => {
    getMovies()
  }, [getMovies])

  // Get current movies
  const indexOfLastMovie = currentPage * moviesPerPage
  const indexOfFirstMovie = indexOfLastMovie - moviesPerPage
  const currentFilteredMovies = filteredMovies.slice(indexOfFirstMovie, indexOfLastMovie)

  // Move to next page
  const pageUp = () => {
    setCurrentPage(currentPage + 1)
  }

  // Move to previous page
  const pageDown = () => {
    setCurrentPage(currentPage - 1)
  }

  if(loading) {
    return <Spinner />
  }

  return (
    <div className="App">
      <div className="Navigation">
        <FilterBar categories={categories} update={updateFilter} />

        <Pagination 
          totalMovies={filteredMovies.length}
          indexOfFirstMovie={indexOfFirstMovie}
          indexOfLastMovie={indexOfLastMovie}
          currentPage={currentPage}
          pageUp={pageUp}
          pageDown={pageDown}
          changeMoviesPerPage={setMoviesPerPage} />
      </div>

      <div className="Content">
        {currentFilteredMovies.map(movie => <Card 
                                        key={movie.id} 
                                        movie={movie} 
                                        remove={removeMovie}
                                        updateLike={updateLike} 
                                        updateDislike={updateDislike} />)}
      </div>
      
    </div>
  );
}

const mapStateToProps = state => ({
  movies: state.movies
})

export default connect(mapStateToProps, {getMovies, removeMovie, updateFilter, updateLike, updateDislike})(App);
