import { useState } from "react"
import { useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
import { editProduct} from "../../../../redux/actions/products"
import AlertModal from '../../AdminModals/AlertModal'
import axios from "axios"

export default function CategoriesSB({products,productName,product,setProductName,setProduct}){
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [isOpen,setIsOpen] = useState(false)
    
    function changeCategorie(e){
        setProductName(e.target.value)
    }

    function submitCategorie(e){
        e.preventDefault()
        var result = products.filter((product)=>product.name.toLowerCase() === productName.toLowerCase())
        setProduct(result?.length ? result : "Not found")
        setProductName("")
    }

    function editCategorie(e){
        if(e.target.name === "edit"){
            setIsOpen(state => !state);
        }
    }
    function cancelAction(e){
        e.preventDefault()
        setProduct("")
    }
   
    async function confirmEdit(e){
        if(e.target.name ==="edit"){
            const response = await axios.get(`http://localhost:3001/products/${product[0].id}`)
            const result = response.data
            if(result.id === product[0].id ){
                dispatch(editProduct(result))
                navigate(`/admin/productAdmin/${product[0].id}`,{replace:false})
            }
            
        }
    }
return (<>
<span>Edit product</span>
                <form onSubmit={submitCategorie}>
                    <input type="search" value={productName} onChange={changeCategorie} placeholder="Search by name..."/>
                    <button type='submit' onClick={submitCategorie}>Search</button>
                </form>

        <div>
            {product && Array.isArray(product)? <div>
                <span>{product[0].name}</span>
                <button name="edit" onClick={editCategorie}>Edit</button>
                <button name= "cancel" onClick={cancelAction}>Cancel</button>
                <AlertModal setIsOpen={setIsOpen} isOpen={isOpen}>
                    <h2>Are you sure you want to edit "{product[0].name}"?</h2>
                    <button name="edit" onClick={confirmEdit}>Edit</button>
                </AlertModal>
            </div>: <></>}
            {product && typeof(product) === "string" ? <p>Product not found</p>:<></>}
        </div>
</>)
}