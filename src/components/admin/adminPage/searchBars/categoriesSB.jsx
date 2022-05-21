import { useState } from "react"
import { useDispatch } from "react-redux"
import AlertModal from '../../AdminModals/AlertModal'
import { getSingleCategory } from "../../../../redux/actions/categories"


export default function CategoriesSB({categories,categoryName,category,setCategoryName,setCategory,setModalB}){
    const dispatch = useDispatch()
    const [isOpen,setIsOpen] = useState(false)
    
    function changeCategorie(e){
        e.preventDefault()
        setCategoryName(e.target.value)
    }

    function submitCategorie(e){
        e.preventDefault()
        var result = categories.filter((category)=>category.name.toLowerCase() === categoryName.toLowerCase())
        setCategory(result?.length ? result : "Not found")
        setCategoryName("")
    }

    function editCategorie(e){
        if(e.target.name === "edit"){
            setIsOpen(state => !state);
        }
    }
    function cancelAction(e){
        e.preventDefault()
        setCategory("")
    }

    function confirmEdit(e){
        if(e.target.name ==="edit"){
            setIsOpen(false)
            setModalB(true)
            dispatch( getSingleCategory(category[0].name))
        }
    }
return (<>
<span>Edit category</span>
                <form onSubmit={submitCategorie}>
                    <input type="search" value={categoryName} onChange={changeCategorie} placeholder="Search by name..."/>
                    <button type='submit' onClick={submitCategorie}>Search</button>
                </form>

        <div>
            {category && Array.isArray(category)? <div>
                <span>{category[0].name}</span>
                <button name="edit" onClick={editCategorie}>Edit</button>
                <button name= "cancel" onClick={cancelAction}>X</button>
                <AlertModal setIsOpen={setIsOpen} isOpen={isOpen}>
                    <h2>Are you sure you want to edit "{category[0].name}"?</h2>
                    <button name="edit" onClick={confirmEdit}>Edit</button>
                </AlertModal>
            </div>: <></>}
            {category && typeof(category) === "string" ? <p>Category not found</p>:<></>}
        </div>
</>)
}