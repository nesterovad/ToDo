import React from "react";

import { Column, TaskPreview } from "../components";

import { shortTasks } from "../testData";

import './pages.css';

export default function TasksPage(){

    function previewTasks(status){
        return (
            <>
                {shortTasks.filter(i => i.status.toUpperCase() === status.toUpperCase()).map(item =>
                        <TaskPreview task = {item} />
                    )}
            </>
        )
    }

    return (
        <>
            <div className="wrapper">
                <div className="col">
                    <Column name = 'New' >
                        {previewTasks('new')}  
                    </Column>
                </div>
                <div className="col">
                    <Column name = 'In progress'>
                        {previewTasks('In propgress')}
                    </Column>
                </div>
                <div className="col">
                    <Column name = 'Done'>
                        {previewTasks('Done')}
                    </Column>
                </div>
            </div>  
        </>
    )
}