import styles from "./productsGrid.module.css";
import Product from "./Product";

import { ClipLoader } from "react-spinners";

import { useProductsContext } from "../context/ProductsContext";
import { useFiltersContext } from "../context/FiltersContext";


export default function ProductsGrid(){
    const {products, loading} = useProductsContext(); 
    const {priceRange, categoriesFilter} = useFiltersContext();
    if ( !loading ) {
        return (
            <div className={styles.productsGridContainer} >
            <div className={styles.productsGrid} >
                { products.map( (product, index) => {
                    if( product.price <= priceRange  &&  (categoriesFilter.length != 0 ? categoriesFilter.includes( product.category ) : true) ){
                        return( <Product product={product} key={product.productId}/> )
                    }
                } ) }
            </div>
            </div>
        )
    }
    else{
        return (
            <ClipLoader/>
        )
    }  


}