import { useCartContext } from "../context/CartContext"
import CartItem from "../components/CartItem";
import styles from "../components/productsGrid.module.css";
import styles2 from "./Home.module.css"
import { ClipLoader } from "react-spinners";
import { useAuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";


export function Cart(){
    const { isSignedIn } = useAuthContext();
    const {cartItemsDetail, loading, cartTotal, purchase} = useCartContext();
    const navigate = useNavigate();

    // useEffect( () => {
    //     if( !isSignedIn ){
    //         navigate( "/signin" );
    //         return;  
    //     }
    // }, [isSignedIn] )

    if ( !loading ) {
        return (
            <>
            <aside className={styles2.sidebar}>
                <p> Total Price: ₹{cartTotal}</p>
                <button onClick={purchase} >Purchase</button>
            </aside>
            <div className={styles.productsGrid} >
                { 
                !cartItemsDetail ?  <h1>Cart apears Empty</h1>  : cartItemsDetail.map( (cartItem, index) => {
                    return( <CartItem cartItem={cartItem} key={index} /> )
            } ) 
                }
            </div>
            </>
        )
    }
    else{
        return (
            <ClipLoader/>
        )
    } 
}