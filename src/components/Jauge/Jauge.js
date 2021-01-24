import React from 'react'
import {FaThumbsUp, FaThumbsDown} from 'react-icons/fa'

import classes from './Jauge.module.css'

const Jauge = ({likes, dislikes, updateLike, updateDislike, id, status}) => {
    return (
        <div className={classes.Jauge}>
            <button 
                style={status === 'liked' ? {color:'#cf2122', borderBottom:'1px solid #cf2122'} : null} 
                onClick={e => updateLike(id)}><FaThumbsUp /> {likes}</button>
            <button 
                style={status === 'disliked' ? {color:'#cf2122', borderBottom:'1px solid #cf2122'} : null} 
                onClick={e => updateDislike(id)}><FaThumbsDown /> {dislikes}</button>
        </div>
    )
}

export default Jauge
