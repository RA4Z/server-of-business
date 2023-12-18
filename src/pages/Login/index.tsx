import Logo from 'images/logo.svg'
import styles from './Login.module.scss';
import { useNavigate } from 'react-router-dom';
import { Snackbar, TextField } from '@mui/material';
import Button from 'components/Button';
import ForgotPassword from 'pages/Login/ForgotPassword';
import { useState, useEffect } from 'react';

import { logar } from 'services/requisitions';
import { auth } from 'config/firebase';
import { verificaSeTemEntradaVazia } from 'utils/common';

export default function Login() {
    useEffect(() => { window.scrollTo({ top: 0, behavior: 'smooth' }); })
    const navigate = useNavigate();
    const [statusToast, setStatusToast] = useState({ visivel: false, message: '' })
    const [forgotPassWordVisible, setForgotPassWordVisible] = useState(false)
    const [dados, setDados] = useState({
        email: '',
        senha: ''
    });

    //VERIFICAR SE ESTÁ LOGADO
    useEffect(() => {
        const estadoUsuario = auth.onAuthStateChanged(usuario => {
            if (usuario) {
                navigate('/Perfil')
            }
        })
        return () => estadoUsuario();
    })

    async function realizarLogin() {
        if (verificaSeTemEntradaVazia(dados, setDados)) {
            setStatusToast({ message: 'Insira seu E-mail e senha!', visivel: true })
            return
        }
        const resultado = await logar(dados.email, dados.senha)
        if (resultado === 'erro') {
            setStatusToast({ message: 'E-mail ou senha inválidos!', visivel: true })
            return
        }
        navigate('/Perfil')
    }

    const childToParent = (childdata: boolean) => {
        setForgotPassWordVisible(childdata)
    }
    return (
        <>
            <div className={styles.container}>
                <img src={Logo} onClick={() => navigate('/')} alt='Logotipo da empresa' />
                <p className={styles.container__title}>Server of Business</p>
                <form className={styles.container__inputs}>
                    <TextField id="outlined-basic" value={dados.email} onChange={(valor) => setDados({ email: valor.target.value, senha: dados.senha })} label="E-mail" variant="outlined" autoComplete="email" className={styles.input} />
                    <TextField id="outlined-password-input" value={dados.senha} onChange={valor => setDados({ email: dados.email, senha: valor.target.value })} label="Senha" variant="outlined" type='password' autoComplete="current-password" className={styles.input} />
                </form>
                <p className={styles.container__password} onClick={() => setForgotPassWordVisible(true)}>Esqueceu sua senha?</p>
                <Button texto='Login' dark={true} onClick={() => realizarLogin()} />

                <div className={styles.container__criar}>
                    <p>Ainda não possui uma conta?</p>
                    <button onClick={() => navigate('/cadastro')}>Criar conta</button>
                </div>
                <ForgotPassword visible={forgotPassWordVisible} childToParent={childToParent} />
            </div>
            <Snackbar
                open={statusToast.visivel}
                onClose={() => setStatusToast({ ...statusToast, visivel: false })}
                autoHideDuration={3000}
                message={statusToast.message}
            />
        </>
    )
} 