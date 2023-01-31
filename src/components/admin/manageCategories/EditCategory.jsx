import React,{useEffect, useState} from "react"
import activeValidations from "./validators/activeValidations"
import submitValidations from "./validators/submitValidations"
import {useDispatch} from 'react-redux'
import {getCategories} from "../../../redux/actions/categories"
import style from './EditCategory.module.css'
import axios from "axios"
import SERVER from "../../../server"
import { toast } from "react-toastify"

export default function CategoryForm({category,categories,setCategoryEdit}){
    const dispatch = useDispatch()
    
    const [errors,setErrors]=useState({})
    const [input,setInput] = useState({
        name: "",
    })
    
    function handleInputChange(i){  
        setErrors(activeValidations(category,{...input,[i.target.name]:i.target.value},categories))
        setInput({...input,[i.target.name]:i.target.value})            
    }
    
    async function handleSubmit(event){
        event.preventDefault()
        const data = {
        name: input.name || "",
        }
        setErrors(submitValidations(category,data,categories))
        if(Object.keys(errors).length === 0
        && input.name !== ""
        ){
        let response = null
            try {
            category?
                (response = await fetch(`${SERVER}/categories/${category.id}`,
                {method:"PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data)
                })):
                (response = await fetch(`${SERVER}/categories`,
                {method:"POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data)
                }))
        const result = await response.json()

        if(result){
        if(result.msg === "Category created"){
            toast.success(`${result.msg}`, {
                position: toast.POSITION.BOTTOM_RIGHT
            });
            dispatch(getCategories())
            setInput({
                name:""
            })
            setCategoryEdit([])
            }else if(result.msg === "Category updated"){
                toast.success(`${result.msg}`, {
                    position: toast.POSITION.BOTTOM_RIGHT
                });
            dispatch(getCategories())
            setInput({
                name:""
            }) 
            setCategoryEdit([])              
            }else{
                toast.error(`${result.msg}`, {
                    position: toast.POSITION.BOTTOM_RIGHT
                });
            }
        } 
            } catch (error) {
                console.log(error)
            }
        }
    }

    async function handleDelete(event){
        event.preventDefault()
        try {
        let response = null
        response = await axios.delete(`${SERVER}/categories/${category.id}`)
        const result = response.data
       
        if(result){
        if(result.msg === "Category deleted"){
            toast.success(`${result.msg}`, {
                position: toast.POSITION.BOTTOM_RIGHT
            });
            dispatch(getCategories())
            setInput({
                name:""
            })
            setCategoryEdit([])
        }else{
            toast.error(`${result.msg}`, {
                position: toast.POSITION.BOTTOM_RIGHT
            });
        }
        } 
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(()=>{
        if(!category){
            setInput({
                name: ""
            })
            setErrors({})
        }
        if(category && category.id){
            setInput({
                name: category.name
            })
            setErrors({})
        }
    },[category])

    return (
        <div className={style.container}>

{category && category.id ? 
           <button onClick={(e)=> setCategoryEdit([])} className={style.closeBtn}>X</button>:<></>}

                <form onSubmit={handleSubmit} className={style.containerForm}>
                    <div className={style.categoryForm}>
                        <div>
                            <h2>{category && category.id? "Edit":"Add"}</h2>
                            {category? 
                            <>
                            <p>Previus name: {category.name}</p>
                            <p>Linked products: {category.products ? category.products.length : 0}</p>
                            </>:<></>}
                            
                            <p>Name:</p>
                            <input className={errors?.name ? style.inputError:style.input} type='text' placeholder="Add a name..." name='name' value={input.name} onChange={handleInputChange}/>
                        </div>
                        {
                            errors.name && (<p className={style.errors}>{errors.name}</p>)
                        }
                    </div>
                    <div className={style.btnContainer}>
                        <div>
                            {
                                Object.keys(errors).length === 0 && Object.keys(input).length > 0 && 
                                <input type='submit' value= {category? "Save" : "Add"} onClick={handleSubmit} className={style.mybtn}/>   
                            }   
                        </div>
                    <div>
                        {Object.keys(errors).length === 0 && Object.keys(input).length > 0 && category ? <button onClick={handleDelete} className={style.mybtn2}>Delete</button> :<></>}
                    </div>
                    </div>
                </form>
            </div>
    )
}