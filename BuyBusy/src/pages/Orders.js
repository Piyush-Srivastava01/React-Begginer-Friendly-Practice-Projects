import { useCartContext } from "../context/CartContext";
import styles from "./orders.module.css";

export function Orders(){
    const {orders} = useCartContext();
    console.log(orders)
    return(
        <div className={styles.ordersContainer} >
            <h1>You Orders</h1>
            {
                !orders ? <h2>No Orders Found</h2> :
                orders.map( (order) => {
                    return(
                        <div>
                            <p> Ordered on:- {order.date} </p>
                            <table>
                                <tr>
                                    <th>Title</th>
                                    <th>Price</th>
                                    <th>Quantity</th>
                                    <th>TotalPrice</th>
                                </tr>
                                {
                                    order.orderItems.map( (orderItem) => {
                                        return(
                                            <tr>
                                                <td> {orderItem.title} </td>
                                                <td> ₹{orderItem.price} </td>
                                                <td> {orderItem.quantity} </td>
                                                <td> ₹{orderItem.quantity * orderItem.price} </td>
                                            </tr>
                                        )
                                    } )
                                }
                                <tr>
                                    <td colSpan="3" ></td>
                                    <td>₹{order.orderValue}</td>
                                </tr>
                            </table>
                        </div>
                    )
                } )  
            }
        </div>
    )
}