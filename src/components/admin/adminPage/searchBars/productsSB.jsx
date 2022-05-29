import { useState } from "react"
import AlertModal from '../../AdminModals/AlertModal'
import axios from "axios"
import style from './searchBars.module.css'
import SERVER from "../../../../server"

export default function ProductsSB({products,productName,product,setProductName,setProduct,setModalC}){

    const [isOpen,setIsOpen] = useState(false)
    const [search,setSearch] =useState("")
    
    function changeProduct(e){
        e.preventDefault()
        setProductName(e.target.value)
    }

    function submitProduct(e){
        e.preventDefault()
        var result = products.filter((product)=>product.name.toLowerCase() === productName.toLowerCase())
        setSearch(result?.length ? result : "Not found")
        setProductName("")
    }

    function handleProduct(e){
        if(e.target.name === "edit"){
            setIsOpen(state => !state);
        }
    }
    function cancelAction(e){
        e.preventDefault()
        setSearch("")
    }
   
    async function confirmEdit(e){
        if(e.target.name ==="edit"){
            const response = await axios.get(`${SERVER}/products/${search[0].id}`)
            const result = await response.data
            if(result.id === search[0].id ){
                setProduct(result)
                setIsOpen(false)
                setModalC(true)
            }
        }
    }

    return (
        <>
            <form onSubmit={submitProduct} className={style.searchForm}>
                <input type="search" value={productName} onChange={changeProduct} placeholder="Search by name..." className={style.inputAdmin}/>
                <button type='submit' onClick={submitProduct} className={style.btnAdmin}>Search</button>
            </form>

            <div>
                {search && Array.isArray(search)? <div className={style.showedOptions}>
                    <span>{search[0].name}</span>
                    <button name="edit" onClick={handleProduct} className={style.btnAdmin}>Edit</button>
                    <button name= "cancel" onClick={cancelAction} className={style.btnCancel}>X</button>
                    <AlertModal setIsOpen={setIsOpen} isOpen={isOpen}>
                        <h2>Are you sure you want to edit "{search[0].name}"?</h2>
                        <button name="edit" onClick={confirmEdit} className={style.btnAdmin}>Edit</button>
                    </AlertModal>
                </div>: <></>}
                {product && typeof(product) === "string" ? <p>Product not found</p>:<></>}
            </div>
        </>
    )
}