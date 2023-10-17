import React from "react";

import './styles.css';

export default function Column(props){
    return (
        <div className="column" >
            <h3 className="columnName">{props.name}</h3>
            {props.children}
        </div>
    )
}