import React, { useState } from "react";
import { useDrop } from "react-dnd";
import { useDispatch } from "react-redux";

import { taskDropped } from "../store/tasksSlice";

import TaskPreview from "./TaskPreview";

import './styles.css';
import api from "../backend/backend";

/**
 * Компонент столбца для страницы задач, участвует в drag-n-drop
 * @param {object} props -  tasks - массив объектов задач, name - название столбца,  
 * @returns 
 */
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

    /**
     * Функция обновления статуса и дат начала работы/завершения задачи при drag-n-drop
     * @param {number} id - id задачи для обновления
     */
    function update(id){
       let newStatus = props.name;
        let taskToUpdate = tasks.find(i => i.id === id);
        let prevStatus = taskToUpdate.status;
        let updatedTask = {
        projId: taskToUpdate.projId,
        id: taskToUpdate.id,
        name: taskToUpdate.name,
        status: newStatus,
        createDate: taskToUpdate.createDate,
        finishDate: taskToUpdate.finishDate,
        endDate: taskToUpdate.endDate,
        startDate: taskToUpdate.startDate,
       };
        let updated = updateDate(updatedTask, prevStatus);
        dispatch(
           taskDropped(updated)
        );
        api("tasks", "update", updated);
        
    }

    /**
     * Функция изменения дат при смене статуса задачи
     * @param {object} task - обновляемая задача
     * @param {string} prevStatus - статус задачи до обновления
     * @returns 
     */
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

    /**
     * Функция отображения массива задач
     * @param {string} status - название столбца, соответствующее статусу отображаемых в нем задач
     * @returns 
     */
    function previewTasks(status){
        return (
            <>
                {tasks.filter(i => i.status.toUpperCase() === status.toUpperCase()).map(item =>
                        <TaskPreview task = {item} location = {props.location}/>
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