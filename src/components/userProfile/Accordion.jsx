import React, { useState } from "react";
import useCollapse from 'react-collapsed'
import style from './Accordion.module.css'

export default function Accordion({children,warning,title,content}){
    const [isExpanded, setIsExpanded]= useState(false)
    const { getCollapseProps, getToggleProps} = useCollapse();

    function onClick(){
        setIsExpanded(!isExpanded)
    }
    return(
        <div className={style.section} >
            <div className= {style.header} {...getToggleProps({onClick:onClick})}>
                <h4>{title}</h4>
                <p>{content}</p>
                {warning? <p className={style.warning}><i>{warning}</i></p>: <></>}
                
            </div>
            <div {...getCollapseProps()}>
                <div className={style.content}>
                    {children}
                </div>
            </div>
        </div>
    )
}