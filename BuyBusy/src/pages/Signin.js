import { useRef } from "react";
import { useAuthContext } from "../context/AuthContext"
import styles from "./forms.module.css"

export default function Signin(){
    const { signIn } = useAuthContext();
    const emailRef = useRef();
    const passwordRef = useRef();
    return(
        <div className={styles.formDiv} >
            <form>
            <h2> Sign In </h2>
                <input type="email" id="email" name="email" placeholder="Enter Email" ref={emailRef} />
                <input type="password" id="password" name="password" placeholder="Enter Password" ref={passwordRef} />
                <button type="submit" onClick={(e)=>{
                    e.preventDefault();
                    signIn( emailRef.current.value, passwordRef.current.value );
                }}  > Sign in  </button>
            <a href="/signup" > Or Sign Up Instead</a>
            </form>
        </div>
    )
}