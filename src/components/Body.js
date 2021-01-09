import React from 'react'

const Body = () => {
    return (
        <section id="body">
            <div className="create">
                <div className="circle-check"></div>
                <input type="text" id="name" placeholder="Create a new todo..." />
            </div>
        </section>
    )
}

export default Body