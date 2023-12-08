import React from "react";
import 'scrollable-component';

import './styles.css';

/**
 * Базовый компонент модального окна
 * @param {object} props - onClose - функция, выполняемая при нажатии на фон, children - дочерние элементы - контент окна 
 * @returns 
 */
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