import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Footer from "../Footer/Footer";
import NavBar from "../navBar/NavBar";
import Accordion from "./Accordion";
import style from "./userProfile.module.css"
import activeValidations from "../registro/validators/activeValidations"
import PasswordValidations from "./validators/PasswordValidation"
import { submitA,submitB,submitD} from "./validators/SubmitValidators";
import { toast } from "react-toastify";
import axios from "axios";
import SERVER from "../../server";
import { profileUpdate, logout, userUpdate } from "../../redux/actions/user";
import { cleanCart, cleanFav } from "../../redux/actions/products";
import { useNavigate } from "react-router-dom";
import { NavLink } from "react-router-dom";

export default function UserProfile() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const user = useSelector((state) => state.users.userInfo);

    const [profile, setProfile] = useState({
        name: "",
        last_name: "",
        user_name: "",
        email: "",
        birthday: "",
    });

    const [password, setPassword] = useState({
        prev_password: "",
        new_password: "",
        conf_password: "",
    });

    const [shipping, setShipping] = useState({
        address: "",
        phone_number: "",
    });

    const [google, setGoogle] =useState({
        password: "",
       
    })

    const [errorsA, setErrorsA] =useState({})
    const [errorsB, setErrorsB] =useState({})
    const [errorsC, setErrorsC] =useState({})
    const [errorsD, setErrorsD] =useState({})
    
    function handleChangeA(e){
        setErrorsA(activeValidations({...profile,[e.target.name]:e.target.value}))
        setProfile({
            ...profile,
            [e.target.name]: e.target.value,
        });
    }

    function handleChangeB(e) {
        setErrorsB(
            PasswordValidations({ ...password, [e.target.name]: e.target.value })
        );
        setPassword({
            ...password,
            [e.target.name]: e.target.value,
        });
    }

    function handleChangeC(e) {
        setErrorsC(
            activeValidations({ ...shipping, [e.target.name]: e.target.value })
        );
        setShipping({
            ...shipping,
            [e.target.name]: e.target.value,
        });
    }

    function handleChangeD(e){
        setErrorsD(activeValidations({...google,[e.target.name]:e.target.value}))
        setGoogle({
            ...google,
            [e.target.name]: e.target.value
        })
    }



    async function handleSubmitA(e){
        e.preventDefault()
        setErrorsA(submitA(profile))
        if (Object.keys(errorsA).length === 0
        && profile.name !== ""
        && profile.last_name !== ""
        && profile.user_name !== ""
        && profile.email !== ""
        && profile.birthday !== ""){
            let response = null
            try {
                response = await axios.put(`${SERVER}/user/update/${user.id}`, profile);
                const result = response.data;

                if (result) {
                    if (result.msg === "Profile data updated") {
                        dispatch(profileUpdate(result.user));
                        setProfile({
                            name: "",
                            last_name: "",
                            user_name: "",
                            email: "",
                            birthday: "",
                        });
                        toast.success(`${result.msg}`, {
                            position: toast.POSITION.BOTTOM_RIGHT,
                        });
                    } else {
                        toast.error(`${result.msg}`, {
                            position: toast.POSITION.BOTTOM_RIGHT,
                        });
                    }
                }
            } catch (error) {
                console.log(error);
            }
        }
    }
    async function handleSubmitB(e) {
        e.preventDefault();
        setErrorsB(submitB(password));
        if (
            Object.keys(errorsB).length === 0 &&
            password.prev_password !== "" &&
            password.new_password !== "" &&
            password.new_password !== password.prev_password &&
            password.conf_password !== ""
        ) {
            let response = null;
            try {
                response = await axios.put(
                    `${SERVER}/user/update/${user.id}`,
                    password
                );
                const result = response.data;

                if (result) {
                    if (result.msg === "Password updated") {
                        setPassword({
                            prev_password: "",
                            new_password: "",
                            conf_password: "",
                        });
                        dispatch(logout());
                        dispatch(cleanCart());
                        dispatch(cleanFav());
                        toast.success(`${result.msg}`, {
                            position: toast.POSITION.BOTTOM_RIGHT,
                        });
                        navigate("/login", { replace: true });
                    } else {
                        toast.error(`${result.msg}`, {
                            position: toast.POSITION.BOTTOM_RIGHT,
                        });
                    }
                }
            } catch (error) {
                console.log(error);
            }
        }
    }
    async function handleSubmitC(e) {
        e.preventDefault();
        if (Object.keys(errorsC).length === 0) {
            let response = null;
            try {
                response = await axios.put(
                    `${SERVER}/user/update/${user.id}`,
                    shipping
                );
                const result = response.data;

                if (result) {
                    if (result.msg === "Shipping data updated") {
                        dispatch(profileUpdate(result.user));
                        setShipping({
                            address: "",
                            phone_number: "",
                        });
                        toast.success(`${result.msg}`, {
                            position: toast.POSITION.BOTTOM_RIGHT,
                        });
                    } else {
                        toast.error(`${result.msg}`, {
                            position: toast.POSITION.BOTTOM_RIGHT,
                        });
                    }
                }
            } catch (error) {
                console.log(error);
            }
        }
    }

    async function handleSubmitD(e){
        e.preventDefault()
        setErrorsD(google)
        dispatch(userUpdate(user.id, google))           
        dispatch(logout())
        dispatch(cleanCart())
        dispatch(cleanFav())
        toast.success(`Password Created`, {
            position: toast.POSITION.BOTTOM_RIGHT
        });
        navigate("/login",{replace:true})                 
    }

    function partDate(e){
        return e.split("T")[0]
    }

    useEffect(() => {
        if (user) {
            setProfile({
                name: user.name ? user.name : "",
                last_name: user.last_name ? user.last_name : "",
                user_name: user.user_name ? user.user_name : "",
                email: user.email ? user.email : "",
                birthday: user.birthday ? partDate(user.birthday) : "",
            });
            setShipping({
                address: user.address ? user.address : "",
                phone_number: user.phone_number ? user.phone_number : "",
            });
        }
    }, [user]);

    return (
        <div>
            <div>
                <NavBar />
            </div>
            <div className={style.page}>
                <div className={style.profileBox}>
                    <div className={style.imageBox}>
                        <img
                            id={style.imageDiv}
                            src="https://res.cloudinary.com/drcvcbmwq/image/upload/v1653589673/aps_504x498_medium_transparent-pad_600x600_f8f8f8_r3fwnu.jpg"
                            alt="..."
                        />
                    </div>
                    <div className={style.tytles}>
                        <h4>{user.user_name}</h4>
                        <h5>{user.email}</h5>
                        <h6>
                            Birthday:{" "}
                            {user.birthday ? partDate(user.birthday) : "No date added"}
                        </h6>
                    </div>
                    <div className={style.data}>
                        <p>First name: {user.name}</p>
                        <p>Last name: {user.last_name}</p>
                        <p>Address: {user.address ? user.address : "No address added"}</p>
                        <p>
                            Phone number:{" "}
                            {user.phone_number ? user.phone_number : "No phone number added"}
                        </p>
                        <NavLink to="/myShopping">
                            <button className={style.mybtn} /* onClick={} */>
                                My shopping
                            </button>
                        </NavLink>
                    </div>
                </div>
                <div className={style.forms}>
                    <Accordion
                        title={"Profile info"}
                        content={"Edit your name, username, birthday and email"}
                    >
                        <form onSubmit={handleSubmitA}>
                            <p>First name:</p>
                            <input
                                className={errorsA?.name ? style.inputError : style.input}
                                name="name"
                                value={profile.name}
                                type="text"
                                placeholder="Add your First name..."
                                onChange={handleChangeA}
                            />
                            {errorsA.name && <p className={style.errors}>{errorsA.name}</p>}
                            <p>Last name:</p>
                            <input
                                className={errorsA?.last_name ? style.inputError : style.input}
                                name="last_name"
                                value={profile.last_name}
                                type="text"
                                placeholder="Add your Last name..."
                                onChange={handleChangeA}
                            />
                            {errorsA.last_name && (
                                <p className={style.errors}>{errorsA.last_name}</p>
                            )}
                            <p>Username:</p>
                            <input
                                className={errorsA?.user_name ? style.inputError : style.input}
                                name="user_name"
                                value={profile.user_name}
                                type="text"
                                placeholder="Add your Username..."
                                onChange={handleChangeA}
                            />
                            {errorsA.user_name && (
                                <p className={style.errors}>{errorsA.user_name}</p>
                            )}
                            <p>Email:</p>
                            <input
                                className={errorsA?.email ? style.inputError : style.input}
                                name="email"
                                value={profile.email}
                                type="email"
                                placeholder="Add your email..."
                                onChange={handleChangeA}
                            />
                            {errorsA.email && <p className={style.errors}>{errorsA.email}</p>}
                            <p>Birthday:</p>
                            <input
                                className={style.birthday}
                                name="birthday"
                                type="date"
                                value={profile.birthday}
                                onChange={handleChangeA}
                            />
                            {errorsA.birthday && (
                                <p className={style.errors}>{errorsA.birthday}</p>
                            )}
                            <br></br>
                            <input
                                className={style.button}
                                type="submit"
                                value="Edit"
                                onClick={handleSubmitA}
                            />
                        </form>
                    </Accordion>
                    <Accordion
                        title={"Manage password"}
                        content={"Change your password every time you need it"}
                        warning={"Changing the password automatically logs out"}
                    >
                        <form onSubmit={handleSubmitB}>
                            <p>Actual password:</p>
                            <input
                                className={
                                    errorsB?.prev_password ? style.inputError : style.input
                                }
                                name="prev_password"
                                type="password"
                                onChange={handleChangeB}
                            />
                            {errorsB.prev_password && (
                                <p className={style.errors}>{errorsB.prev_password}</p>
                            )}
                            <p>New password:</p>
                            <input
                                className={
                                    errorsB?.new_password ? style.inputError : style.input
                                }
                                name="new_password"
                                type="password"
                                onChange={handleChangeB}
                            />
                            {errorsB.new_password && (
                                <p className={style.errors}>{errorsB.new_password}</p>
                            )}
                            <p>Confirm password:</p>
                            <input
                                className={
                                    errorsB?.conf_password ? style.inputError : style.input
                                }
                                name="conf_password"
                                type="password"
                                onChange={handleChangeB}
                            />
                            {errorsB.conf_password && (
                                <p className={style.errors}>{errorsB.conf_password}</p>
                            )}
                            <input
                                className={style.button}
                                type="submit"
                                value="Edit"
                                onClick={handleSubmitB}
                            />
                        </form>
                    </Accordion>
                    <Accordion
                        title={"Shipping information"}
                        content={"Edit your address and other contact info."}
                    >
                        <form onSubmit={handleSubmitC}>
                            <p>Address:</p>
                            <input
                                className={errorsC?.address ? style.inputError : style.input}
                                name="address"
                                value={shipping.address}
                                type="text"
                                placeholder="Add your address..."
                                onChange={handleChangeC}
                            />
                            {errorsC.address && (
                                <p className={style.errors}>{errorsC.address}</p>
                            )}
                            <p>Phone number:</p>
                            <input
                                className={
                                    errorsC?.phone_number ? style.inputError : style.input
                                }
                                name="phone_number"
                                value={shipping.phone_number}
                                type="text"
                                placeholder="Add your phone number..."
                                onChange={handleChangeC}
                            />
                            {errorsC.phone_number && (
                                <p className={style.errors}>{errorsC.phone_number}</p>
                            )}
                            <input
                                className={style.button}
                                type="submit"
                                value="Edit"
                                onClick={handleSubmitC}
                            />
                        </form>
                    </Accordion>
                </div>
            </div>
            <div className={style.forms}>
            <Accordion title={"Profile info"} content={"Edit your name, username, birthday and email"}>
                <form onSubmit={handleSubmitA}>
                    <p>First name:</p>
                    <input className={errorsA?.name? style.inputError : style.input} name="name" value={profile.name}type="text" placeholder="Add your First name..." onChange={handleChangeA}/>
                    {errorsA.name && (<p className={style.errors}>{errorsA.name}</p>)}
                    <p>Last name:</p>
                    <input className={errorsA?.last_name? style.inputError : style.input} name="last_name" value={profile.last_name}type="text" placeholder="Add your Last name..." onChange={handleChangeA}/>
                    {errorsA.last_name && (<p className={style.errors}>{errorsA.last_name}</p>)}
                    <p>Username:</p>
                    <input className={errorsA?.user_name? style.inputError : style.input} name="user_name" value={profile.user_name}type="text" placeholder="Add your Username..." onChange={handleChangeA}/>
                    {errorsA.user_name && (<p className={style.errors}>{errorsA.user_name}</p>)}
                    <p>Email:</p>
                    <input className={errorsA?.email? style.inputError : style.input} name="email" value={profile.email}type="email" placeholder="Add your email..." onChange={handleChangeA}/>
                    {errorsA.email && (<p className={style.errors}>{errorsA.email}</p>)}
                    <p>Birthday:</p>
                    <input className={style.birthday}name="birthday" type="date" value={profile.birthday}onChange={handleChangeA}/>
                    {errorsA.birthday && (<p className={style.errors}>{errorsA.birthday}</p>)}
                    <br></br>
                    <input className={style.button} type="submit" value="Edit" onClick={handleSubmitA}/>
                </form>
            </Accordion>
            <Accordion title={"Manage password"} content={"Change your password every time you need it"}
                warning={"Changing the password automatically logs out"}>
                <form onSubmit={handleSubmitB}>
                    <p>Actual password:</p>
                    <input className={errorsB?.prev_password? style.inputError : style.input} name="prev_password" type="password" onChange={handleChangeB}/>
                    {errorsB.prev_password && (<p className={style.errors}>{errorsB.prev_password}</p>)}
                    <p>New password:</p>
                    <input className={errorsB?.new_password? style.inputError : style.input} name="new_password" type="password" onChange={handleChangeB}/>
                    {errorsB.new_password && (<p className={style.errors}>{errorsB.new_password}</p>)}
                    <p>Confirm password:</p>
                    <input className={errorsB?.conf_password? style.inputError : style.input} name="conf_password" type="password" onChange={handleChangeB}/>
                    {errorsB.conf_password && (<p className={style.errors}>{errorsB.conf_password}</p>)}
                    <input className={style.button} type="submit" value="Edit" onClick={handleSubmitB}/>
                </form>
            </Accordion>
            <Accordion title={"Manage password Google"} content={"Change your password every time you need it"}>
                <form onSubmit={handleSubmitD}>
                    <p>Password:</p>
                    <input className={errorsD?.password? style.inputError : style.input} name="password" type="password" onChange={handleChangeD}/>
                    {errorsD.password && (<p className={style.errors}>{errorsD.password}</p>)}
                    <input className={style.button} type="submit" value="Submit" onClick={handleSubmitD}/>
                </form>
            </Accordion>
            <Accordion title={"Shipping information"} content={"Edit your address and other contact info."}>
                <form onSubmit={handleSubmitC}>
                    <p>Address:</p>
                    <input className={errorsC?.address? style.inputError : style.input} name="address" value={shipping.address}type="text" placeholder="Add your address..." onChange={handleChangeC}/>
                    {errorsC.address && (<p className={style.errors}>{errorsC.address}</p>)}
                    <p>Phone number:</p>
                    <input className={errorsC?.phone_number? style.inputError : style.input} name="phone_number" value={shipping.phone_number}type="text" placeholder="Add your phone number..." onChange={handleChangeC}/>
                    {errorsC.phone_number && (<p className={style.errors}>{errorsC.phone_number}</p>)}
                    <input className={style.button} type="submit" value="Edit" onClick={handleSubmitC}/>
                </form>
            </Accordion>
            </div>
        </div>
    );
}
