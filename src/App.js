
import React, {useEffect, useRef,useState} from 'react'
import './App.css';
import Modal from './Modal';
import Gallery from './Gallery';
import FileInfo from './FileInfo';

function App() {

  const [filePaths,setfilePaths] = useState([])
  const [modalDesc, setModalDesc] = useState("")
  const [fileInfo,setFileInfo] = useState({})
  const inputRef = useRef()

  useEffect(()=>{
    getAllFiles()
  },[])


  function getAllFiles(){

    fetch("http://localhost:8080/files")
    .then(response => response.json())
    .then(data =>{
      if(data.error){
        setModalDesc(data.error)
        return
      }
      setfilePaths(data.filePaths)
    })
    .catch(err => setModalDesc(err))

  }



  function addImage(data){

    if(data.image){
      setfilePaths([...filePaths,data.image])
    }
    setModalDesc(data.modalDesc)

  }



  function fileHandler(e){

    if(e.target.files.length > 0){
      const {name,size} = e.target.files[0]
      setFileInfo({name,size})
    }

  }

  function removeAllFiles(){

    if(filePaths.length === 0){
      setModalDesc("Your gallery is already empty")
      return
    }
  
    fetch("http://localhost:8080/files",{
      method: "DELETE"
    })
    .then(response => response.json())
    .then(data => {
      if(data.error){
        console.log(data.error)
        setModalDesc(data.error)
        return
      }

      console.log(data.desc)
      setModalDesc(data.desc)
      setfilePaths([])
    })
    .catch(err => setModalDesc(err))

    
  }



  function removeImage(e){


    const path = e.target.src.split("/").at(-1)

    fetch(`http://localhost:8080/files/${path}`,{
      method: "DELETE"
    })
    .then(response => response.json())
    .then(data=> {
      if(data.error){
        setModalDesc(data.error)
        return
      }
      setModalDesc(data.desc)
      setfilePaths(filePaths.filter(photo=> photo !== "images/" + path))
    })
    .catch(err=> setModalDesc(err))

  
    


  }
  
  

  function uploadHandler(e){

    e.preventDefault()
    const data = new FormData()
    data.append("singleFile",inputRef.current.files[0])

  
   fetch("http://localhost:8080/upload",{
     method: "POST",
     body: data
   })
   .then(response => response.json())
   .then(data => {
     if(data.error){
       setModalDesc(data.error)
       return
     }
     addImage(data)
     setFileInfo({})
    })
   .catch(err => console.log(err))

   

  }
  

  return (
    <div className="App">
      {modalDesc?<Modal modalDesc={modalDesc} setModalDesc={setModalDesc}/>:""}
     <FileInfo fileInfo={fileInfo} removeAllFiles={removeAllFiles}/>
     <Gallery fileHandler={fileHandler} uploadHandler={uploadHandler} filePaths={filePaths} removeImage={removeImage} ref={inputRef}/>
    </div>
  );

  }
export default App;
