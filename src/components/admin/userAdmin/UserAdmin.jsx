import { Link } from "react-router-dom"
import { useDispatch } from "react-redux"
import { getCategories } from "../../../redux/actions/categories"
import { getAllProducts } from "../../../redux/actions/products"

export default function UserAdmin(){
    const dispatch = useDispatch()
    function handleReturn(i){
        dispatch(getCategories)
        dispatch(getAllProducts)
    }
   
    return(
        <>
        <span>User</span>
        <div>
        <Link to="/admin">
            <button onClick={handleReturn}className='returnButton'> 
                            Volver
                        </button>
            </Link>
            </div>
        </>
        
    )
}