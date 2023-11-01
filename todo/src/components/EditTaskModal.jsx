import React, { Component, useState } from "react";
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

import Modal from "./Modal";
import { Subtask, EditSubtask } from "./Subtask";

import './styles.css';

/**
 * Форма создания и редактирования задачи
 * @param {object} props - Объект задачи, функция сохранения изменений saveTask, индикатор демонстрации формы showEdit и функция закрытия onClose
 * @returns {Component} - Окно формы создания и редактирования задачи
 */
export default function EditTaskModal(props){
    const [name, setName] = useState(props.task.name);
    const [status, setStatus] = useState(props.task.status);
    const [description, setDescription] = useState(props.task.description);
    const [priority, setPriority] = useState(props.task.priority);
    const [endDate, setEndDate] = useState(props.task.endDate);
    const [startDate, setStartDate] = useState(props.task.startDate);
    const [subtasks, setSubtasks] = useState(props.task.subtasks);
    const [comments, setComments] = useState(props.task.comments);
    const [files, setFiles] = useState(props.task.files);
    const [dateToDisplay, setDateToDisplay] = useState(new Date());
    const [showError, setShowError] = useState(false);
    const [finishDate, setFinishDate] = useState(props.task.finishDate);
    const [createDate, setCreateDate] = useState(props.task.createDate);
    const [subtaskTemplate, setSubtaskTemplate] = useState({
                                                            id: subtasks.length,
                                                            name: '',
                                                            status: 'new'
                                                            });

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
        let commentObj = {
            id: comments.length,
            text: comment
        };
        tmp.push(commentObj);
        setComments(tmp);
    }

    function onFileAdd(file){
        let tmp = files.slice();
        tmp.push(file);
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
            id: props.task.id,
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
       props.saveTask(task); 
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
        <Modal showModal={props.showEdit} onClose={props.onClose}>
            <h4 className="taskHeader">{props.task.name ? 'Edit task' : 'New task'}</h4>
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
            <p className="text">Comments</p>
            <button className="modalButton" onClick={onSave}>Save</button>
        </Modal>
    )
    
}