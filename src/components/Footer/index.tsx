import styles from './Footer.module.scss'
import { memo } from 'react'
import { Divider } from '@mui/material'

import Logo from 'images/white-logo.svg'
import Instagram from 'images/Social/instagram.png'
import Facebook from 'images/Social/facebook.png'
import Twitter from 'images/Social/twitter.png'
import Youtube from 'images/Social/youtube.png'

function Footer() {
    return (
        <div className={styles.container}>
            <div className={styles.background}>
                <div className={styles.server}>
                    <img src={Logo} alt='Logo da Server of Business' className={styles.background__logotipo} />
                    <div className={styles.background__dev}>
                        <button>Server of Business</button>
                        <a href='https://github.com/RA4Z'>Desenvolvido e prototipado por Robert Aron Zimmermann</a>
                        <p>robertz.raz@gmail.com</p>
                    </div>
                </div>
                <div className={styles.atribuicoes}>
                    <a href="https://www.flaticon.com/br/autores/freepik">Ícones criados por Freepik - Flaticon</a>
                </div>
            </div>
            <div className={styles.social}>
                <img src={Instagram} alt='Logotipo do Instagram' />
                <img src={Facebook} alt='Logotipo do Facebook' />
                <img src={Twitter} alt='Logotipo do Twitter' />
                <img src={Youtube} alt='Logotipo do Youtube' />
            </div>
            <Divider style={{ background: 'white', margin: 10 }} />
            <p>Server of Business - Todos os direitos reservados</p>
        </div>
    )
}
export default memo(Footer)