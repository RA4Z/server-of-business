import Logo from 'images/logo.svg'
import styles from './Login.module.scss';
import { useNavigate } from 'react-router-dom';
import { TextField } from '@mui/material';
import Button from 'components/Button';
import ForgotPassword from 'pages/Login/ForgotPassword';
import { useState } from 'react';

export default function Login() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    const [forgotPassWordVisible, setForgotPassWordVisible] = useState(false)
    const navigate = useNavigate();

    const childToParent = (childdata: boolean) => {
        setForgotPassWordVisible(childdata)
    }
    return (
        <>
            <div className={styles.container}>
                <img src={Logo} onClick={() => navigate('/')} alt='Logotipo da empresa' />
                <p className={styles.container__title}>Server of Business</p>
                <form className={styles.container__inputs}>
                    <TextField id="outlined-basic" label="E-mail" variant="outlined" autoComplete="email" className={styles.input} />
                    <TextField id="outlined-password-input" label="Senha" variant="outlined" type='password' autoComplete="current-password" className={styles.input} />
                </form>
                <p className={styles.container__password} onClick={() => setForgotPassWordVisible(true)}>Esqueceu sua senha?</p>
                <Button texto='Login' dark={true} />

                <div className={styles.container__criar}>
                    <p>Ainda não possui uma conta?</p>
                    <button onClick={() => navigate('/cadastro')}>Criar conta</button>
                </div>
                <ForgotPassword visible={forgotPassWordVisible} childToParent={childToParent} />
            </div>
        </>
    )
} 