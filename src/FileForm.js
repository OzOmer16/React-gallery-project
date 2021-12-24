import React,{forwardRef} from 'react'
import './FileForm.css'

const FileForm = forwardRef(({uploadHandler,fileHandler},ref)=> {
    return (
      <form id='fileUploadForm' onSubmit={uploadHandler}>
        <label htmlFor='singleFile' className='custom-file-upload'>+</label>
        <input onChange={fileHandler} ref={ref} id='singleFile' name='singleFile' type="file"/>  
      </form> 
    )
}) 

export default FileForm
