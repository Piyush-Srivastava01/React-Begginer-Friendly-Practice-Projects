import { useCartContext } from "../context/CartContext";
import styles from "./product.module.css";

export default function Product({product, key}){
    const { title, price, thumbnail } = product;
    const {addToCart, loading} = useCartContext();
    return(
        <div className={styles.product} >
            <div className={styles.image} >
                < img alt="product image" src={thumbnail} />
            </div>
            <div className={styles.details}>
                <p className={styles.title} > {title} </p>
                <p className={styles.price} > ₹{price} </p>
                <button className={styles.addToCart} onClick={() => addToCart(product.productId)} >
                    {
                        loading? "Adding": "Add to cart"
                    }
                </button>
            </div>
        </div>
    )
}