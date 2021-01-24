import React from 'react'

import {FaChevronLeft, FaChevronRight} from 'react-icons/fa'
import classes from './Pagination.module.css'

const Pagination = ({totalMovies, indexOfFirstMovie, indexOfLastMovie, currentPage, pageUp, pageDown, changeMoviesPerPage}) => {
    return (
        <div className={classes.Pagination}>
            <p>Items per page:</p>
            <select onChange={e => changeMoviesPerPage(e.target.value)} className={classes.Select}>
                <option value={4}>4</option>
                <option value={8}>8</option>
                <option value={12}>12</option>
            </select>
            <p className={classes.Detail}>{indexOfFirstMovie + 1} - {indexOfLastMovie} of {totalMovies}</p>
            <button 
                className={classes.Button} 
                disabled={currentPage > 1 ? false : true} 
                onClick={e => pageDown()}><FaChevronLeft /></button>
            <button
                className={classes.Button} 
                disabled={indexOfLastMovie >= totalMovies ? true : false}
                onClick={e => pageUp()} ><FaChevronRight /></button>
        </div>
    )
}

export default Pagination
