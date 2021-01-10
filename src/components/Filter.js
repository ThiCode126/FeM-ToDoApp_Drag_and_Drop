import React from 'react'

const Filter = ({handleFilter, filter}) => {
    return (
        
        <div className="filter">
        <span 
            className={`pointer ${filter === null ? 'active' : ''}`} 
            onClick={() => handleFilter(null)}
        >
            All
        </span>
        <span 
            className={`pointer ${filter === true ? 'active' : ''}`} 
            onClick={() => handleFilter(true)}
        >
            Active
        </span>
        <span 
            className={`pointer ${filter === false ? 'active' : ''}`} 
            onClick={() => handleFilter(false)}
        >
            Completed
        </span>
    </div>
    )
}

export default Filter