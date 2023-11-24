import styles from "./navbar.module.css";
import { NavLink, Outlet } from "react-router-dom";

// Assets Imports
import homeIcon from "../assets/icons/home.png";
import loginIcon from "../assets/icons/log-in.png";
import logoutIcon from "../assets/icons/log-out.png";
import cart from "../assets/icons/cart.png";
import bag from "../assets/icons/bag.png"

import { useAuthContext } from "../context/AuthContext";

export default function Navbar(){
    const{ isSignedIn, signOut } = useAuthContext();
    return(
        <>
        <div className={styles.navbar} >
            <div className={styles.navbarContainer}>
                <NavLink to="/" >Busy Buy</NavLink>
                <ul className="navMenu">
                  <li> <NavLink to="/"><span> <img className={styles.icon} src={homeIcon} alt="home Icon"/> </span>Home</NavLink></li>
                  {
                    isSignedIn? 
                    <ul>
                    <li> <NavLink  to="/orders" ><span> <img className={styles.icon} src={bag} alt="sign out icon"/> </span>My Orders</NavLink></li>
                    <li> <NavLink  to="/cart" ><span> <img className={styles.icon} src={cart} alt="sign out icon"/> </span>Cart</NavLink></li>
                    <li> <NavLink  onClick={signOut} ><span> <img className={styles.icon} src={logoutIcon} alt="sign out icon"/> </span>Sign Out</NavLink></li>
                    </ul>
                    :
                    <li> <NavLink to="/signin" ><span> <img className={styles.icon} src={loginIcon} alt="sign in Icon"/> </span>Sign in</NavLink></li>
                  }
                  
            </ul>
            </div>
        </div>
        <Outlet/>
        </>
    )
}