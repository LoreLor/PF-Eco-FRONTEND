import React,{useState} from "react"
import productValidations from '../../utils/productValidation'
import {useDispatch, useSelector} from 'react-redux'
import { useNavigate,Link } from "react-router-dom"
import { getProductByName,getAllProducts} from "../../../redux/actions/products"
import { getCategories } from "../../../redux/actions/categories"
import style from './ProductAdmin.module.css'
import Banner from '../Banner'

export default function ProductAdmin(){
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
        img: "",
        categories: [],
    })

    function handleReturn(i){
        dispatch(getCategories)
        dispatch(getAllProducts)
    }

    function handleInputChange(i){  
       setErrors(productValidations({...input,[i.target.name]:i.target.value},productsDb))
        setInput({...input,[i.target.name]:i.target.value})            
    }
    
    function handleArrayChange(i){
        if(!input.categories.includes(i.target.value)){
            return(
                    setInput({
                        ...input,
                        [i.target.name]:[...input.categories,i.target.value]
                    })
            )
        }
    }

    function handleRemove(e){
        e.preventDefault()
        return(
            setInput({
            ...input,
            [e.target.name]: input[e.target.name].filter(item => item !== e.target.value)
        }))
    }

    async function handleSubmit(event){
        event.preventDefault()
        const data = {
            name: input.name.toLowerCase() || "",
            price: input.price || "",
            description: input.description || "",
            rating: 0,
            stock: parseInt(input.stock) || "",
            img: input.img || "",
            categories: input.categories || ""
        }

        setErrors(productValidations(data,productsDb))
        if(Object.keys(errors).length === 0
        && input.name !== ""
        &&input.price !== ""
        && input.description !== ""
        && input.rating !== ""
        && input.stock !== ""
        && input.img !== ""
        && input.categories.length >0){
            let response = null
            try {
                response = await fetch('http://localhost:3001/products',
                {method:"POST",
                headers: {
                    "Content-Type": "application/json",
                },
            body: JSON.stringify(data)
            })
            const result = await response.json()  
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
            rating:"0",
            stock:"",
            img: "",
            categories: [],
                })
            }
            }
            } catch (error) {
                console.log(error)
            }
        }
    }

    return (
        <div className='productForm'>
            <div className="formularyProduct">

            <form className='prodForm' onSubmit={handleSubmit}>
            <div>
                <h3>Añadir o Editar:</h3>
            <div>
                <span>Nombre</span>
                <input className={errors.name && style.danger} type='text' placeholder="Nombre del producto..."
                name='name' value={input.name} onChange={handleInputChange}/>
                {errors.name && (<p className={style.danger}>{errors.name}</p>)}
            </div>
            <div>
            <span>Precio</span>
                <input className={errors.name && style.danger} type='text' placeholder="Precio del producto..."
                name='price' value={input.price} onChange={handleInputChange}/>
                {errors.price && (<p className={style.danger}>{errors.price}</p>)}               

            </div>
            <div>
            <span>Descripction</span>
                <input className={errors.name && style.danger} type='text' placeholder="Descripción del producto..."
                name='description' value={input.description} onChange={handleInputChange}/>
                {errors.description && (<p className={style.danger}>{errors.description}</p>)}              
            </div>
            <div>
            <span>Stock</span>
                <input className={errors.name && style.danger} type='text' placeholder="Unidades en inventario..."
                name='stock' value={input.stock} onChange={handleInputChange}/>
                {errors.stock && (<p className={style.danger}>{errors.stock}</p>)}              
            </div>
            <div>
            <span>Imagen(en pruebas)</span>
                <input className={errors.name && style.danger} /* accept="image/*" type='file' multiple={true} */ type="text" placeholder="Imagen del producto..."
                name='img' value={input.img} onChange={handleInputChange}/>
                {errors.img && (<p className={style.danger}>{errors.img}</p>)}             
            </div>
            </div>
            <div>
                <span>Categorias:</span>
                {categoriesDb.length ?<select className={errors.categories && style.danger} name ='categories' id='categoriesSelector' onChange={handleArrayChange} multiple={true} size={categoriesDb && categoriesDb.length < 10 ? categoriesDb.length : 10}>
                {categoriesDb && categoriesDb.map((category)=>{return(
                    <option key={category.id} value={category.name}>{category.name}</option>
                )})}
                </select>:<span> Aun no se han creado categorias</span>}
            </div>
            <div>
                {input.categories && input.categories.map((category)=>{
                    return(
                        <button key={category} name="categories" value={category} onClick={handleRemove}>{category}</button>
                    )
                })}
            </div>
            <div>
                {Object.keys(errors).length === 0 && Object.keys(input).length > 0 && 
                <input type='submit' value= "Add Product" className='finalButton'onClick={handleSubmit}/>   
            }
            </div>
            <div>
            <Link to="/admin">
            <button onClick={handleReturn}className='returnButton'> 
                            Volver
                        </button>
            </Link>
            </div>
            </form>
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