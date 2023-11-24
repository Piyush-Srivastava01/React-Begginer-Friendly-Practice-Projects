import { createContext, useContext, useEffect, useState } from "react";
import db from "../firebaseinit";
import { addDoc, collection, getDoc, getDocs, where, query } from "firebase/firestore";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
// import { useHistory } from "react-router-dom";

const authContext = createContext();
export function useAuthContext(){
    const value = useContext(authContext);
    return value;
}

export function AuthContext({children}){
    const [isSignedIn, setIsSignedIn] = useState( false );
    let [user, setUser] = useState( {} );
    // const history = useHistory();
    const navigate = useNavigate();

    // Getting current User from Local Storage 
    const currentUser = JSON.parse( localStorage.getItem( 'currentUser' ) );
    useEffect( () => {
        if( currentUser ){
            setUser( currentUser );
            setIsSignedIn( true ); 
        }  
    }, [] ) 

 
    // SignIn Function
    async function signIn( email, password ){
        const q = query( collection( db, "users" ), where( "email", "==", email ) )
        const userSpanshot = await getDocs( q );
        if( !userSpanshot.docs.length ){
        toast.error( "User not found!" )}
        else{
            if( userSpanshot.docs[0].data().password != password ){
                toast.error( "Enter correct Password" );
            }
            else{
                toast.success( "You have successfully signed in", {
                    onClose: () => {
                        navigate( "/" );
                    }
                } );
                setIsSignedIn( true );
                const userData = { userId:userSpanshot.docs[0].id,  ...userSpanshot.docs[0].data() };
                setUser( {
                    ...userData
                } );
                localStorage.setItem( "currentUser", JSON.stringify( userData ) )
            } 
        }
    }

    // SignUp Function
    async function signUp( name, email, password ){
        const q = query( collection( db, "users" ), where( "email", "==", email ) )
        const user = await getDocs( q );
        if( !user.docs.length ){
        await addDoc( collection( db, "users" ),{ name, email, password, cart: [], orders: [] } ) 
        toast.success( "You have Signed Up Successfully!" );
        navigate( "/signin" )
        }
        else{
            toast.error( "user Already Found" );
        }
    }

    //SignOut Function
    async function signOut( ){
        toast.success( "You are successfully Signed Out" )
        localStorage.removeItem( "currentUser" );
        setIsSignedIn( false );
        setUser( {} )
    }

    return(
        <authContext.Provider value={{signUp, signIn, signOut,isSignedIn, user}} >
            {children}
        </authContext.Provider>
    )
}