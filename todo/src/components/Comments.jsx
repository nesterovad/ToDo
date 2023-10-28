import React, { Component, useState } from "react";

import CommentForm from "./CommentForm";

import './styles.css';

/**
 * Компонент комментариев, принимает в props функцию обновления комментариев в задаче updateComment, блок комментариев comments, отображает уже существующие комментарии и позаоляет добавлять новые.
 * В props.commnts ожидает структуру вида
 * [
 * {
 *  id: number, 
 *  text: 'comment text'
 * },
 * ] или пустой массив
 * @returns {Component} - Блок, отображающий существующие комментарии и форму добавления нового
 */

export default function Comments(props){
    const [comments, setComments] = useState(props.comments);

    /**
     * функция добавления нового комментария, добавляет объект комментария в свое состояние и выполняет коллбэк для обновления ролдительского компонента
     * @param {string} commentText - Текст добавляемого комментария 
     */
    function addComment(commentText){
        let newComment = {
            id: comments.length,
            text: commentText
        };
        let tmp = comments;
        tmp.push(newComment);
        setComments(tmp);
        props.updateComments(tmp);
    }

    /**
     * Функция отображения комментария
     * @param {string} comm - Текст комментария 
     * @returns {Component} - Блок, содердащий отображаемый комментарий
     */
    function commentField(comm){
        return (
            <div className="commentField">
                <p className="comment">{comm}</p>
            </div>
        )
    }

    /**
     * Функция вывода всех комментариев
     */
    function renderComments(){
        <>
            {comments.map(i => commentField(i.text))}
        </>
    }

    return (
        <>
            {renderComments()}
            <CommentForm addComment={addComment} />
        </>
    )
}