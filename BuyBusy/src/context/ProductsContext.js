import { createContext, useContext, useEffect, useState } from "react";


import db from "../firebaseinit";
import {getDocs, collection, onSnapshot} from "firebase/firestore";

const context = createContext();

export function useProductsContext(){
    const value = useContext( context );
    return value;
}
 


export function ProductsContext({children}){
    const [products, setProducts] = useState( [] );
    const [loading, setLoading] = useState( false );
    const [categories, setCategories ] = useState( [] );

    useEffect( () => {
        setLoading( true );
        onSnapshot( collection( db, "products" ), ( snapshot ) => {
            let categories = [];
            const products = snapshot.docs.map( (doc) => {
                if( !categories.includes( doc.data().category ) ){
                    categories.push( doc.data().category );
                }
                return {
                    productId: doc.id,
                    ...doc.data()
                }
            } )
            setProducts( products );
            localStorage.setItem( "products", JSON.stringify( products ) );
            setLoading( false );
            setCategories( categories )
        } )
    }, [] )
    return(
        <context.Provider value={{products, loading, categories}} >
            {children}
        </context.Provider>
    )
}

