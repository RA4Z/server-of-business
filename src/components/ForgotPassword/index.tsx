import { TextField } from '@mui/material'
import styles from './ForgotPassword.module.scss'
import Logo from 'images/logo.svg'
import Button from 'components/Button'

export default function ForgotPassword() {
    return (
        <div className={styles.container}>
            <img src={Logo} alt='Logotipo Server of Business' />
            <p>Insira seu E-mail abaixo</p>
            <TextField id="outlined-basic" label="E-mail" variant="outlined" className={styles.input} />
            <p>Iremos enviar o protocolo de redefinição de senha</p>
            <div className={styles.container__buttons}>
                <Button dark={false} texto='Cancelar' />
                <Button dark={true} texto='Enviar Protocolo de Redefinição' />
            </div>
        </div>
    )
}