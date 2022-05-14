import axios from "axios"
import React,{useState} from "react"
import {useDispatch, useSelector} from 'react-redux'
import { useNavigate,Link } from "react-router-dom"
import { getProductByName,getAllProducts} from "../../../redux/actions/products"
import { getCategories } from "../../../redux/actions/categories"
import style from './ProductAdmin.module.css'
import Banner from '../Banner'
import activeValidators from './validators/activeValidators'
import submitValidators from './validators/submitValidators'


export default function ProTest (){
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const categoriesDb = useSelector((state)=>state.products.categoriesDb)
    const productsDb = useSelector((state)=>state.products.products)
   
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
   
    console.log(input)
    console.log(file)
    console.log(errors)

    function onValueChange (e){
        setErrors(activeValidators({...input,[e.target.name]:e.target.value},productsDb))
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
        console.log(e)
        setFile(e)
    }
    async function onSubmit (event){
        event.preventDefault()
        //input.stock = parseInt(input.stock)
        setErrors(activeValidators(input,productsDb))
        setErrors(submitValidators(input))
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
                response = await axios.post("http://localhost:3001/test",data)
                const result = response.data
                setKeyword(result.msg)
                
                if(!isOpen && result){
                    setIsOpen(state => !state);
                if(result.msg === "Producto creado exitosamente"){
                    dispatch(getProductByName(result.name))
                    dispatch(getAllProducts)
                    dispatch(getCategories)
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
    return(
        <div className='productForm'>
            <div className="formularyProduct">
        <form>
        <div>
            <span>Nombre</span>
            <input className={errors?.name? style.danger : style.input} type='text' placeholder="Nombre del producto..."
            name='name' value={input.name} onChange={onValueChange}/>
            {errors.name && (<p className={style.danger}>{errors.name}</p>)}
            </div>
            <div>
            <span>Precio</span>
                <input className={errors?.price? style.danger : style.input} type='text' placeholder="Precio del producto..."
                name='price' value={input.price} onChange={onValueChange}/>
                {errors.price && (<p className={style.danger}>{errors.price}</p>)}               
            </div>
            <div>
            <span>Descripction</span>
                <input className={errors?.description? style.danger : style.input} type='text' placeholder="Descripción del producto..."
                name='description' value={input.description} onChange={onValueChange}/>
                {errors.description && (<p className={style.danger}>{errors.description}</p>)}              
            </div>
            <div>
            <span>Stock</span>
                <input className={errors?.stock? style.danger : style.input} type='text' placeholder="Unidades en inventario..."
                name='stock' value={input.stock} onChange={onValueChange}/>
                {errors.stock && (<p className={style.danger}>{errors.stock}</p>)}              
            </div>
            <div>
                <span>Categorias:</span>
                {categoriesDb.length ?
                <select className={style.select} name ='categories'
                onChange={onArrayChange} multiple={true} 
                size={categoriesDb && categoriesDb.length < 10 ? categoriesDb.length : 10}>

                {categoriesDb && categoriesDb.map((category)=>{return(
                    <option key={category.id} 
                            value={category.name}
                            className={style.categories}>
                    {category.name}</option>
                )})}
                </select>:<span> Aun no se han creado categorias</span>}
                {errors?.categories && <p className={style.danger}>{errors?.categories}</p>}
            </div>
            <div>
                {input.categories && input.categories.map((category)=>{
                    return(
                        <button key={category} name="categories" value={category} onClick={onRemove}>{category}</button>
                    )
                })}
            </div>

            <div>
            <span>Imagenes:</span>
            <input className="inputs" accept="image/png,image/jpg,image/jpeg" multiple={true} type='file' 
            name="file"  onChange={(e)=>onFileChange(e.target.files)}/>
            </div>

            <div>
                {Object.keys(errors).length === 0 && Object.keys(input).length > 0 && 
                <input type='submit' value= "Add Product" className='finalButton'onClick={onSubmit}/>   
            }
            </div>
        </form>
        <div>
            <Link to="/admin">
            <button onClick={onReturn}className='returnButton'> 
                            Volver
                        </button>
            </Link>
        </div>
        <Banner isOpen={isOpen} setIsOpen={setIsOpen}>
                {keyword.length ? (
                    <>
                    <h2>{keyword}</h2>
                    {keyword === "Producto creado exitosamente" ? (
                        <button onClick={()=> navigate("/admin",{replace:true})}className='bannerUpdate'> 
                            Go to Admin
                        </button>
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
        </div>
    )
}