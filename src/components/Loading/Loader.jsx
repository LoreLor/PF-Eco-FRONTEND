import React from "react";

import style from './Loader.module.css'

export default function Loader () {
    return(
        <div className={style.container}>
            <div className={style.loader}></div>
        </div>
    )
}