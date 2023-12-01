import React, { useState } from "react";
import { useDispatch } from "react-redux";

import { taskDeleted, taskEdited } from "../store/tasksSlice";

import Modal from "./Modal";
import {Subtask} from "./Subtask";
import Files from "./Files";
import Comments from "./Comments";

import './styles.css';
import { useNavigate, useParams } from "react-router-dom";

export default function TaskModal(props){
    const id = useParams();
    const navigate = useNavigate();
    console.log(id);
    const [task, setTask] = useState(props.task);
    const dispatch = useDispatch();

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
        dispatch(
            taskEdited(task)
        );
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
        let tmp = task;
        tmp.comments = comments;
        setTask(tmp);
        dispatch(
            taskEdited(task)
        );
    }

    function onDelete(){
        props.onClose();
        dispatch(
            taskDeleted(props.task)
        );
    }

    function onEdit(){
        props.onEdit(props.task.id);
        props.onClose();
    }

    return (
        <Modal onClose={() => navigate(`/project/${props.task.projId}`)}>
            <header style={{display:'flex', flexDirection:'row', justifyContent:'flex-end'}}>
                <button className="modalButton" onClick={onEdit}>Edit</button>
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