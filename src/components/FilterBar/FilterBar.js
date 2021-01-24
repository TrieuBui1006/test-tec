import React from 'react'

import classes from './FilterBar.module.css'

const FilterBar = ({categories, update}) => {
    return (
        <div className={classes.FilterBar}>
            <select className={classes.Select} onChange={e => update(e.target.value)}>
                <option value='all'>All categories</option>
                {categories.map(category => <option key={category} value={category}>{category}</option>)}
            </select>
        </div>
    )
}

export default FilterBar
