import React from 'react'
import './app-item.css'

function AppItem(props) {
    return (
        <div>
            <h2>{props.App}</h2>
            <div>Rating: {props.Rating}</div>
            <div>Genres: {props.Genres}</div>
        </div>
    )
}

export default AppItem