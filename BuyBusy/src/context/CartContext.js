import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useAuthContext } from "./AuthContext";
import { arrayUnion, updateDoc, doc, onSnapshot } from "firebase/firestore";
import db from "../firebaseinit";
import { useProductsContext } from "./ProductsContext";


const cartContext = createContext(); 

export function useCartContext(){
    const value = useContext( cartContext );
    return value;
}

export function CartContext({children}){
    const {products} = useProductsContext();
    const { isSignedIn } = useAuthContext();
    const navigate = useNavigate();

    const [cart, setCart] = useState( [] );
    const [orders, setOrders] = useState( [] );
    const [cartItemsDetail, setCartItemsDetail] = useState( [] );
    const [cartTotal, setCartTotal] = useState( 0 );
    const [loading, setLoading] = useState( false );
    const [userId, setUserId] = useState( "" );


    //useEffect 
    useEffect( () => {
        if( isSignedIn ){
            const userId = JSON.parse( localStorage.getItem( "currentUser" ) ).userId;
            setUserId( userId )
            onSnapshot( doc( db, "users", userId ), (user) => {
                setCart( {...user.data()}.cart );
                setOrders( {...user.data()}.orders );
            } )
        } 
    }, [ isSignedIn ] )


    useEffect( () => {
        if( isSignedIn ){
        let newCartTotal = 0;
        let cartItems = [];
        if( !cart ){
            return;
        }
        cart.map( (cartItem) => {
            const productDetails = products.find( (product) => {
                return product.productId == cartItem.productId
            } );
            newCartTotal += productDetails.price * cartItem.quantity;
            cartItems.unshift( {
                ...productDetails,
                quantity: cartItem.quantity
            } )
        } )
        setCartTotal( newCartTotal );
        setCartItemsDetail( cartItems ) 
    }
    }, [cart] )



    
//Add T0 cart function
    async function addToCart(productId){
        if( !isSignedIn ){
            console.log( "Hitted" )
            navigate( "/signin" );
            return;
        }
        setLoading( true )
        const user = doc( db, "users", userId );         
        let currenCart = [ ...cart ];
        const cartItemPos =  currenCart.findIndex( (cartItem) => cartItem.productId == productId );
        if( cartItemPos  == -1 ){
            await updateDoc( user, {
                cart: arrayUnion( {quantity:1, productId} )
            } ).then( () => {
                toast.success( "Added to cart" )
                setLoading( false )
            } )
        }
        else{
            increaseCart(productId);
        }
    }

//increase cart function
    async function increaseCart(productId ){
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

//decrease cart function
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
    } 

//removeFromCart function
    const removeFromCart = async(productId) => {
    const user = doc( db, "users", userId );         
    let currentCart = [ ...cart ];  
    const cartItemPos =  currentCart.findIndex( (cartItem) => cartItem.productId == productId );

    currentCart.splice( cartItemPos,1 );

    await updateDoc( user, {
        cart: [ ...currentCart ]
    } ).then( () => {
        toast.success( "Item removed from cart" )
        setLoading( false )
    } )
}  

//clear Cart function
    const clearCart = async () => {
        const user = doc( db, "users", userId );         
        await updateDoc( user, {
            cart: []
        } ).then( () => {
            toast.success( "Cart is Cleared" )
            setLoading( false )
        } )  
    }

//purchase function
   const purchase = async () => {
    const user = doc( db, "users", userId );         
        await updateDoc( user, {
            orders: [  {
                date: new Date().toLocaleDateString("de-DE"),
                orderValue: cartTotal,
                orderItems: [ ...cartItemsDetail ]
            }, ...orders ],
        } ).then( () => {
            clearCart();
            toast.success( "Purchase Completed" )
        } )

   }

    return(
        <cartContext.Provider value={{cartItemsDetail, cart, addToCart, increaseCart, decreaseCart, removeFromCart, cartTotal, purchase, orders }} >
            {children}
        </cartContext.Provider>
        )
}