import { useState, useEffect, memo } from 'react'
import { Outlet, useNavigate } from 'react-router-dom';
import logo from 'images/logo.svg'
import user from 'images/user.png'
import EmailIcon from '@mui/icons-material/Email';
import Menu from 'images/menu.png'

import Button from 'components/Button'
import styles from './Header.module.scss'
import OptionMenu from 'components/OptionMenu'

import { auth } from 'config/firebase';
import Notifications from 'components/Notifications';

function Header({ selected, childToParent, usuarioLogado }: any) {
    const [option, setOption] = useState(false)
    const [acordo, setAcordo] = useState(false)
    const [notification, setNotification] = useState(false)
    const [logado, setLogado] = useState(false)
    const navigate = useNavigate();

    //VERIFICAR SE ESTÁ LOGADO
    useEffect(() => {
        const estadoUsuario = auth.onAuthStateChanged(usuario => {
            if (usuario) {
                setLogado(true)
            }
        })
        return () => estadoUsuario();
    }, [])

    const mostrarOption = (childdata: boolean) => {
        setOption(childdata)
    }

    const rotas = [{
        label: (window.location.pathname) === '/' ? 'Contratar' : 'Especialistas',
        selected: 1,
    }, {
        label: (window.location.pathname) === '/' ? 'Candidatar-se' : 'Serviços',
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
        if (window.location.pathname !== '/' && window.location.pathname !== '/pesquisa/*') {
            navigate('/pesquisa/' + selecionado)
        } else {
            childToParent(selecionado)
        }
    }

    function pressionarLogo() {
        if (logado) {
            setNotification(!notification)
        } else {
            navigate('/')
        }
    }

    function pressionarMenu() {
        if (!acordo) setOption(!option)
        setAcordo(!acordo)
    }

    if (window.location.pathname.toLowerCase().indexOf('cadastro') > 0 ||
        window.location.pathname.toLowerCase().indexOf('perfil') > 0 ||
        window.location.pathname.toLowerCase().indexOf('trabalho') > 0 ||
        window.location.pathname.toLowerCase().indexOf('planos') > 0) {
        selected = 0
    }

    return (
        <>
            <div className={styles.header}>
                <div className={styles.cover}>
                    <img className={styles.cover__img} src={logo} onClick={() => navigate('/')} alt='Logo do projeto' />
                    {logado && <EmailIcon fontSize='large' className={styles.cover__mail} onClick={() => pressionarLogo()} />}
                </div>

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
                                <img className={styles.user} src={usuarioLogado.avatar !== '' ? usuarioLogado.avatar : user} alt='Perfil de usuário' onClick={() => pressionarMenu()} />
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
                <img src={Menu} alt='Menu Hamburguer' className={styles.hamburguer} onClick={() => pressionarMenu()} />
            </div>

            {notification ? <div className={styles.container}>
                <Notifications notification={notification} setNotification={setNotification} usuarioLogado={usuarioLogado} />
            </div> : ''}

            {option ? <div className={styles.container}>
                <OptionMenu logado={logado} mostrarOption={mostrarOption} />
            </div> : ''}

            <Outlet />
        </>
    )
}
export default memo(Header)