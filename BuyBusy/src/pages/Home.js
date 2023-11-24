// Components Imports
import ProductsGrid from "../components/ProductsGrid";
import SearchBar from "../components/SearchBar";
import Filters from "../components/Filters";

// Styles Import
import styles from "./Home.module.css"

// Home component
export default function Home(){
    return(
        <>
        <div className={styles.body} >
            <div className={styles.searchBarContainer}>
                <SearchBar/>
            </div>

            <aside className={styles.sidebar}>
                <Filters/>
            </aside>

            <div className={styles.productsGridContainer}>
                <ProductsGrid/>
            </div>

        </div>
        </>
    )
}