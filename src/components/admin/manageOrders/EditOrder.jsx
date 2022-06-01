import { useDispatch } from "react-redux"
import React, {useEffect, useState} from "react"
import style from './EditOrder.module.css'
import capitalize from "../adminPage/Capitalize"
import FormModal from "../AdminModals/FormModal"
import numberFormat from "../../detalleProducto/numberFormat"
import axios from "axios"
import SERVER from "../../../server"
import { toast } from "react-toastify"
import { getPaidOrders } from "../../../redux/actions/products"

export default function OrderEdit({order,setOrderEdit}){
    const dispatch = useDispatch()

    const [errors,setErrors]=useState({})
    const [input,setInput] = useState({
        sendStatus: "",
    })

    const [isOpen,setIsOpen] = useState(false)

    function partDate(e){
        return e.split("T")[0]
    }
    
    function onClick(e){
        e.preventDefault()
        setInput({
            ...input,
            [e.target.name]: e.target.value
        })
    }

    function openModal(e){
        e.preventDefault()
        setIsOpen(true)
    }
    function closeDetail (e){
        e.preventDefault()
        setOrderEdit([])
        setInput({
            sendStatus:""
        })
    }

    async function onSave(e){
        e.preventDefault()
        if(input.sendStatus !==""){
            if(input.sendStatus === "shipped" || input.sendStatus === "delivered" || input.sendStatus === "returned" ){
                let response = null
                try {
                    response = await axios.put(`${SERVER}/cart/status/${order.id}`,input)
                    const result =response.data
                
                if(result){
                if(result.msg === "Status updated"){
                    toast.success(`${result.msg}`, {
                        position: toast.POSITION.BOTTOM_RIGHT
                    });
                    dispatch(getPaidOrders())
                    setInput({
                        sendStatus: ""
                    })
                    setOrderEdit([])
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
    }

    useEffect(()=>{
        if(order && order.id){
            setInput({
                sendStatus: order.sendStatus
            })
        }
    },[order])

    return (   
        <div className={style.container}>
            {order && order.id ?
            <>
            <button onClick={closeDetail} className={style.closeBtn}>X</button>
            <button className={style.detailBtn} onClick={openModal}>Order Details</button>
            <div className={style.dataDiv}>
                <p>Buy Date: {partDate(order.date)}</p>
                <p>Email: {order.user.email}</p>
                <p>Order Status: {input.sendStatus ? capitalize(input.sendStatus): capitalize(order.sendStatus)}</p>
            </div>
            <span id={style.message}>Change order status</span>
            <div className={style.btnDiv}>
                <button className={style.btnZ} id={style.A} value="shipped" name="sendStatus" onClick={onClick}>Shipped</button>
                <button className={style.btnZ} id={style.B} value="delivered" name="sendStatus" onClick={onClick}>Delivered</button>
                <button className={style.btnZ} id={style.C} value="returned" name="sendStatus" onClick={onClick}>Returned</button>
            </div>
            <button className={style.saveBtn} onClick={onSave}>Edit</button>
            </>
            :
            <>
            <div className={style.imageBox}>
                <img id={style.imageDiv}src="https://res.cloudinary.com/drcvcbmwq/image/upload/v1654106526/9712f16cb5f6fd969ea56030f2afe0ca_rtuv8p.png" alt="..."/>
            </div>
            <h2>Orders admin page</h2>
            <div className={style.dataBox}>
            <h2 id={style.special}><i>- Search an order</i></h2>
            <h2 id={style.special}><i>- See order details</i></h2>
            <h2 id={style.special}><i>- Change order status</i></h2>
            </div>
            </>
            }

            <FormModal isOpen={isOpen} setIsOpen={setIsOpen}>
            <div className={style.containerProd}>
            {order ? 
            <div className={style.clientInfo}>
                <p> Client: {`${order.user.name} ${order.user.last_name}`}</p>
                <p>Client email: {order.user.email}</p>
                <p>Client address: {order.user.address}</p>
                <p>Contact: {order.user.phone_number}</p>
            </div>
            :
            <></>}

            <div className={style.detailZone}>
                {order ? order.details.map((detail)=>{
                    return(
                        <div key={detail.productId} className={style.prodDetail}>
                            <div className={style.imageBox}>
                                <img id={style.imageDiv2}src={detail.img} alt="..."/>
                            </div>
                        <div className={style.infoDiv}>
                        <p>{detail.name}</p>
                        <p>QTY: {detail.bundle}</p>
                        <p>Price: {numberFormat(detail.price)}</p>
                        <p>Products price: USD {numberFormat(detail.price_total)}</p>
                        </div>
                        </div>
                    )
                }):<>
                
                </>}
                {order ? <p id={style.finalPrice}>Total price: USD {numberFormat(order.price_total)}</p> :<></>}
                
            </div>
            </div>
           
            </FormModal>


        </div>
    )
}