import { createContext, useContext, useEffect, useState } from "react";
import db from "../firebaseinit";
import { arrayUnion, updateDoc, doc, increment, getDoc, onSnapshot } from "firebase/firestore";
import { toast } from "react-toastify";
import { useAuthContext } from "./AuthContext";
import { useNavigate } from "react-router-dom";

const cartContext = createContext();
export const useCartContext = () => {
    const value = useContext( cartContext );
    return value;
}



export function CartContext({children}){
    const [cart, setCart] = useState( [] );
    const [loading, setLoading] = useState( false )
    const { isSignedIn } = useAuthContext();
    const navigate = useNavigate();

    const userId = JSON.parse( localStorage.getItem('currentUser') ).userId;

    useEffect( () => {
        onSnapshot( doc( db, "users", userId ), (user)=>{
            setCart( { ...user.data() }.cart )
        } )
    }, [] )

    const addToCart = async (productId) => {
        if( !isSignedIn ){
            navigate( "/singin" );
            return;
        }
        setLoading( true )
        const user = doc( db, "users", userId );         
        let currenCart = [ ...cart ];
        const cartItemPos =  currenCart.findIndex( (cartItem) => cartItem.productId == productId );

        if( cartItemPos  == -1 ){
            currenCart = [ ...currenCart, {productId, quantity: 1} ]
            await updateDoc( user, {
                cart: arrayUnion( {quantity:1, productId} )
            } ).then( () => {
                toast.success( "Cart Item increased" )
                setLoading( false )
            } )
        }
        else{
            increaseCart(productId);
        }
    }

    const increaseCart = async(productId) => {
        console.log( cart )
        const user = doc( db, "users", userId );         
        const currenCart = [ ...cart ];  
        const cartItemPos =  currenCart.findIndex( (cartItem) => cartItem.productId == productId );
        const currentQuantity = currenCart[cartItemPos].quantity; 
        currenCart[cartItemPos].quantity = currentQuantity + 1;
        await updateDoc( user, {
            cart: [ ...currenCart ]
        } ).then( () => {
            toast.success( "Cart Item increased" )
            setLoading( false )
        } )
    } 

    const decreaseCart = async(productId) => {
        const user = doc( db, "users", userId );         
        const currenCart = [ ...cart ];  
        const cartItemPos =  currenCart.findIndex( (cartItem) => cartItem.productId == productId );
        const currentQuantity = currenCart[cartItemPos].quantity; 

        if( currentQuantity - 1 <= 0 ){
            currenCart.splice( cartItemPos,1 );
        }
        else{
            currenCart[cartItemPos].quantity = currentQuantity - 1;
        }

        await updateDoc( user, {
            cart: [ ...currenCart ]
        } ).then( () => {
            toast.success( "Cart Item decreased" )
            setLoading( false )
        } )
        console.log( "hitted" )
    } 


    return(
        <cartContext.Provider value={{addToCart,increaseCart, decreaseCart, loading, cart}} >
            {children}
        </cartContext.Provider>
    )  
}