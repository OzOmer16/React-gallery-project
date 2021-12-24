import React from 'react'
import {createPortal} from 'react-dom'
import './Modal.css'
function Modal({setModalDesc,modalDesc}) {

    function closeModal(){
        setModalDesc("")
    }

    function render(){
            return(
            <div className="modal-container">
                <div className='modal-wrapper'>
                <button onClick={closeModal} className='close-modal'>X</button>
                {modalDesc}
                </div>
           </div>)
    }
    return createPortal(render(),document.getElementById("modal"))
      
    
}

export default Modal
