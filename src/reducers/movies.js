import {
    LOADING, 
    ERROR, 
    FETCH_DATA, 
    UPDATE_CATEGORY_LIST, 
    REMOVE_MOVIE, 
    UPDATE_FILTERED_CATEGORY, 
    FILTER_MOVIES, 
    UPDATE_LIKE, 
    UPDATE_DISLIKE} from '../actions/actionTypes'

const initialState = {
    movies: [],
    filteredMovies: [],
    filteredCategory: 'all',
    categories: [],
    loading: false,
    error: false,
}

export default function movies(state = initialState, action) {
    const {type, payload, error} = action
    let idx, status, newMovie

    switch(type) {
        case LOADING:
            return {...state, loading: true}

        case ERROR:
            return {...state, loading: false, error: error}

        case FETCH_DATA:
            return {...state, movies: payload, loading: false, error: false}

        case UPDATE_CATEGORY_LIST:
            const newCategories = [...new Set(state.movies.map(movie => movie.category))]
            return {...state, categories: newCategories, loading: false, error: false}

        case FILTER_MOVIES:
            const newFilteredMovies = state.movies.filter(movie => movie.category === state.filteredCategory)

            if(newFilteredMovies.length === 0) {
                return {...state, filteredMovies: state.movies, filteredCategory: 'all', loading: false, error: false}
            } 

            return {...state, filteredMovies: newFilteredMovies, loading: false, error: false}

        case UPDATE_FILTERED_CATEGORY:
            return {...state, filteredCategory: payload.category}

        case REMOVE_MOVIE: 
            idx = state.movies.map(movie => movie.id).indexOf(payload.id) // get index of movie
            return {...state, movies: [...state.movies.slice(0, idx), ...state.movies.slice(idx+1)]}

        case UPDATE_LIKE: 
            idx = state.movies.map(movie => movie.id).indexOf(payload.id) // get index of movie
            newMovie = {...state.movies[idx]}  // clone the movie
            status = newMovie.status           // get status
            if(status === 'none') {
                newMovie.status = 'liked'
                newMovie.likes += 1
                return {...state, movies:[...state.movies.slice(0, idx), newMovie, ...state.movies.slice(idx + 1)]}
            } else if(status === 'disliked') {
                newMovie.status = 'liked'
                newMovie.likes += 1
                newMovie.dislikes -= 1
                return {...state, movies:[...state.movies.slice(0, idx), newMovie, ...state.movies.slice(idx + 1)]}
            } else if (status === 'liked') {
                newMovie.status = 'none'
                newMovie.likes -= 1
                return {...state, movies:[...state.movies.slice(0, idx), newMovie, ...state.movies.slice(idx + 1)]}
            }
            break
        
        case UPDATE_DISLIKE: 
            idx = state.movies.map(movie => movie.id).indexOf(payload.id) // get index of movie
            newMovie = {...state.movies[idx]}   // clone the movie
            status = newMovie.status            // get status
            if(status === 'none') {
                newMovie.status = 'disliked'
                newMovie.dislikes += 1
                return {...state, movies:[...state.movies.slice(0, idx), newMovie, ...state.movies.slice(idx + 1)]}
            } else if(status === 'liked') {
                newMovie.status = 'disliked'
                newMovie.likes -= 1
                newMovie.dislikes += 1
                return {...state, movies:[...state.movies.slice(0, idx), newMovie, ...state.movies.slice(idx + 1)]}
            } else if (status === 'disliked') {
                newMovie.status = 'none'
                newMovie.dislikes -= 1
                return {...state, movies:[...state.movies.slice(0, idx), newMovie, ...state.movies.slice(idx + 1)]}
            }
            break

        default :
            return state
    }
}