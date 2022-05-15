import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {Link} from 'react-router-dom'
import { getCategories } from '../../redux/actions/categories'
import { getAllProducts } from '../../redux/actions/products'
import CategoriesSB from './userAdmin/searchBars/categoriesSB'

export default function AdminPage (){
    const categories = useSelector((state)=> state.products.categoriesDb)
    const dispatch = useDispatch()

    const [name,setName] = useState("")
    const [category,setCategory] = useState("")
    
    useEffect(()=>{
        dispatch(getCategories())
        dispatch(getAllProducts())
    },[dispatch])


    return(
        <div>
            <div>Administración</div>
            <div>
                <span>Usuarios</span>
                <Link to='/admin/userAdmin'>
                    <p>Autorizar Usuario</p>
                </Link>
            </div>
            <div>
                <h3>Categorias</h3>
                <span>Crear o editar una nueva categoria</span>
                <Link to='/admin/categoryAdmin/'>
                    <p>Crear categoria</p>
                </Link>
                <CategoriesSB categories={categories} name={name} 
                category={category} setName={setName} setCategory={setCategory}/>
            </div>
            <div>
                <span>Productos</span>
                <Link to='/admin/productAdmin'>
                    <p>Crear Producto</p>
                </Link>
            </div>
            <Link to="/">
                <p>Volver</p>
            </Link>
        </div>
    )
}