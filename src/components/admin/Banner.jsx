import React from "react";
import styles from "./Banner.module.css"
export default function Banner({children, isOpen,setIsOpen, closePrev,resetData}){
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
        <div className={`${styles.banner} ${isOpen && styles.show}`} onClick={()=> setIsOpen(state =>!state)}>
            <div className={styles["modal-content"]} onClick={handleClick}>
                <div>
                <button onClick={handleClose} className={styles.bannerButton}>X</button>
                </div>
                {children}
            </div>
        </div>
    )
}