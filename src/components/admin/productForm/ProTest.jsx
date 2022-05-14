import axios from "axios"
import React,{useState} from "react"
import productValidations from '../../utils/productValidation'
import {useDispatch, useSelector} from 'react-redux'
import { useNavigate,Link } from "react-router-dom"
import { getProductByName,getAllProducts} from "../../../redux/actions/products"
import { getCategories } from "../../../redux/actions/categories"
import style from './ProductAdmin.module.css'
import Banner from '../Banner'
import activeValidators from './validators/activeValidators'


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

    function onValueChange (e){
        //setErrors(activeValidators({...input,[e.target.name]:e.target.value},productsDb))
        setInput({...input,[e.target.name]:e.target.value}) 
    }

    function onNumberChange (e){
        //setErrors(activeValidators({...input,[e.target.name]:parseInt(e.target.value)},productsDb))
        setInput({...input,[e.target.name]:parseInt(e.target.value)}) 
    }

    function onArrayChange(i){
        if(!input.categories.includes(i.target.value)){
            return(
                    setInput({
                        ...input,
                        [i.target.name]:[...input.categories,i.target.value]
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

    function upload (event){
      event.preventDefault()
        const data = new FormData();
      data.append("input",JSON.stringify(input))
      for (let index = 0; index < file.length; index++) {
          data.append("file", file[index]);

      }

      axios.post("http://localhost:3001/test",data)
      .then(res=>console.log(res))
      .catch(err =>console.log(err))

      setFile([])
  }

    return(
        <>
        <form>
        <div>
            <span>Nombre</span>
            <input className={errors.name && style.danger} type='text' placeholder="Nombre del producto..."
            name='name' value={input.name} onChange={onValueChange}/>
            {errors.name && (<p className={style.danger}>{errors.name}</p>)}
            </div>
            <div>
            <span>Precio</span>
                <input className={errors.name && style.danger} type='text' placeholder="Precio del producto..."
                name='price' value={input.price} onChange={onValueChange}/>
                {errors.price && (<p className={style.danger}>{errors.price}</p>)}               
            </div>
            <div>
            <span>Descripction</span>
                <input className={errors.name && style.danger} type='text' placeholder="Descripción del producto..."
                name='description' value={input.description} onChange={onValueChange}/>
                {errors.description && (<p className={style.danger}>{errors.description}</p>)}              
            </div>
            <div>
            <span>Stock</span>
                <input className={errors.name && style.danger} type='text' placeholder="Unidades en inventario..."
                name='stock' value={input.stock} onChange={onNumberChange}/>
                {errors.stock && (<p className={style.danger}>{errors.stock}</p>)}              
            </div>
            <div>
                <span>Categorias:</span>
                {categoriesDb.length ?<select className={errors.categories && style.danger} name ='categories' id='categoriesSelector'
                onChange={onArrayChange} multiple={true} size={categoriesDb && categoriesDb.length < 10 ? categoriesDb.length : 10}>
                {categoriesDb && categoriesDb.map((category)=>{return(
                    <option key={category.id} value={category.name}>{category.name}</option>
                )})}
                </select>:<span> Aun no se han creado categorias</span>}
            </div>
            <div>
                {input.categories && input.categories.map((category)=>{
                    return(
                        <button key={category} name="categories" value={category} onClick={onRemove}>{category}</button>
                    )
                })}
            </div>





            <div>
            <span>Name</span>
            <input className="inputs" accept="image/png,image/jpg,image/jpeg" multiple={true} type='file' 
            name="file"  onChange={(e)=>onFileChange(e.target.files)}/>
            </div>

            <button onClick={upload}>
            Upload
        </button>
        </form>
        </>
    )
}