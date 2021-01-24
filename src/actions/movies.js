import {movies$} from '../movies'
import {
    LOADING, 
    ERROR, 
    FETCH_DATA, 
    UPDATE_CATEGORY_LIST, 
    REMOVE_MOVIE, 
    UPDATE_FILTERED_CATEGORY, 
    FILTER_MOVIES, 
    UPDATE_LIKE, 
    UPDATE_DISLIKE} from './actionTypes'

export const getMovies = () => async dispatch => {
    dispatch({type: LOADING})

    try {
        const movies = await movies$
            
        if(!movies || movies === 0) {
            return dispatch({type: ERROR, error: 'Not Found'})
        }

        movies.forEach(movie => movie.status = 'none')

        console.log(movies)

        dispatch({type: FETCH_DATA, payload: movies})

        dispatch({type: UPDATE_CATEGORY_LIST})

        dispatch({type: FILTER_MOVIES})

    } catch (error) {
        dispatch({type: ERROR, error: 'Get movies error'})
    }
}

export const removeMovie = (id) => dispatch => {
    dispatch({type: REMOVE_MOVIE, payload: {id: id}})

    dispatch({type: UPDATE_CATEGORY_LIST})

    dispatch({type: FILTER_MOVIES})
}

export const updateFilter = (category) => dispatch => {
    dispatch({type: LOADING})

    dispatch({type: UPDATE_FILTERED_CATEGORY, payload:{category: category}})

    dispatch({type: FILTER_MOVIES})
}

export const updateLike = (id) => dispatch => {
    dispatch({type: UPDATE_LIKE, payload: {id: id}})

    dispatch({type: FILTER_MOVIES})
}

export const updateDislike = (id) => dispatch => {
    dispatch({type: UPDATE_DISLIKE, payload: {id: id}})

    dispatch({type: FILTER_MOVIES})
}