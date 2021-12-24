import React,{forwardRef}from 'react'
import './Gallery.css'
import FileForm from './FileForm';

const Gallery = forwardRef(({fileHandler,uploadHandler,filePaths,removeImage},ref)=> {
    return (
        <div className='gallery-container'>
            {filePaths.map((photo,index)=>{
            return(
                <div key={index} className='image-container'>
                    <img onDoubleClick={removeImage} src={`./${photo}`}/>
                </div>
            )
            })}
            
            <FileForm fileHandler={fileHandler} uploadHandler={uploadHandler} ref={ref}/>
        </div>
       
    )
}) 

export default Gallery
