import React, { Component, useState } from "react";
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { useSelector, useDispatch } from "react-redux";

import { taskAdded, taskEdited } from "../store/tasksSlice";

import Modal from "./Modal";
import { Subtask, EditSubtask } from "./Subtask";
import Comments from "./Comments";

import './styles.css';
import { useNavigate, useParams } from "react-router-dom";

import api from "../backend/backend";

/**
 * Форма создания и редактирования задачи
 * @param {object} props - Объект задачи, функция сохранения изменений saveTask, индикатор демонстрации формы showEdit и функция закрытия onClose
 * @returns {Component} - Окно формы создания и редактирования задачи
 */
export default function EditTaskModal(props){
    const navigate = useNavigate();
    const id = useParams();
    const reqData = {
        projId: id.id,
        id: id.taskId
    };
    const tmp = api("task", "get", reqData);
    const [name, setName] = useState(tmp.data ? tmp.data.name : "");
    const [status, setStatus] = useState(tmp.data ? tmp.data.status : "new");
    const [description, setDescription] = useState(tmp.data ? tmp.data.description : "");
    const [priority, setPriority] = useState(tmp.data ? tmp.data.priority : "low");
    const [endDate, setEndDate] = useState(tmp.data ? tmp.data.endDate : "");
    const [startDate, setStartDate] = useState(tmp.data ? tmp.data.startDate : "");
    const [subtasks, setSubtasks] = useState(tmp.data ? tmp.data.subtasks : []);
    const [comments, setComments] = useState(tmp.data ? tmp.data.comments : []);
    const [files, setFiles] = useState(tmp.data ? tmp.data.files : []);
    const [dateToDisplay, setDateToDisplay] = useState(new Date());
    const [showError, setShowError] = useState(false);
    const [finishDate, setFinishDate] = useState(tmp.data ? tmp.data.finishDate : "");
    const [createDate, setCreateDate] = useState(tmp.data ? tmp.data.createDate : "");
    const [subtaskTemplate, setSubtaskTemplate] = useState({
                                                            id: subtasks.length,
                                                            name: '',
                                                            status: 'new'
                                                            });
    const dispatch = useDispatch();

    /**
     * Очищает поля от предыдущего ввода при закрытии
     */
    function clear(){
        setName('');
        setDescription('');
        setComments([]);
        setFiles([]);
    }

    
    function onEditName(e){
        setName(e.target.value);
    }

    function onChangeStatus(e){
        setStatus(e.target.value);
    }

    function onChangeDescription(e){
        setDescription(e.target.value);
    }

    function onChangePrirority(e){
        setPriority(e.target.value)
    }

    function onEndDateChange(date){
        setEndDate(date);
    }

    function onStartDateChange(date){
        setStartDate(date);
    }

    function onSubtasksChange(subs){
        setSubtasks(subs);
        setSubtaskTemplate({
                            id: subtasks.length,
                            name: '',
                            status: 'new'
                            });
    };

    function onAddSubtasks(subtask){
        let tmp = subtasks.slice();
        tmp.push(subtask);
        onSubtasksChange(tmp);
    }

    function onChangeSubtask(subtask){
        let tmp = subtasks.filter(i => i.id !== subtask.id);
        tmp.push(subtask);
        onSubtasksChange(tmp);
    }

    function onCommentsChange(comment){
        let tmp = comments.slice();
        tmp.push(comment);
        setComments(tmp);
    }

    function onFileAdd(e){
        let tmp = files.slice();
        tmp.push(e.target.files[0].name);
        setFiles(tmp);
    }

    function onFileDelete(file){
        let tmp = files.filter(i => i !== file);
        setFiles(tmp);
    }

    function onFinishDateChange(date){
        setFinishDate(date);
    }

    function onCreateDateChange(date){
        setCreateDate(date);
    }

    /**
     * Функция соххранения новой/отредактированной задачи. После сохранения закрывает модальное окно
     */
    function onSave(){
        setShowError(false);
        if (finishDate && (status.toUpperCase() !== 'DONE')){
            setShowError(true);
            showErrorMessage('A task with finish date have to have status "done"');
        }
        if (finishDate < createDate){
            setShowError(true);
            showErrorMessage("Finish date can't be earlier than date of creation");
        }
        if (endDate < createDate){
            setShowError(true);
            showErrorMessage("Planned finish date can't be earlier than date of creation");
        }
        if (startDate < createDate){
            setShowError(true);
            showErrorMessage("Date when the task was started can't be earlier than date of creation");
        }
        if (startDate && (status.toUpperCase() === 'NEW')){
            setShowError(true);
            showErrorMessage("A new task can't have date when it was started");
        }
        let task = {
            projId: id.id,
            name: name,
            status: status,
            description: description,
            createDate: createDate,
            priority: priority,
            finishDate: finishDate,
            endDate: endDate,
            subtasks: subtasks,
            comments: comments,
            files: files,
        };
        if(tmp.status === '200'){
            task = {...task, id: id.taskId};
            api("task", "update", task);
            dispatch(
                taskEdited(task)
            );
        }else{
            let res = api('task', 'post', task);
            task = {...task, id: res.data.id};
            dispatch(
                taskAdded(task)
            );
        }
        navigate(`/project/${id.id}`)
        clear(); 
    }

    function showErrorMessage(message){
        if(!showError){
            return null;
        }
        return (
            <div className="errorMessage">
                <p className="errorText">{message}</p>
            </div>
        )
    }

    return (
        <Modal onClose={() => navigate(`/project/${id.id}`)}>
            <h4 className="taskHeader">{name ? "Edit task " + name : "New task"}</h4>
            <div style={{overflowX: "hidden", overflowY: "auto", height: "75dvh"}}>
                <div className="modalField">
                    <p className="text">Task name</p>
                    <input type="text" className="modalInput" value={name} placeholder="Name of the task" onChange={onEditName} />
                </div>
                <p className="text">Description</p>
                <textarea className="descriptionArea" placeholder="Description of the task" value={description} onChange={onChangeDescription}/>
                <p className="text">Status</p>
                <div style={{display: 'flex', flexDirection: 'row'}}>
                    <p className="text">
                        <input type='radio' name='status' value='new' checked={status.toUpperCase() === 'NEW' ? true : false} onChange={onChangeStatus} />
                        New
                    </p>
                    <p className="text">
                        <input type='radio' name='status' value='in progress' checked={status.toUpperCase() === 'IN PROGRESS' ? true : false} onChange={onChangeStatus} />
                        In progress
                    </p>
                    <p className="text">
                        <input type='radio' name='status' value='done' checked={status.toUpperCase() === 'DONE' ? true : false} onChange={onChangeStatus} />
                        Done
                    </p>
                    
                </div>
                <p className="text">Priority</p>
                <div style={{display: 'flex', flexDirection: 'row'}}>
                    <p className="text">
                        <input type="radio" name='priority' value='low' checked={priority.toUpperCase() === 'LOW' ? true : false} onChange={onChangePrirority} />
                        Low
                    </p>
                    <p className="text">
                        <input type="radio" name='priority' value='middle' checked={priority.toUpperCase() === 'MIDDLE' ? true : false} onChange={onChangePrirority} />
                        Middle
                    </p>
                    <p className="text">
                        <input type="radio" name='priority' value='high' checked={priority.toUpperCase() === 'HIGH' ? true : false} onChange={onChangePrirority} />
                        High
                    </p>
                    
                </div>
                <div className="modalField">
                    <p className="text">Date of creation</p>
                    <DatePicker selected={dateToDisplay} onChange={onCreateDateChange} />
                </div>
                <div className="modalField">
                    <p className="text">Planned finish date</p>
                    <DatePicker selected={dateToDisplay} onChange={onEndDateChange} />
                </div>
                <div className="modalField">
                    <p className="text">Finish date</p>
                    <DatePicker selected={dateToDisplay} onChange={onFinishDateChange} />
                </div>
                <div className="modalField">
                    <p className="text">Start date</p>
                    <DatePicker selected={dateToDisplay} onChange={onStartDateChange} />
                </div>
                <p className="text">Subtasks</p>
                {subtasks.map(i => <Subtask subtask={i} updateSubtask={onChangeSubtask} />) }
                <EditSubtask subtask={subtaskTemplate} saveSubtask={onAddSubtasks} />
                <p className="text">Files</p>
                {files.map(i => <p>{i}</p>)}
                <input type='file' className="modalButton" onChange={onFileAdd}/>
                <p className="text">Comments</p>
                <Comments comments={comments} updateComments={onCommentsChange} />
                <button className="modalButton" onClick={onSave}>Save</button>
            </div>
        </Modal>
    )
    
}