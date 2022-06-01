import AlertModal from '../AdminModals/AlertModal'
import { useDispatch} from 'react-redux'
import style from './Table_Main.module.css'
import { useState } from 'react'
import axios from "axios"
import SERVER from '../../../server'
import { getAllUsers } from '../../../redux/actions/user'
import { toast } from 'react-toastify';


export default function UsersTable({array,setUserEdit, myUser}){
    const dispatch = useDispatch()

    const [isOpen,setIsOpen]= useState(false)
    const [base,setBase] = useState([])

    function onDeactivate(e){
        e.preventDefault()
        if(base.includes(e.target.value)){
            setBase(base.filter((user)=>user !== e.target.value)
            )
        }else{
            setBase([...base,e.target.value])
        }
    }


    function onConfirm(e){
        if(e.target.name === "confirm"){
            setIsOpen(true);
        }
    }

    function onEdit(e){
        e.preventDefault()
        setUserEdit(array.filter(user=> user.id === e.target.value ))
    }
    
    async function confirmDelete(e){
        e.preventDefault()
        const data = {array: base}
        if(e.target.name ==="confirm"){
            const response = await axios.put(`${SERVER}/user/bulk/off`,data)
            const result = await response.data
            if(result){
                setIsOpen(false)
                if(result.msg === "Users deactivated"){
                    toast.success(`${result.msg}`, {
                        position: toast.POSITION.BOTTOM_RIGHT
                    });
                dispatch(getAllUsers())
                setBase([])
                setUserEdit([])
            }else{
                toast.error(`${result.msg}`, {
                    position: toast.POSITION.BOTTOM_RIGHT
                });
            }
        }
    }
    }

    return (
        <div className={style.container}>
            {array && array.length > 0 ? array.map((user)=>{
                return(
                    <div key={user.id} className={base.includes(user.id)?style.box2:style.box}>
                        <h3 className={style.title}>{user.user_name}</h3>
                        {user && user.isActive && user.id !== myUser.id ? <button className={style.btn} value = {user.id} onClick={onDeactivate}>{base.includes(user.id)?"Cancel": "Deactivate"}</button>: <div className={style.btn}></div> }
                        <button value={user.id} className={style.btnAdmin   } onClick={onEdit}>Edit</button>
                        
                    </div>
                )
            }):
            <div>
            <h1 className={style.coincidences}>There is no coincidences</h1>
            </div>}
            <div className={style.admBox}>
            {base && base.length > 0  ? (<>
            <span>Deactivate <strong>{base.length}</strong> accounts</span>
            <button name="confirm" onClick={onConfirm}className={style.deleteBtn}>Confirm</button>
            </>): <></> }    
            </div>
            <AlertModal setIsOpen={setIsOpen} isOpen={isOpen}>
                <h2>Are you sure you want to deactivate {base.length} accounts</h2>
                <button name="confirm" onClick={confirmDelete} className={style.btnAdmin}>Deactivate</button>
            </AlertModal>
        </div>

    )
}