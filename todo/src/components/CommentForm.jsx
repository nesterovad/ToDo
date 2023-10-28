import React, { Component, useState } from "react";

import './styles.css';

/**
 * Компонент ввода коментария
 * @param {*} props - Функиция коллбэка для добавления комментария addComment
 * @returns {Component} - Форма добавления комментария
 */

export default function CommentForm(props){
    const [input, setInput] = useState('');

    function onChange(e){
        setInput(e.target.value);
    }

    function onAdd(){
        props.addComment(input);
        setInput('');
    }

    return (
        <div style={{display: "flex", flexDirection: 'row'}}>
            <input type="text" className="commentInput" onChange={onChange} value={input}/>
            <button className="commentButton" onClick={onAdd}>Add</button>
        </div>
    )
}