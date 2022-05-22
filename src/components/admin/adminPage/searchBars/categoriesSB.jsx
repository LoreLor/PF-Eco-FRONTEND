import { useState } from "react"

import AlertModal from '../../AdminModals/AlertModal'
import axios from "axios"
import style from './searchBars.module.css'
import SERVER from "../../../../server"

export default function CategoriesSB({categories,categoryName,category,setCategoryName,setCategory,setModalB}){

    const [isOpen,setIsOpen] = useState(false)
    const [search,setSearch] =useState("")
    
    function changeCategorie(e){
        e.preventDefault()
        setCategoryName(e.target.value)
    }

    function submitCategorie(e){
        e.preventDefault()
        var result = categories.filter((category)=>category.name.toLowerCase() === categoryName.toLowerCase())
        setSearch(result?.length ? result : "Not found")
        setCategoryName("")
    }

    function editCategorie(e){
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
            const response = await axios.get(`${SERVER}/categories/${search[0].name}`)
            const result = await response.data
            if(result.id === search[0].id ){
                setCategory(result)
            setIsOpen(false)
            setModalB(true)
            }
        }
    }
    return (
        <>
            <form onSubmit={submitCategorie} className={style.searchForm}>
                <input type="search" value={categoryName} onChange={changeCategorie} placeholder="Search by name..." className={style.inputAdmin}/>
                <button type='submit' onClick={submitCategorie}  className={style.btnAdmin}>Search</button>
            </form>

            <div className={style.subBox}>
                {search && Array.isArray(search)? 
                            <div className={style.showedOptions}>
                                <span>{search[0].name}</span>
                                <button name="edit" onClick={editCategorie} className={style.btnAdmin}>Edit</button>
                                <button name= "cancel" onClick={cancelAction} className={style.btnCancel}>X</button>
                                <AlertModal setIsOpen={setIsOpen} isOpen={isOpen}>
                                    <h2>Are you sure you want to edit "{search[0].name}"?</h2>
                                    <button name="edit" onClick={confirmEdit}>Edit</button>
                                </AlertModal>
                            </div>: <></>
                }
                {search && typeof(search) === "string" ? <p>Category not found</p>:<></>}
            </div>
        </>
    )
}