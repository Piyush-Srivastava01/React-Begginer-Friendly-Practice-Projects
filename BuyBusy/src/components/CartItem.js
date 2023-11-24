import { useEffect } from "react";
import { useCartContext } from "../context/CartContext"
import { useProductsContext } from "../context/ProductsContext"
import styles from "./product.module.css"

export default function CartItem({cartItem}){ 
    const { increaseCart, decreaseCart, removeFromCart } = useCartContext();

    const{ productId, title, price, thumbnail, quantity } = cartItem;
    return(
        <div className={styles.product} >
        <div className={styles.image} >
            < img alt="product image" src={thumbnail} />
        </div>
        <div className={styles.details}>
            <p className={styles.title} > {title} </p>
            <div className={ styles.productOptions } >
                <p className={styles.price} > ₹{price} </p>
                <div className={styles.productCounter}>
                    <p> <span onClick={ () =>  decreaseCart(productId)} > - </span>  {quantity}  <span onClick={ () =>  increaseCart(productId)} > + </span> </p>
                </div>
            </div>
        </div>
        <button className={styles.removeFromCartBtn} onClick={ () => removeFromCart(productId) } >Remove from Cart</button>
    </div>
    )
}