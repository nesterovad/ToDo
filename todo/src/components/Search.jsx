import React, { useState } from "react";

import Modal from "./Modal";

import './styles.css';
import { useLocation, useNavigate, useParams } from "react-router-dom";
import api from "../backend/backend";

function Search(props){
    const [search, setSearch] = useState('');
    const navigate = useNavigate();

    function onChange(e){
        setSearch(e.target.value);
    }

    function onSearch(){
       // props.onSearch(search);
    }

    return (
        <div style={{display: 'flex'}}>
            <input type='text' className="searchInput" onChange = {onChange} placeholder='Type name or id for search'/>
            <button className="button"><Link to={`/project/${props.projId}/search/${search}`} state={{previousLocation: props.location}}>Search</Link></button>
        </div>
    )
}

function SearchResults(props){
    const id = useParams();
    const navigate = useNavigate();
    const location = useLocation();
    const data = {
        projId: id.id,
        search: id.query
    }
    const tasks = api("tasks", "post", data).data;

        function showTasks(){
            return (
                <>
                    {tasks.map(i => 
                        <div className="searchRes">
                            <Link to={`/project/${id.id}/${i.id}`} state={{previousLocation: location}}>
                            <h4 className="taskHeader">{i.name}</h4>
                            </Link>
                            
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
               <Modal onClose={() => navigate(`/project/${id.id}`)}>
                    <h4 className="taskHeader">Results for {id.query}</h4>
                    {showTasks()}
                </Modal> 
            </>
        )
    
}

export {Search, SearchResults}