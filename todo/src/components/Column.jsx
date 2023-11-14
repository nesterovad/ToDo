import React, { useState } from "react";
import { useDrop } from "react-dnd";
import { useDispatch } from "react-redux";

import { taskDropped } from "../store/tasksSlice";

import TaskPreview from "./TaskPreview";

import './styles.css';

export default function Column(props){
    const tasks = props.tasks;
    const dispatch = useDispatch();
    const [{isOver}, drop] = useDrop(() => ({
        accept: 'TASK',
        drop: (item) => update(item.id),
        collect: (monitor) => ({
            isOver: !!monitor.isOver(),
        }),
    }));

    function update(id){
       let newStatus = props.name;
        let taskToUpdate = tasks.find(i => i.id === id);
        let prevStatus = taskToUpdate.status;
       let updatedTask = {
        projId: taskToUpdate.projId,
        id: taskToUpdate.id,
        name: taskToUpdate.name,
        status: newStatus,
        description: taskToUpdate.description,
        createDate: taskToUpdate.createDate,
        priority: taskToUpdate.priority,
        finishDate: taskToUpdate.finishDate,
        endDate: taskToUpdate.endDate,
        startDate: taskToUpdate.startDate,
        subtasks: taskToUpdate.subtasks,
        comments: taskToUpdate.comments,
        files: taskToUpdate.files
       };
        let updated = updateDate(updatedTask, prevStatus);
        dispatch(
           taskDropped(updated)
        );
        
    }

    function updateDate(task, prevStatus){
       
        if ((prevStatus.toUpperCase() === 'DONE') && (task.status.toUpperCase() !== 'DONE')){
            task.finishDate = undefined;
        }
        if ((prevStatus.toUpperCase() !== 'DONE') && (task.status.toUpperCase() === 'DONE')){
            task.finishDate = new Date();
        }
        if (task.status.toUpperCase() === 'NEW'){
            task.startDate = undefined;
        }
        if ((prevStatus.toUpperCase() !== 'IN PROGRESS') && (task.status.toUpperCase() === 'IN PROGRESS')){
            task.startDate = new Date();
        }
        return task;
    }

    function previewTasks(status){
        return (
            <>
                {tasks.filter(i => i.status.toUpperCase() === status.toUpperCase()).map(item =>
                        <TaskPreview task = {item} toTask={props.toTask}/>
                    )}
            </>
        )
    }

    return (
        <div className="column" ref={drop}>
            <h3 className="columnName">{props.name}</h3>
            {previewTasks(props.name)}
        </div>
    )
}