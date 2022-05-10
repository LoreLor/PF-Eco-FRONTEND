import React,{useState} from "react"
import categoryValidations from '../utils/categoryValidation'
import {useDispatch, useSelector} from 'react-redux'
import { useNavigate } from "react-router-dom"
import { addCategoriesCheck,getCategories } from "../../redux/actions/categories"
import style from './CategoryAdmin.module.css'
import Banner from './CategoryBanner'

export default function Form(){
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const categoriesDb = useSelector((state)=>state.products.categoriesDb)
    console.log(categoriesDb)
    const [keyword,setKeyword] = useState("")
    const [isOpen,setIsOpen] =useState(false)
    
    const [errors,setErrors]=useState({})
    const [input,setInput] = useState({
        name: "",
    })
    console.log(input)
    console.log(errors)

    function handleInputChange(i){  
        setErrors(categoryValidations({...input,[i.target.name]:i.target.value},categoriesDb))
        setInput({...input,[i.target.name]:i.target.value})            
    }
    

    async function handleSubmit(event){
        event.preventDefault()
        const data = {
        name: input.name.toLocaleLowerCase() || "",
        }
        console.log(data)
        setErrors(categoryValidations(data,categoriesDb))
        if(Object.keys(errors).length === 0
        && input.name !== ""
        ){
        let response = null

        response = await fetch('http://localhost:3001/categories',
                {method:"POST",
                headers: {
                    "Content-Type": "application/json",
                },
            body: JSON.stringify(data)
            })
        const result = await response.json()
        console.log(result)
        setKeyword(result.msg)
        if(!isOpen && result){
            setIsOpen(state => !state);
        if(result.msg === "Category added successfully"){
            dispatch(addCategoriesCheck(result.name))
            dispatch(getCategories())
            setInput({
                name:""
            })
            }
        }
        }
    }

    return (
        <div className='formPage'>
            <div className="formularyPage">

            <form className='addForm' onSubmit={handleSubmit}>
            <div>
                <h3>Añadir o Editar:</h3>
                <input className={errors.name && style.danger} type='text' placeholder="Nombre de la categoria..."
                name='name' value={input.name} onChange={handleInputChange}/>
                {errors.name && (<p className={style.danger}>{errors.name}</p>)}
            </div>
            <div>
                {Object.keys(errors).length === 0 && Object.keys(input).length > 0 && 
                <input type='submit' value= "Add Category" className='finalButton'onClick={handleSubmit}/>   
            }
            </div>
            </form>
            <Banner isOpen={isOpen} setIsOpen={setIsOpen}>
                {keyword.length ? (
                    <>
                    <h2>{keyword}</h2>
                    {keyword === "Category added successfully" ? (
                        <button onClick={()=> navigate("/admin",{replace:true})}className='bannerUpdate'> 
                            Go to Admin
                        </button>
                    ): (
                        <button onClick={()=> setIsOpen(state=>!state)}>Ok</button>
                    )}
                    </>
                ):(
                    <h2>Invalid Data</h2>
                )}
            </Banner>
            </div>
        </div>
    )
}