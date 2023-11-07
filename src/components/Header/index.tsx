import logo from '../../images/logo.svg'
import Button from '../Button'
import styles from './Header.module.scss'

export default function Header() {
    return (
        <div className={styles.header}>
            <img className={styles.img} src={logo} alt='Logo do projeto' />
            <div>
                <p>Contratar</p>
                <p>Candidatar-se</p>
            </div>
            <Button texto={'Login'} dark={false} />
            <Button texto={'Cadastre-se'} dark={true} />
        </div>
    )
}