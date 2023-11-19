import styles from './Header.module.css'
import eye_logo from '../../images/header/eye_logo.png'
import {useContext} from "react";
import UserContext from "../../Context/UserContext";
// import

function Header({setRegisterIsOpen}) {
    const context = useContext(UserContext)

    // console.log(UserContext1)
    return (
                <header className={styles.header_wrapper}>
                    <div className={styles.logo_wrapper}>
                        <div className={styles.logo_image}>
                            <img alt={'logo'} src={eye_logo} />
                        </div>
                        <div className={styles.logo_name}>
                            <span>VF Optics</span>
                        </div>
                    </div>
                    <nav className={styles.nav_wrapper}>
                        <ul className={styles.ul_list}>
                            <li>Головна</li>
                            <li>Товари</li>
                            <li>Про нас</li>
                        </ul>
                    </nav>
                    <div className={styles.user}>
                        {context.user?
                            <span>{context.user.first_name} {context.user.last_name}</span>:
                            <span onClick={()=>setRegisterIsOpen(true)}>Login</span>}
                    </div>
                </header>
    );
}

export default Header;
