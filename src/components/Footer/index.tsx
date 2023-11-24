import styles from './Footer.module.scss'
import { memo } from 'react'

function Footer() {
    return (
        <div className={styles.background}>
            <button>Server of Business</button>
            <a href='https://github.com/RA4Z'>Desenvolvido e prototipado por Robert Aron Zimmermann robertz.raz@gmail.com</a>
        </div>
    )
}
export default memo(Footer)