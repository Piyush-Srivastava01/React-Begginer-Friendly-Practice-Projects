import { useContext, useState } from "react";

import { createContext } from "react";

const context = createContext();

export function useFiltersContext(){
    const value = useContext(context);
    return value;
}

export function FiltesrContext({children}){
    let [priceRange, setPriceRange] = useState( 2000 );
    let [categoriesFilter, setCategoriesFilter] = useState( [] );


    function changeCategoriesFilter({category}){
        if( !categoriesFilter.includes(category) ){
            setCategoriesFilter( [...categoriesFilter, category] )  
        }
        else{
            const i = categoriesFilter.findIndex( (categoryFilter) => categoryFilter == category );
            categoriesFilter.splice( i, 1 ) ;
            setCategoriesFilter( [...categoriesFilter] );
        }
    }

    return(
        <context.Provider value={{priceRange, setPriceRange, categoriesFilter, changeCategoriesFilter}}>
            {children}
        </context.Provider>
    )
}