import React from "react";
import 'scrollable-component';

import './styles.css';

export default function Modal(props){
        return (
            <>
                <div className="background" onClick={props.onClose}/>
                
                <div className="modal">
                    {props.children}
                </div>
                
                
            </>
        )
}