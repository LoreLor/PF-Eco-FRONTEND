import React from "react";
import styles from "./Banner.module.css"
export default function CategoryBanner({children, isOpen,setIsOpen}){
    //test
    function handleClick(e){
        e.stopPropagation()
    }
    return(
        <div className={`${styles.banner} ${isOpen && styles.show}`} onClick={()=> setIsOpen(state =>!state)}>
            <div className={styles["modal-content"]} onClick={handleClick}>
                <button onClick={()=>setIsOpen(state=>!state)} className={styles.bannerButton}>X</button>
            
            <button className={styles.reload}>
                {children}
            </button>
            </div>
        </div>
    )
}