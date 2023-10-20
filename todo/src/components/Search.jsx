import React, { useState } from "react";

import Modal from "./Modal";

import './styles.css';

function Search(props){
    const [search, setSearch] = useState('');

    function onChange(e){
        setSearch(e.target.value);
    }

    function onSearch(){
        props.onSearch(search);
    }

    return (
        <div style={{display: 'flex'}}>
            <input type='text' className="searchInput" onChange = {onChange} placeholder='Type name or id for search'/>
            <button className="button" onClick={onSearch}>Search</button>
        </div>
    )
}

function SearchResults(props){
    if(!props.showRes){
        return null;
    }else{
        function showTasks(){
            return (
                <>
                    {props.tasks.map(i => 
                        <div className="searchRes" onClick={() => toTask(i.id)}>
                            <h4 className="taskHeader">{i.name}</h4>
                        </div>
                        )}
                </>
            )
        }

        function toTask(id){
            props.toTask(id);
        }

        return (
            <>
               <Modal showModal={props.showRes} onClose={props.onClose}>
                    <h4 className="taskHeader">Results for {props.search}</h4>
                    {showTasks()}
                </Modal> 
            </>
        )
    }
}

export {Search, SearchResults}