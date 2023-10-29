import React, { useState } from "react";

import Modal from "./Modal";
import {Subtask} from "./Subtask";
import Files from "./Files";
import Comments from "./Comments";

import './styles.css';

export default function TaskModal(props){
    const [task, setTask] = useState(props.task);

    if(!props.showTask){
        return null;
    }else{
              
    function renderDate(){
        if(props.task.endDate){
            if(props.task.startDate){
                return (
                    <p className="text">{props.task.startDate.toString()} - {props.task.endDate.toString()}</p>
                )
            }else{
                return (
                    <p className="text">{props.task.createDate.toString()} - {props.task.endDate.toString()}</p>
                )
            }
        }else if(props.task.startDate){
            return (
                <p className="text">{props.task.startDate.toString()}</p>
            )
        }else{
            return (
                <p className="text">{props.task.createDate.toString()}</p>
            )
        }
    }

    function renderInWork(){
        if(props.task.startDate){
            let today = new Date();
            let dif = today - props.task.startDate;
            return (
                <p className="text">In work for {Math.ceil(dif / (1000 * 60 * 60 * 24))} days</p>
            )
        }
    }

    function updateSubtasks(subtask){
        let tmp = props.task.subtasks.filter(i => i.id !== subtask.id);
        tmp.push(subtask);
        let tmp1 = task;
        tmp1.subtasks = tmp;
        setTask(tmp1);
    }

    function renderSubtasks(){
        return (
            <>
                {
                    props.task.subtasks.map(i => <Subtask subtask={i} updateSubtask={updateSubtasks} />)
                }
            </>
        )
    }

    function onCommentsUpdate(comments){
        setTask(props.task);
       // console.log(task);
      //  let tmp = task;
        //tmp.comments = comments;
       // setTask(tmp);
    }

    function onDelete(){
        props.onClose();
        props.onDelete(props.task.id);
    }

    return (
        <Modal showModal={props.showTask} onClose={props.onClose}>
            <header style={{display:'flex', flexDirection:'row', justifyContent:'flex-end'}}>
                <button className="modalButton" onClick={onDelete}>Delete</button>
            </header>
            <h4 className="taskHeader">{props.task.name}</h4>
            <p className="text">{props.task.id}</p>
            <p className="text">{props.task.description}</p>
            {renderDate()}
            <p className="text">{props.task.status}</p>
            <p className="text">{props.task.priority}</p>
            {renderInWork()}
            {renderSubtasks()}
            <p className="text">Files</p>
            <Files files={props.task.files} />
            <p className="text">Comments</p>
            <Comments updateComments={onCommentsUpdate} comments={props.task.comments}/>
        </Modal>
    )
}
}