import React from "react";
import styles from "./Modal.module.css"

export default function Modal({children, isOpen,setIsOpen,resetError,resetFile,resetInput,product}){

    function handleClick(e){
        e.stopPropagation()
    }

    function handleClose(e){
        e.preventDefault()
        if(product){
            setIsOpen(false)
            resetError({})
            resetFile(e) 
        }else{
            setIsOpen(false)
            resetError({})
            resetFile(e) 
            resetInput({
                name: "",
                price: "",
                description:"",
                stock:"",
                categories: [],
                img: [],
                isActive: ""
            })
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