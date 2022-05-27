import { useSelector } from "react-redux";
import Footer from "../Footer/Footer";
import NavBar from "../navBar/NavBar";
import Accordion from "./Accordion";
import style from "./userProfile.module.css"

export default function UserProfile (){
    const user = useSelector((state)=>state.users.userInfo)
    console.log(user)
    return(
        <div>
            <div>
                <NavBar/>
            </div>
            <div className={style.page}>
            <div className={style.profileBox}>
                <div className={style.imageBox}>
                    <img id={style.imageDiv}src="https://res.cloudinary.com/drcvcbmwq/image/upload/v1653589673/aps_504x498_medium_transparent-pad_600x600_f8f8f8_r3fwnu.jpg" alt="..."/>
                </div>
                <div className={style.tytles}>
                <h4>{user.user_name}</h4>
                <h5>{user.email}</h5>
                <h6>Birthday: {user.birthday ? user.birthday : "No date added"}</h6>
                </div>
                <div className={style.data}>
                <p>First name: {user.name}</p>
                <p>Last name: {user.last_name}</p>
                <p>Address: {user.address ? user.address : "No address added"}</p>
                <p>Phone number: {user.phone_number ? user.phone_number: "No phone number added"}</p>
                <p>DNI: {user.dni ? user.dni : "No DNI added"}</p>
                <p>Payment method: {user.payment_method ? user.payment_method: "No option selected"}</p>

                </div>
            </div>
            <div className={style.forms}>
            <Accordion title={"Profile info"} content={"Edit your name, username, birthday and email"}>
                <form>
                    <p>First name:</p>
                    <input name="name" type="text" placeholder="Add your First name..."/>
                    <p>Last name:</p>
                    <input name="last_name" type="text" placeholder="Add your Last name..."/>
                    <p>Username:</p>
                    <input name="user_name" type="text" placeholder="Add your Username..."/>
                    <p>Email:</p>
                    <input name="email "type="email" placeholder="Add your email..."/>
                    <p>Birthday:</p>
                    <input name="birthday" type="date"/>
                </form>
            </Accordion>
            <Accordion title={"Manage password"} content={"Change your password every time you need it"}>
                <form>
                    <p>Previus password:</p>
                    <input name="prev_password" type="text"/>
                    <p>New password:</p>
                    <input name="new_password" type="text"/>
                    <p>Confirm password:</p>
                    <input name="conf_password" type="text"/>

                </form>
            </Accordion>
            <Accordion title={"Shipping information"} content={"Edit your address and other contact info."}>
                <form>
                    <p>Address:</p>
                    <input name="address" type="text" placeholder="Add your address..."/>
                    <p>Phone number:</p>
                    <input name="phone_number" type="text" placeholder="Add your phone number..."/>
                    <p>Payment method:</p>
                    <input type="text"/>

                </form>
            </Accordion>
            </div>
            </div>
            
                <div id={style.footer}>
                <Footer/>
                </div>
            
        </div>
    )
}