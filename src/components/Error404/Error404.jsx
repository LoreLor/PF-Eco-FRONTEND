import React from 'react'
import { Link } from 'react-router-dom';

import style from './Error404.module.css'

function Error404 () {
        return (
                <div className={style.container}>
                    <h1>404 NOT FOUND</h1>
                    <Link to="/">
                        <button className={style.btn_land}>Home</button>
                    </Link>
                </div>
        )
}
export default Error404;