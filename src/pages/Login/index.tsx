import Logo from 'images/logo.svg'
import styles from './Login.module.scss';

export default function Login() {

    return (
        <>
            <div className={styles.container}>
                <img src={Logo} alt='Logotipo da empresa' />
                <p className={styles.container__title}>Server of Business</p>
            </div>
        </>
    )
} 