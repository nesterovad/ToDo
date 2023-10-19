import React from "react";

import './styles.css';

export default function Modal(props){
    if (!props.showModal){
        return null;
    }else{
        return (
            <>
                <div className="background" onClick={props.onClose}/>
                <div className="modal">
                    {props.children}
                </div>
            </>
        )
    }
}