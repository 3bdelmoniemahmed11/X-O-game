import React from 'react'

export default function Square(props) {
    return (
            <button className="Square" onClick={props.onClick}>
                {props.value}
            </button>

    )
}
