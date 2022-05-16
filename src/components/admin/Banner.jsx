import React from "react";
import styles from "./Banner.module.css"
export default function Banner({children, isOpen,setIsOpen}){
    function handleClick(e){
        e.stopPropagation()
    }

    return(
        <div className={`${styles.banner} ${isOpen && styles.show}`} onClick={()=> setIsOpen(state =>!state)}>
            <div className={styles["modal-content"]} onClick={handleClick}>
                <div>
                <button onClick={()=>setIsOpen(state=>!state)} className={styles.bannerButton}>X</button>
                </div>
            <button className={styles.reload}>
                {children}
            </button>
            
            </div>
        </div>
    )
}