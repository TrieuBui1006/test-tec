import React from 'react'

import {FaTrashAlt} from 'react-icons/fa'
import classes from './Card.module.css'
import Jauge from '../Jauge/Jauge'
import image from '../../assets/film.jpg'

const Card = ({movie:{id, title, category, likes, dislikes, status}, remove, updateLike, updateDislike}) => {
    return (
        <div className={classes.Card}>
            <img className={classes.Image} src={image} alt={title} />
            <div className={classes.Detail}>
                <h2>{title}</h2>
                <p>{category}</p>
            </div>
            
            <div className={classes.Actions}>
                <Jauge 
                    likes={likes} 
                    dislikes={dislikes} 
                    id={id} 
                    updateLike={updateLike} 
                    updateDislike={updateDislike}
                    status={status} />

                <button className={classes.RemoveBtn} onClick={e => remove(id)}><FaTrashAlt/> Remove</button>
            </div>
        </div>
    )
}

export default React.memo(Card)
