import AlertModal from '../../AdminModals/AlertModal'
import { useDispatch, useSelector } from 'react-redux'
import style from './manageUsers.module.css'
import { useState } from 'react'
import axios from "axios"
import SERVER from '../../../../server'
import { getAllUsers } from '../../../../redux/actions/user'
import FlashModal from "../../AdminModals/FlashModal"


export default function ManageUsers({setBase,base,setModalD}){
    const dispatch = useDispatch()
    const user = JSON.parse(localStorage.getItem('userInfo'))
    const usersDb = useSelector((state)=>state.users.users)
    const array = usersDb.filter((userDb)=> userDb.id !== user.id)
    const users = array.filter((user)=> user.isActive === true)
  
    const [isOpen,setIsOpen]= useState(false)
    const [isOpen2, setIsOpen2] =useState(false)
    const [keyword,setKeyword] = useState("")

    function onDeactivate(e){
        e.preventDefault()
        if(base.includes(e.target.value)){
            setBase(base.filter((user)=>user !== e.target.value)
            )
        }else{
            setBase([...base,e.target.value])
        }
    }

    function onClose(e){
        e.preventDefault()
        setIsOpen2(false)
        setModalD(false)
        setBase([])
    }

    function onConfirm(e){
        if(e.target.name === "confirm"){
            setIsOpen(true);
        }
    }
    
    async function confirmDelete(e){
        e.preventDefault()
        const data = {array: base}
        console.log(data)
        if(e.target.name ==="confirm"){
            const response = await axios.put(`${SERVER}/user/bulk/off`,data)
            const result = await response.data
            if(result.msg === "Users deactivated"){
                setKeyword(result.msg)
                setIsOpen(false)
                setIsOpen2(true)
                dispatch(getAllUsers())
            }
        }
    }

    return (
        <div className={style.container}>
            {users && users.map((user)=>{
                return(
                    <div className={base.includes(user.id)?style.box2:style.box}>
                        <h3 className={style.title}>{user.user_name}</h3>
                        <button className={style.btn} value = {user.id}onClick={onDeactivate}>{base.includes(user.id)?"Cancel": "Deactivate"}</button>
                    </div>
                )
            })}
            <div className={style.admBox}>
            {base.length > 0  ? (<>
            <span>Deactivate <strong>{base.length}</strong> accounts</span>
            <button name="confirm" onClick={onConfirm}className={style.deleteBtn}>Confirm</button>
            </>): <></> }    
            </div>
            <AlertModal setIsOpen={setIsOpen} isOpen={isOpen}>
                <h2>Are you sure you want to deactivate {base.length} accounts</h2>
                <button name="confirm" onClick={confirmDelete} className={style.btnAdmin}>Deactivate</button>
            </AlertModal>
            <FlashModal isOpen={isOpen2} setIsOpen={setIsOpen2}>
            {keyword.length ? (
                    <>
                    <h2>{keyword}</h2>
                    {keyword === "Users deactivated"? (
                        <>
                            <button onClick={onClose} className={style.mybtn}> 
                                Close All
                            </button>
                        </>
                        ): (
                            <>
                            {keyword}
                            <button className={style.mybtn} onClick={()=> setIsOpen(state=>!state)}>Try Again</button>
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