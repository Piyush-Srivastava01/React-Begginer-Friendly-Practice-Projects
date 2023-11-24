import { useRef } from "react";
import { useProductsContext } from "../context/ProductsContext"
import styles from "./filters.module.css"
import { useFiltersContext } from "../context/FiltersContext";

export default function Filters(){
    const priceRangeRef = useRef();
    const { categories } = useProductsContext();
    const { priceRange, setPriceRange, changeCategoriesFilter } = useFiltersContext();




    return(
        <div className={styles.filters}>
            <p className={styles.heading} > Filters </p>
            <div className={styles.priceRange} >
            <label for="priceRange" > Price: ₹{priceRange} </label>
            <input id="priceRange" type="range" min="0" max="2000" step="10" onChange={ (e) => setPriceRange( e.target.value ) } ref={priceRangeRef}/>
            </div>
            <p className={styles.heading} >Category</p>
            <div className={styles.category} >
                {
                    categories.map( (category) => {
                        return(
                            <div className={styles.categoryItem} >
                            <input type="checkbox" id={category} onChange={ () =>  changeCategoriesFilter( {category} )  } />
                            <label for={category}> {category}</label>
                            </div>
                        )
                    } )
                }

            </div>

        </div>
    )
}