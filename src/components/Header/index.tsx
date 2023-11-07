import logo from 'images/logo.svg'
import Button from 'components/Button'
import styles from './Header.module.scss'

export default function Header() {
    const rotas = [{
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
    return (
        <div className={styles.header}>
            <img className={styles.img} src={logo} alt='Logo do projeto' />

            <ul className={styles.menu__list}>
                {rotas.map((rota, index) => (
                    <li key={index} className={styles.menu__link}>
                        <a href={rota.to}>{rota.label}</a>
                    </li>
                ))}
            </ul>
            <ul className={styles.menu__list}>
                {menu_item.map((menu_item, index) => (
                    <li key={index} className={styles.menu__button}>
                        <a href={menu_item.to}>
                            <Button texto={menu_item.label} dark={menu_item.dark} />
                        </a>
                    </li>
                ))}
            </ul>

        </div>
    )
}