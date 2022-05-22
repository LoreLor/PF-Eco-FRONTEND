import axios from "axios"
import React,{useEffect,useState} from "react"
import {useDispatch, useSelector} from 'react-redux'
import { getAllProducts} from "../../../redux/actions/products"
import { getCategories } from "../../../redux/actions/categories"
import style from './ProductAdmin.module.css'
import FlashModal from '../AdminModals/FlashModal'
import activeValidators from './validators/activeValidations'
import submitValidators from './validators/submitValidations'


export default function ProductForm ({product,setModalC,setProduct}){
    const dispatch = useDispatch()
    
    const categoriesDb = useSelector((state)=>state.products.categoriesDb)
    const productsDb = useSelector((state)=>state.products.products)
    //const productEdit = useSelector((state)=>state.products.editProduct)

    const [keyword,setKeyword] = useState("")
    const [isOpen,setIsOpen] =useState(false)
    
    const [errors,setErrors]=useState({})
    const [input,setInput] = useState({
        name: "",
        price: "",
        description:"",
        stock:"",
        categories: [],
        img: [],
        isActive: ""
    })
    const [file,setFile] = useState([])
    
    function onValueChange (e){
        setErrors(activeValidators(product,{...input,[e.target.name]:e.target.value},productsDb))
        setInput({...input,[e.target.name]:e.target.value}) 
    }

    function onArrayChange(e){
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

    function onClose(e){
        e.preventDefault()
        setIsOpen(false)
        setModalC(false)
        setProduct("")
    }

    function onStatus(e){
        e.preventDefault()
        if(e.target.name === "isActive"){
            if(e.target.value === "true"){
                return(setInput({
                    ...input,
                    [e.target.name]: false
                }))
            }
            if(e.target.value === "false"){
                return(setInput({
                    ...input,
                    [e.target.name]: true
                }))
            }
        }
    }
    function onFileChange(e){
        setFile(e)
    }
    async function onSubmit (event){
        event.preventDefault()
        /* setErrors(activeValidators(product,input,productsDb)) */
        setErrors(submitValidators(product,input,productsDb))
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

                product? (response = await axios.put(`http://localhost:3001/products/${product.id}`,data))
                :(response = await axios.post("http://localhost:3001/products",data))
                const result = response.data
                setKeyword(result.msg)
                
                if(!isOpen && result){
                    setIsOpen(true);
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
                isActive: ""
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
                isActive:""
                    })
                    setFile([])
                }
                }
            } catch (error) {
                console.log(error)
            }
        }
  }

useEffect(()=>{
    if(!product){
        setInput({
        name: "",
        price: "",
        description:"",
        stock:"",
        categories: [],
        img: [],
        isActive: ""
        })
    }
    if(product /* && productEdit */){
        setInput({
        name: product.name,
        price: product.price.toString(),
        description: product.description,
        stock: product.stock.toString(),
        img: product.img,
        categories: product.categories.map(c=>c.name),
        isActive: product.isActive
        })
    }
},[product])

    return(
        <div className={style.containerProd}>
                <form onSubmit={onSubmit}>
                    
                        <h3>Add or edit</h3>
                <div className="sectionA">
                    
                        <p>Product name:</p>
                        <input className={errors?.name? style.inputError : style.input} type='text' placeholder="Product name..." name='name' value={input.name} onChange={onValueChange}/>
                        {
                            errors.name && (<p className={style.errors}>{errors.name}</p>)
                        }
                
                    
                        <p>Price:</p>
                        <input className={errors?.price? style.inputError : style.input} type='text' placeholder="Product price..." name='price' value={input.price} onChange={onValueChange}/>
                        {
                            errors.price && (<p className={style.errors}>{errors.price}</p>)
                        }               
                    
                </div>
                    <div>
                        <p>Description:</p>
                        <textarea rows={5} cols={70} className={errors?.description? style.inputError : style.input} type='text' placeholder="Add more info..." name='description' value={input.description} onChange={onValueChange}/>
                        {
                            errors.description && (<p className={style.errors}>{errors.description}</p>)
                        }              
                    </div>
                    <div>
                        <p>Stock:</p>
                        <input className={errors?.stock? style.inputError : style.input} type='text' placeholder="Add a stock..." name='stock' value={input.stock} onChange={onValueChange}/>
                        {
                            errors.stock && (<p className={style.errors}>{errors.stock}</p>)
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
                        {errors?.categories && <p className={style.errors}>{errors?.categories}</p>}
                    </div>
                    <div>
                        {input.categories && input.categories.map((category)=>{
                            return(
                                <button key={category} name="categories" value={category} onClick={onRemove} className={style.btn}>{category}</button>
                            )
                        })}
                    </div>
                        {product?<>
                        <span>This product is: {input.isActive === true ? "Active": "Inactive"} </span>
                        <button name ="isActive" value={input.isActive} onClick={onStatus}>Change</button>
                        {errors?.isActive && <p className={style.errors}>{errors?.isActive}</p>}
                        </>:<></>}
                    
                    <div>
                        <p>Images:</p>
                        <input accept="image/png,image/jpg,image/jpeg" multiple={true} type='file' name="file"  onChange={(e)=>onFileChange(e.target.files)}/>
                    </div>
                    <div>
                        {Object.keys(errors).length === 0 && Object.keys(input).length > 0 && 
                        <input type='submit' value= {product? "Edit": "Add"} onClick={onSubmit}/>   
                        }
                    </div>

                </form>
        <FlashModal isOpen={isOpen} setIsOpen={setIsOpen}>
                {keyword.length ? (
                    <>
                    <h2>{keyword}</h2>
                    {keyword === "Product created" || "Product edited" ? (
                        <>
                            <button onClick={onClose}> 
                                Close All
                            </button>
                        </>
                        ): (
                            <>
                            {keyword}
                            <button onClick={()=> setIsOpen(state=>!state)}>Try Again</button>
                            </>
                        )}
                        </>
                    ):(
                        <h2>Invalid Data</h2>
                    )}
                </FlashModal>
        </div>
    )
}