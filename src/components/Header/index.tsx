import { useState } from 'react'
import logo from 'images/logo.svg'
import hamburguer from 'images/hamburguer.png'
import user from 'images/user.png'

import Button from 'components/Button'
import styles from './Header.module.scss'
import OptionMenu from 'components/OptionMenu'

export default function Header({ logado = false, selected = 0, childToParent }: any) {
    const [option, setOption] = useState(false)

    const rotas_logon = [{
        label: 'Especialistas',
        selected: 1,
    }, {
        label: 'Serviços',
        selected: 2
    }];

    const rotas_logoff = [{
        label: 'Contratar',
        selected: 1,
    }, {
        label: 'Candidatar-se',
        selected: 2,
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
        <>
            <div className={styles.header}>
                <img className={styles.img} src={logo} alt='Logo do projeto' />

                {logado ?
                    <>
                        <ul className={styles.menu__list}>
                            {rotas_logon.map((rotas_logon, index) => (
                                <li key={index} className={styles.menu__link}>
                                    {selected === rotas_logon.selected ?
                                        <p>{rotas_logon.label}</p>
                                        :
                                        <button onClick={() => childToParent(rotas_logon.selected - 1)}>{rotas_logon.label}</button>}
                                </li>
                            ))}
                        </ul>
                        <ul className={styles.menu__buttons}>
                            <li className={styles.menu__button}>
                                <img className={styles.user} src={user} alt='Perfil de usuário' onClick={() => setOption(!option)} />
                            </li>
                        </ul>
                    </>
                    :
                    <>
                        <ul className={styles.menu__list}>
                            {rotas_logoff.map((rotas_logoff, index) => (
                                <li key={index} className={styles.menu__link}>
                                    {selected === rotas_logoff.selected ?
                                        <p>{rotas_logoff.label}</p>
                                        :
                                        <button onClick={() => childToParent(rotas_logoff.selected - 1)}>{rotas_logoff.label}</button>}
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
                <img className={styles.hamburguer} src={hamburguer} alt='Menu Hamburguer' onClick={() => setOption(!option)} />
            </div>

            {option ? <div className={styles.container}>
                <OptionMenu logado={logado} />
            </div> : ''}
        </>
    )
}