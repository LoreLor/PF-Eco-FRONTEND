import React,{useEffect, useState} from "react"
import categoryValidations from './validators/categoryValidation'
import {useDispatch, useSelector} from 'react-redux'
import { Link, useNavigate,useParams } from "react-router-dom"
import {getCategories} from "../../../redux/actions/categories"
import style from './CategoryAdmin.module.css'
import Banner from '../Banner'
import { getAllProducts } from "../../../redux/actions/products"

export default function CategoryForm(){
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const {name} =useParams()

    const categoriesDb = useSelector((state)=>state.products.categoriesDb)
    const categoryEdit = useSelector((state)=>state.products.editCategory)
    
    const [keyword,setKeyword] = useState("")
    const [isOpen,setIsOpen] =useState(false)

    const [errors,setErrors]=useState({})
    const [input,setInput] = useState({
        name: "",
    })
    
    function handleReturn(i){
        dispatch(getCategories)
        dispatch(getAllProducts)
    }
    function handleInputChange(i){  
        setErrors(categoryValidations({...input,[i.target.name]:i.target.value},categoriesDb))
        setInput({...input,[i.target.name]:i.target.value})            
    }
    

    async function handleSubmit(event){
        event.preventDefault()
        const data = {
        name: input.name.toLocaleLowerCase() || "",
        }
        setErrors(categoryValidations(data,categoriesDb))
        if(Object.keys(errors).length === 0
        && input.name !== ""
        ){
        let response = null
            try {
            name?
                (response = await fetch(`http://localhost:3001/categories/${categoryEdit.id}`,
                {method:"PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data)
                })):
                (response = await fetch('http://localhost:3001/categories',
                {method:"POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data)
                }))
        const result = await response.json()

        setKeyword(result.msg)
        
        if(!isOpen && result){
            setIsOpen(state => !state);
        if(result.msg === "Category created"){
            dispatch(getCategories())
            setInput({
                name:""
            })
            }else if(result.msg === "Category updated"){
            dispatch(getCategories())
            setInput({
                name:""
            })               
            }
        } 
            } catch (error) {
                console.log(error)
            }
        }
    }

    useEffect(()=>{
        if(name && categoryEdit){
            setInput({
                name: categoryEdit.name
            })
        }
    },[name,categoryEdit])

    return (
        <div className={style.container}>
                <form onSubmit={handleSubmit} className={style.containerForm}>
                    <div className={style.categoryForm}>
                        <div>
                            <h3>Add or Edit</h3>
                            <p>Name:</p>
                            <input className={errors.name && style.danger} type='text' placeholder="Add a name..." name='name' value={input.name} onChange={handleInputChange}/>
                        </div>
                        {
                            errors.name && (<p className={style.danger}>{errors.name}</p>)
                        }
                    </div>
                    <div className={style.btnContainer}>
                        <div>
                            {
                                Object.keys(errors).length === 0 && Object.keys(input).length > 0 && 
                                <input type='submit' value= {name? "Edit" : "Add"} onClick={handleSubmit}/>   
                            }   
                        </div>
                        <div>
                            <Link to="/admin">
                                <button onClick={handleReturn} >Go Back</button>
                            </Link>
                        </div>
                    </div>
                </form>
                <Banner isOpen={isOpen} setIsOpen={setIsOpen}>
                    {keyword.length ? (
                        <>
                        <h2>{keyword}</h2>
                        {keyword === "Category created" || "Category updated" ? (
                            <>
                            <button onClick={()=> navigate("/admin",{replace:true})}> 
                                Go to Admin
                            </button>
                            </>
                        ): (
                            <>
                            {keyword}
                            <button onClick={()=> setIsOpen(state=>!state)}>Ok</button>
                            </>
                        )}
                        </>
                    ):(
                        <h2>Invalid Data</h2>
                    )}
                </Banner>
            </div>
    )
}