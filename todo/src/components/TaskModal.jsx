import React, { useState } from "react";
import { useDispatch } from "react-redux";

import { taskDeleted, taskEdited } from "../store/tasksSlice";

import Modal from "./Modal";
import {Subtask} from "./Subtask";
import Files from "./Files";
import Comments from "./Comments";

import './styles.css';
import { useLocation, useNavigate, useParams, Link } from "react-router-dom";
import api from "../backend/backend";

export default function TaskModal(){
    const id = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const location = useLocation();
    const reqData = {
        projId: id.id,
        id: id.taskId
    };
    const tmp = api("task", "get", reqData);
    
    const [task, setTask] = useState(tmp.data);
            
    function renderDate(){
        if(task.endDate){
            if(task.startDate){
                return (
                    <p className="text">{task.startDate.toString()} - {task.endDate.toString()}</p>
                )
            }else{
                return (
                    <p className="text">{task.createDate.toString()} - {task.endDate.toString()}</p>
                )
            }
        }else if(task.startDate){
            return (
                <p className="text">{task.startDate.toString()}</p>
            )
        }else{
            return (
                <p className="text">{task.createDate.toString()}</p>
            )
        }
    }

    function renderInWork(){
        if(task.startDate){
            let today = new Date();
            let dif = today - task.startDate;
            return (
                <p className="text">In work for {Math.ceil(dif / (1000 * 60 * 60 * 24))} days</p>
            )
        }
    }

    function updateSubtasks(subtask){
        let tmp = task.subtasks.filter(i => i.id !== subtask.id);
        tmp.push(subtask);
        let tmp1 = task;
        tmp1.subtasks = tmp;
        setTask(tmp1);
        api("task", "update", task);
        dispatch(
            taskEdited(task)
        );
    }

    function renderSubtasks(){
        return (
            <>
                {
                    task.subtasks.map(i => <Subtask subtask={i} updateSubtask={updateSubtasks} />)
                }
            </>
        )
    }

    function onCommentsUpdate(comments){
        setTask(task);
        let tmp = task;
        tmp.comments = comments;
        setTask(tmp);
        api("task", "update", task);
        dispatch(
            taskEdited(task)
        );
    }

    function onDelete(){
        dispatch(
            taskDeleted(task)
        );
        api("task", "delete", task);
        navigate(`/project/${id.id}`);
    }

    return (
        <Modal onClose={() => navigate(`/project/${id.id}`)}>
            <header style={{display:'flex', flexDirection:'row', justifyContent:'flex-end'}}>
                <button className="modalButton"><Link to={`/project/${id.id}/${id.taskId}/edit`} state={{previousLocation: location.state.previousLocation}} >Edit</Link></button>
                <button className="modalButton" onClick={onDelete}>Delete</button>
            </header>
            <h4 className="taskHeader">{task.name}</h4>
            <p className="text">{task.id}</p>
            <p className="text">{task.description}</p>
            {renderDate()}
            <p className="text">{task.status}</p>
            <p className="text">{task.priority}</p>
            {renderInWork()}
            {renderSubtasks()}
            <p className="text">Files</p>
            <Files files={task.files} />
            <p className="text">Comments</p>
            <Comments updateComments={onCommentsUpdate} comments={task.comments}/>
        </Modal>
    )
}