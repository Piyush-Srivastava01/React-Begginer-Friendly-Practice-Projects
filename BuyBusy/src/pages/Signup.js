import { useRef } from "react";
import { useAuthContext } from "../context/AuthContext"
import styles from "./forms.module.css"

export default function Signup(){
    const {signUp} = useAuthContext();
    const nameRef = useRef();
    const emailRef = useRef();
    const passwordRef = useRef();

    return(
        <div className={styles.formDiv} >
            <form>
            <h2> Sign Up </h2>
                <input type="text" id="text" name="text" placeholder="Enter Name" ref={nameRef} />
                <input type="email" id="email" name="email" placeholder="Enter Email" ref={emailRef} />
                <input type="password" id="password" name="password" placeholder="Enter Password" ref={passwordRef} />
                <button type="submit" onClick={ (e) =>{ 
                     e.preventDefault()
                     signUp( nameRef.current.value, emailRef.current.value, passwordRef.current.value )
                     }} > Sign in  </button>
            <a href="/signin" > Or Sign In Instead</a>
            </form>
        </div>
    )
}