import { useSelector } from "react-redux";
import Footer from "../Footer/Footer";
import NavBar from "../navBar/NavBar";
import style from "./userProfile.module.css"

export default function UserProfile (){
    const user = useSelector((state)=>state.users.userInfo)
    console.log(user)
    return(
        <div>
            <div>
                <NavBar/>
            </div>
            <div className={style.profileBox}>
                <div className={style.imageBox}>
                    <img id={style.imageDiv}src="https://res.cloudinary.com/drcvcbmwq/image/upload/v1653589673/aps_504x498_medium_transparent-pad_600x600_f8f8f8_r3fwnu.jpg" alt="..."/>
                </div>
                <div className={style.tytles}>
                <h4>{user.user_name}</h4>
                <h5>{user.email}</h5>
                </div>
                <div className={style.data}>
                <p>First name: {user.name}</p>
                <p>Last name: {user.last_name}</p>
                <p>Address: {user.address ? user.address : "No address added"}</p>
                <p>Phone number: {user.phone_number ? user.phone_number: "No phone number added"}</p>
                </div>
            </div>
            

                <div id={style.footer}>
                <Footer/>
                </div>
            
        </div>
    )
}