import style from './AdminPage.module.css'
import NavBarAdmin from './navBarAdmin/NavBarAdmin'
import Footer from '../../Footer/Footer'
import { Link } from 'react-router-dom'

export default function AdminPage (){

    return(
        <div className={style.admin_container}>
            <NavBarAdmin/>
            <div className={style.adminPage}>

                <div className={style.box}>
                    <h2>Users</h2>
                    <p><i>Search for a user, change permissions or deactivate an account</i></p> 
                    <Link to="/admin/users">
                    <button className={style.btnAdmin}>Manage users</button>
                    </Link>
                </div>

                <div className={style.box}>
                    <h2>Categories</h2>
                    <p><i>Search for a category, edit it or delete it</i></p> 
                    <Link to="/admin/categories">
                    <button className={style.btnAdmin}>Manage categories</button>
                    </Link>
                </div>

                <div className={style.box}>
                    <h2>Products</h2>
                    <p><i>Search for a product, edit it or delete it</i></p> 
                    <Link to="/admin/products">
                    <button className={style.btnAdmin}>Manage products</button>
                    </Link>
                </div>

            </div>
            <Footer/>
        </div>
    )
}