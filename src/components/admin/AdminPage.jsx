import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import {Link} from 'react-router-dom'
import { getCategories } from '../../redux/actions/categories'
import { getAllProducts } from '../../redux/actions/products'

export default function AdminPage (){
    const dispatch = useDispatch()
    useEffect(()=>{
        dispatch(getCategories())
        dispatch(getAllProducts())
    },[dispatch])

    function handleReturn(i){
        dispatch(getCategories)
        dispatch(getAllProducts)
    }
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
            <Link to="/">
            <button onClick={handleReturn}className='returnButton'> 
                            Volver
                        </button>
            </Link>
        </div>
    )
}