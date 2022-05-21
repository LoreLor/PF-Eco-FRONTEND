import { useState } from "react"
import { useDispatch } from "react-redux"
import { editProduct} from "../../../../redux/actions/products"
import AlertModal from '../../AdminModals/AlertModal'
import axios from "axios"
import style from './searchBars.module.css'

export default function ProductsSB({products,productName,product,setProductName,setProduct,setModalC}){
    const dispatch = useDispatch()

    const [isOpen,setIsOpen] = useState(false)
    
    function changeCategorie(e){
        e.preventDefault()
        setProductName(e.target.value)
    }

    function submitProduct(e){
        e.preventDefault()
        var result = products.filter((product)=>product.name.toLowerCase() === productName.toLowerCase())
        setProduct(result?.length ? result : "Not found")
        setProductName("")
    }

    function handleProduct(e){
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
                setIsOpen(false)
                setModalC(true)
            }
        }
    }

    return (
        <>
            <form onSubmit={submitProduct} className={style.searchForm}>
                <input type="search" value={productName} onChange={changeCategorie} placeholder="Search by name..." className={style.inputAdmin}/>
                <button type='submit' onClick={submitProduct} className={style.btnAdmin}>Search</button>
            </form>

            <div>
                {product && Array.isArray(product)? <div>
                    <span>{product[0].name}</span>
                    <button name="edit" onClick={handleProduct}>Edit</button>
                    <button name= "cancel" onClick={cancelAction}>Cancel</button>
                    <AlertModal setIsOpen={setIsOpen} isOpen={isOpen}>
                        <h2>Are you sure you want to edit "{product[0].name}"?</h2>
                        <button name="edit" onClick={confirmEdit}>Edit</button>
                    </AlertModal>
                </div>: <></>}
                {product && typeof(product) === "string" ? <p>Product not found</p>:<></>}
            </div>
        </>
    )
}