import React from "react";

import Modal from "./Modal";

import './styles.css';

export default function TaskModal(props){
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

    return (
        <Modal showModal={props.showTask} onClose={props.onClose}>
            <h4 className="taskHeader">{props.task.name}</h4>
            <p className="text">{props.task.id}</p>
            <p className="text">{props.task.description}</p>
            {renderDate()}
            <p className="text">{props.task.status}</p>
            <p className="text">{props.task.priority}</p>
            {renderInWork()}
        </Modal>
    )
}
}