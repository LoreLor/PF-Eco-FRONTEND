import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import {Link} from 'react-router-dom'
import { getCategories } from '../../redux/actions/categories'

export default function AdminPage (){
    const dispatch = useDispatch()
    useEffect(()=>{
        dispatch(getCategories())
    })
    return(
        <div>
            <div>Administración</div>
            <div>
                <span>Usuarios</span>
                <Link to='/userAdmin'>
                    <p>Autorizar Usuario</p>
                </Link>
            </div>
            <div>
                <span>Categorias</span>
                <Link to='/categoryAdmin'>
                    <p>Crear Categoria</p>
                </Link>
            </div>
            <div>
                <span>Productos</span>
                <Link to='/productAdmin'>
                    <p>Crear Producto</p>
                </Link>
            </div>
        </div>
    )
}