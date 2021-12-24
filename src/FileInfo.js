import React from 'react'
import './FileInfo.css'

function FileInfo({fileInfo,removeAllFiles}) {
    return (
        <>
        {fileInfo.name?<div className='fileInfo'>
            <h2>{fileInfo.name}</h2>
            <h2>{(fileInfo.size / 1000).toFixed(2)} kb</h2>
            <button className='upload-btn' form='fileUploadForm' type="submit">upload</button>
        </div>
        :<div className='welcome'>
        <h1>Welcome</h1>
        <p>Here you can upload jpeg, jpg, png and gif files. Also you can delete them with double click</p>
        <button className='removeAll-btn' onClick={removeAllFiles}>Delete all files</button>
        </div>}
        </>
    )
}

export default FileInfo
