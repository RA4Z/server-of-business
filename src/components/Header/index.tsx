import logo from 'images/logo.svg'
import hamburguer from 'images/hamburguer.svg'
import user from 'images/user.png'

import Button from 'components/Button'
import styles from './Header.module.scss'

export default function Header({ logado = false }) {
    const rotas_logon = [{
        label: 'Especialistas',
        to: '/'
    }, {
        label: 'Serviços',
        to: '/'
    }];

    const rotas_logoff = [{
        label: 'Contratar',
        to: '/'
    }, {
        label: 'Candidatar-se',
        to: '/'
    }];

    const menu_item = [{
        label: 'Login',
        dark: false,
        to: '/'
    }, {
        label: 'Cadastre-se',
        dark: true,
        to: '/'
    }]

    console.log(window.screen.width)
    return (
        <div className={styles.header}>
            <img className={styles.img} src={logo} alt='Logo do projeto' />

            {logado ?
                <>
                    <ul className={styles.menu__list}>
                        {rotas_logon.map((rotas_logon, index) => (
                            <li key={index} className={styles.menu__link}>
                                <a href={rotas_logon.to}>{rotas_logon.label}</a>
                            </li>
                        ))}
                    </ul>
                    <ul className={styles.menu__buttons}>
                            <li className={styles.menu__button}>
                                <a href='/'>
                                    <img className={styles.user} src={user} alt='Perfil de usuário' />
                                </a>
                            </li>
                    </ul>
                </>
                :
                <>
                    <ul className={styles.menu__list}>
                        {rotas_logoff.map((rotas_logoff, index) => (
                            <li key={index} className={styles.menu__link}>
                                <a href={rotas_logoff.to}>{rotas_logoff.label}</a>
                            </li>
                        ))}
                    </ul>
                    <ul className={styles.menu__buttons}>
                        {menu_item.map((menu_item, index) => (
                            <li key={index} className={styles.menu__button}>
                                <a href={menu_item.to}>
                                    <Button texto={menu_item.label} dark={menu_item.dark} />
                                </a>
                            </li>
                        ))}
                    </ul>
                </>
            }
            <img className={styles.hamburguer} src={hamburguer} alt='Menu Hamburguer' />
        </div>
    )
}