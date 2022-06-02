import React from "react";
import styles from "./Modal.module.css"

export default function Modal({children, isOpen,setIsOpen,resetData,resetFile}){

    function handleClick(e){
        e.stopPropagation()
    }

    function handleClose(e){
        e.preventDefault()
        if(resetData){
            setIsOpen(false)
            resetData({})
            resetFile(e) 
        }
        setIsOpen(false)
    }

    return(
        <div className={`${styles.modal} ${isOpen && styles.show}`} onClick={()=> setIsOpen(state =>!state)}>
            <div className={styles.basicmodal} id={styles.form} onClick={handleClick}>
                <div>
                <button onClick={handleClose} className={styles.modalButton}>X</button>
                </div>
                {children}
            </div>
        </div>
    )
}