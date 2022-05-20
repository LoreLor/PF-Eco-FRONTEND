import React from "react";
import styles from "./Modal.module.css"
export default function Modal({children, isOpen,setIsOpen, closePrev,resetData}){
    function handleClick(e){
        e.stopPropagation()
    }

    function handleClose(e){
        e.preventDefault()
        if(closePrev && resetData){
            setIsOpen(false)
            closePrev(false)
            resetData("")  
        }
        setIsOpen(false)
    }

    return(
        <div className={`${styles.flash} ${isOpen && styles.show}`} onClick={()=> setIsOpen(state =>!state)}>
            <div className={styles.basicmodal} id={styles.alert} onClick={handleClick}>
                <div>
                <button onClick={handleClose} className={styles.modalButton}>X</button>
                </div>
                {children}
            </div>
        </div>
    )
}