import React, { useState } from "react";
import DatePicker from 'react-datepicker';

import Modal from "./Modal";

import './styles.css';

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

    function onSubtasksChange(subtasks){
        setSubtasks(subtasks);
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
        if (finishDate && (status.toUpperCase() !== 'DONE')){
            setShowError(true);
            showErrorMessage('A task with finish date have to have status "done"');
        }
        let task = {
            id: props.task.id,
            name: name,
            status: status,
            description: description,
            createDate: props.createDate,
            priority: priority,
            
        }
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
                <input type="text" className="modalField" value={name} placeholder="Name of the task" onChange={setName} />
            </div>
            <p className="text">Status</p>
            <input type='radio' name='status' value='new' checked={status.toUpperCase() === 'NEW' ? true : false} onChange={onChangeStatus} />
            <input type='radio' name='status' value='in progress' checked={status.toUpperCase() === 'IN PROPGRESS' ? true : false} onChange={onChangeStatus} />
            <input type='radio' name='status' value='done' checked={status.toUpperCase() === 'DONE' ? true : false} onChange={onChangeStatus} />

        </Modal>
    )
    
}