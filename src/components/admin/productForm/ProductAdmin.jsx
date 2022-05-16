import axios from "axios"
import React,{useEffect,useState} from "react"
import {useDispatch, useSelector} from 'react-redux'
import { useNavigate,Link, useParams } from "react-router-dom"
import { getAllProducts} from "../../../redux/actions/products"
import { getCategories } from "../../../redux/actions/categories"
import style from './ProductAdmin.module.css'
import Banner from '../Banner'
import activeValidators from './validators/activeValidators'
import submitValidators from './validators/submitValidators'


export default function ProductForm (){
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const {id} = useParams()

    const categoriesDb = useSelector((state)=>state.products.categoriesDb)
    const productsDb = useSelector((state)=>state.products.products)
    const productEdit = useSelector((state)=>state.products.editProduct)

    const [keyword,setKeyword] = useState("")
    const [isOpen,setIsOpen] =useState(false)

    const [errors,setErrors]=useState({})
    const [input,setInput] = useState({
        name: "",
        price: "",
        description:"",
        stock:"",
        categories: [],
        img: []
    })
    const [file,setFile] = useState([])

    function onValueChange (e){
        setErrors(activeValidators(id,{...input,[e.target.name]:e.target.value},productsDb))
        setInput({...input,[e.target.name]:e.target.value}) 
    }


    function onArrayChange(e){
       // setErrors(activeValidators({...input,categories: [...input.categories,e.target.value]}))
        if(!input.categories.includes(e.target.value) && input.categories.length < 3){
            return(
                    setInput({...input,categories:[...input.categories,e.target.value]
                    })
            )
        }
    }

    function onRemove(e){
        e.preventDefault()
        return(
            setInput({
            ...input,
            [e.target.name]: input[e.target.name].filter(item => item !== e.target.value)
        }))
    }

    function onFileChange(e){
        setFile(e)
    }
    async function onSubmit (event){
        event.preventDefault()
        setErrors(activeValidators(id,input,productsDb))
        setErrors(submitValidators(id,input,productsDb))
        if(Object.keys(errors).length === 0
        && input.name !== ""
        &&input.price !== ""
        && input.description !== ""
        && input.rating !== ""
        && input.stock !== ""
        //&& input.img !== ""
        && input.categories.length >0){
            let response = null
            try {
                const data = new FormData();
                data.append("input",JSON.stringify(input))
                for (let index = 0; index < file.length; index++) {
                    data.append("file", file[index]);
                }

                id? (response = await axios.put(`http://localhost:3001/products/${productEdit.id}`,data))
                :(response = await axios.post("http://localhost:3001/products",data))
                const result = response.data
                setKeyword(result.msg)
                
                if(!isOpen && result){
                    setIsOpen(state => !state);
                if(result.msg === "Product created"){
                    dispatch(getAllProducts())
                    dispatch(getCategories())
                    setInput({
                    name: "",
                price: "",
                description:"",
                stock:"",
                img: "",
                categories: [],
                    })
                    setFile([])
                }else if(result.msg === "Product edited"){
                    dispatch(getAllProducts())
                    dispatch(getCategories())
                    setInput({
                    name: "",
                price: "",
                description:"",
                stock:"",
                img: "",
                categories: [],
                    })
                    setFile([])
                }
                }
            } catch (error) {
                console.log(error)
            }
        }
  }

    function onReturn(){
        dispatch(getCategories)
        dispatch(getAllProducts)
}

useEffect(()=>{
    if(id && productEdit){
        setInput({
        name: productEdit.name,
        price: productEdit.price.toString(),
        description: productEdit.description,
        stock: productEdit.stock.toString(),
        img: productEdit.img,
        categories: productEdit.categories.map(c=>c.name),
        })
    }
},[id,productEdit])

    return(
        <div className={style.containerProd}>
                <form>
                    <div>
                        <h3>Add or edit</h3>
                        <p>Product name:</p>
                        <input className={errors?.name? style.danger : style.input} type='text' placeholder="Product name..." name='name' value={input.name} onChange={onValueChange}/>
                        {
                            errors.name && (<p className={style.danger}>{errors.name}</p>)
                        }
                    </div>
                    <div>
                        <p>Price:</p>
                        <input className={errors?.price? style.danger : style.input} type='text' placeholder="Product price..." name='price' value={input.price} onChange={onValueChange}/>
                        {
                            errors.price && (<p className={style.danger}>{errors.price}</p>)
                        }               
                    </div>
                    <div>
                        <p>Description:</p>
                        <textarea rows={5} cols={70} className={errors?.description? style.danger : style.input} type='text' placeholder="Add more info..." name='description' value={input.description} onChange={onValueChange}/>
                        {
                            errors.description && (<p className={style.danger}>{errors.description}</p>)
                        }              
                    </div>
                    <div>
                        <p>Stock:</p>
                        <input className={errors?.stock? style.danger : style.input} type='text' placeholder="Add a stock..." name='stock' value={input.stock} onChange={onValueChange}/>
                        {
                            errors.stock && (<p className={style.danger}>{errors.stock}</p>)
                        }              
                    </div>
                    <div>
                        <p>Categories:</p>
                        {
                            categoriesDb.length ?
                                <select className={style.select} name ='categories' onChange={onArrayChange} multiple={true} size={categoriesDb && categoriesDb.length < 10 ? categoriesDb.length : 10}>
                        {categoriesDb && categoriesDb.map((category)=>{return(
                        <option key={category.id} value={category.name} className={style.categories}>{category.name}</option>
                        )})}
                        </select>:<span> No categories yet</span>}
                        {errors?.categories && <p className={style.danger}>{errors?.categories}</p>}
                    </div>
                    <div>
                        {input.categories && input.categories.map((category)=>{
                            return(
                                <button key={category} name="categories" value={category} onClick={onRemove} className={style.btn}>{category}</button>
                            )
                        })}
                    </div>
                    <div>
                        <p>Images:</p>
                        <input accept="image/png,image/jpg,image/jpeg" multiple={true} type='file' name="file"  onChange={(e)=>onFileChange(e.target.files)}/>
                    </div>
                    <div>
                        {Object.keys(errors).length === 0 && Object.keys(input).length > 0 && 
                        <input type='submit' value= {id? "Edit": "Add"} onClick={onSubmit}/>   
                        }
                    </div>
                </form>
        <div>
            <Link to="/admin">
            <button onClick={onReturn}className='returnButton'> 
                            Go Back
                        </button>
            </Link>
        </div>
        <Banner isOpen={isOpen} setIsOpen={setIsOpen}>
                {keyword.length ? (
                    <>
                    <h2>{keyword}</h2>
                    {keyword === "Product created" || "Product edited" ? (
                        <>
                        <button onClick={()=> navigate("/admin",{replace:true})}className='bannerUpdate'> 
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