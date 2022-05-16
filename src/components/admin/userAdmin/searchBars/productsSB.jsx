import { useState } from "react"
import { useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
import { getSingleCategory } from "../../../../redux/actions/categories"
import Banner from "../../Banner"

export default function CategoriesSB({products,productName,product,setProductName,setProduct}){
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [isOpen,setIsOpen] = useState(false)
    
    function changeCategorie(e){
        setProductName(e.target.value)
    }

    function submitCategorie(e){
        e.preventDefault()
        var result = products.filter((product)=>product.name === productName.toLowerCase())
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

    function confirmEdit(e){
        if(e.target.name ==="edit"){
            dispatch( getSingleCategory(product[0].name))
            navigate(`/admin/productAdmin/${product[0].name}`,{replace:true})
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
                <Banner setIsOpen={setIsOpen} isOpen={isOpen}>
                    <h2>Are you sure you want to edit "{product[0].name}"?</h2>
                    <button name="edit" onClick={confirmEdit}>Edit</button>
                </Banner>
            </div>: <></>}
            {product && typeof(category) === "string" ? <p>Product not found</p>:<></>}
        </div>
</>)
}