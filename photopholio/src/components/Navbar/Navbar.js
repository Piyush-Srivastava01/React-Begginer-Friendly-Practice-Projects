import styles from './Navbar.module.css';
export default function Navbar(){
    return (
        <div className={styles.navbarContainer} >
            <img src='https://cdn.dribbble.com/users/1612143/screenshots/10585194/media/f898b8a3f282c106ea93689a01e258df.jpg?compress=1&resize=400x300&vertical=top' className={styles.logo} />
            <h2>PhotoFolio</h2>
        </div>
    )
}