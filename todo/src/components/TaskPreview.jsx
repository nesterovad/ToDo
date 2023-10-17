import React from "react";

import './styles.css';

export default function TaskPreview(props){

    return (
        <div className="taskPreview">
            <h4 className="taskHeader">{props.task.name}</h4>
        </div>
    )
}