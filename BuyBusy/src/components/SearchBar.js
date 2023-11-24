import styles from "./searchBar.module.css";

export default function SearchBar(){
    return(
        <div className={styles.searchBar} >
            <input  type="text" placeholder="Search By Name"/>
        </div>
    )
}