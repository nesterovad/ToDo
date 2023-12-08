import React from "react";

import './styles.css';

/**
 * Компонент файлов. Позволяет просматривать и загружать файлы
 * @param {object} props - files - массив файлов
 * @returns 
 */
export default function Files(props){
    //because of no server saving files this function downloads a hardcoded file
    function downloadFile(filename){
        const fileContent = 'This is a hardcoded file content. This file can be replaced with a file got from a server with no string limits for using memory.';
        const blob = new Blob([fileContent], {type: 'text/plain'});
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.download = filename;
        link.href = url;
        link.click();
    }

    return (
        <div>
            {props.files.map(i => <p className="filename" onClick={() => downloadFile(i)}>{i}</p>)}
        </div>
    )
}