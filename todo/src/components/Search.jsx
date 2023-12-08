import React, { useState } from "react";

import Modal from "./Modal";

import './styles.css';
import { useLocation, useNavigate, useParams } from "react-router-dom";
import api from "../backend/backend";

/**
 * Компонент поиска, при нажатии кнопки перенаправляет на модальное окно с результатами поиска
 * @param {object} props - projId - id проекта, location - данные location страницы, на которой расположен
 * @returns 
 */
function Search(props){
    const [search, setSearch] = useState('');

    function onChange(e){
        setSearch(e.target.value);
    }

    return (
        <div style={{display: 'flex'}}>
            <input type='text' className="searchInput" onChange = {onChange} placeholder='Type name or id for search'/>
            <button className="button"><Link to={`/project/${props.projId}/search/${search}`} state={{previousLocation: props.location}}>Search</Link></button>
        </div>
    )
}

/**
 * Компонент модального окна с результатами поиска задач. Получает необходимые для поиска данные из адресной строки. выполняет поиск и отображает его результаты. При нажатии на результат перенаправляет на можальное окно просмотра выбранной задачи
 * @returns 
 */
function SearchResults(){
    const id = useParams();
    const navigate = useNavigate();
    const location = useLocation();
    const data = {
        projId: id.id,
        search: id.query
    }
    const tasks = api("tasks", "post", data).data;

    /**
     * Функция отображения результатов поиска. При нажатии на результат выполняет перенаправление на окно просмотра выбранной задачи
     * @returns 
     */
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