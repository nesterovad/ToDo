import React, { useState } from "react";
import CheckOutlinedIcon from '@mui/icons-material/CheckOutlined';
import CircleOutlinedIcon from '@mui/icons-material/CircleOutlined';

import './styles.css';

export default function Subtask(props){
    const [subtask, setSubtaks] = useState(props.subtask);

    function changeStatus(){
        let tmp = subtask;
        if (subtask.status === 'new'){
            tmp.status = 'in process';
        }else if (subtask.status === 'in process'){
            tmp.status = 'done';
        }else{
            tmp.status = 'new';
        }
        setSubtaks(tmp);
        props.updateSubtask(tmp);
    }

    function renderStatus(){
        if (subtask.status === 'new'){
            return (
                <div className="subtaskStatus" onClick={changeStatus} />
            )
        }else if (subtask.status === 'in process'){
            return (
                <div className="subtaskStatus" onClick={changeStatus}>
                    <CircleOutlinedIcon color='primary' sx={{fontSize: 16}} />
                </div>
            )
        }else{
            return (
                <div className="subtaskStatus" onClick={changeStatus}>
                    <CheckOutlinedIcon color='success' sx={{fontSize: 16}} />
                </div>
            )
        }
    }

    return (
        <div className='subtask'>
            {renderStatus()}
            <p className="subtaskName">{subtask.name}</p>
        </div>
    )
}