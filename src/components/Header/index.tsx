import { useState } from 'react'
import { Outlet, useNavigate } from 'react-router-dom';
import logo from 'images/logo.svg'
import hamburguer from 'images/hamburguer.png'
import user from 'images/user.png'

import Button from 'components/Button'
import styles from './Header.module.scss'
import OptionMenu from 'components/OptionMenu'

export default function Header({ logado = false, selected, childToParent }: any) {
    const [option, setOption] = useState(false)
    const navigate = useNavigate();

    const rotas = [{
        label: 'Contratar',
        selected: 1,
    }, {
        label: 'Candidatar-se',
        selected: 2,
    }];

    const menu_item = [{
        label: 'Login',
        dark: false,
        to: '/login'
    }, {
        label: 'Cadastre-se',
        dark: true,
        to: '/cadastro'
    }]

    function navegarMenu(selecionado: number) {
        if (window.location.pathname !== '/') {
            navigate('/')
        }
        childToParent(selecionado)
    }

    return (
        <>
            <div className={styles.header}>
                <img className={styles.img} src={logo} onClick={() => navigate('/')} alt='Logo do projeto' />

                <ul className={styles.menu__list}>
                    {rotas.map((rotas, index) => (
                        <li key={index} className={styles.menu__link}>
                            {selected === rotas.selected ?
                                <p>{rotas.label}</p>
                                :
                                <button onClick={() => navegarMenu(rotas.selected)}>{rotas.label}</button>}
                        </li>
                    ))}
                </ul>
                {logado ?
                    <>
                        <ul className={styles.menu__buttons}>
                            <li className={styles.menu__button}>
                                <img className={styles.user} src={user} alt='Perfil de usuário' onClick={() => setOption(!option)} />
                            </li>
                        </ul>
                    </>
                    :
                    <>
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
            
            <Outlet />
        </>
    )
}