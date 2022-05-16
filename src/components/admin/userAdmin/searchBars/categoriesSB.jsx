import { useState } from "react"
import { useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
import { getSingleCategory } from "../../../../redux/actions/categories"
import Banner from "../../Banner"

export default function CategoriesSB({categories,categoryName,category,setCategoryName,setCategory}){
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [isOpen,setIsOpen] = useState(false)
    
    function changeCategorie(e){
        setCategoryName(e.target.value)
    }

    function submitCategorie(e){
        e.preventDefault()
        var result = categories.filter((category)=>category.name === categoryName.toLowerCase())
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
            dispatch( getSingleCategory(category[0].name))
            navigate(`/admin/categoryAdmin/${category[0].name}`,{replace:true})
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
                <button name= "cancel" onClick={cancelAction}>Cancel</button>
                <Banner setIsOpen={setIsOpen} isOpen={isOpen}>
                    <h2>Are you sure you want to edit "{category[0].name}"?</h2>
                    <button name="edit" onClick={confirmEdit}>Edit</button>
                </Banner>
            </div>: <></>}
            {category && typeof(category) === "string" ? <p>Category not found</p>:<></>}
        </div>
</>)
}