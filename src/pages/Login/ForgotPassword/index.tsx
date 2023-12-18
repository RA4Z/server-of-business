import { Snackbar, TextField } from '@mui/material'
import styles from './ForgotPassword.module.scss'
import Logo from 'images/logo.svg'
import Button from 'components/Button'
import { emailRedefinirSenha } from 'services/requisitions'
import { useState } from 'react'

export default function ForgotPassword({ visible, childToParent }: any) {
    const [email, setEmail] = useState('')
    const [statusToast, setStatusToast] = useState({ visivel: false, message: '' })

    async function enviarProtocolo() {
        const result = await emailRedefinirSenha(email)
        if (result) {
            setStatusToast({ visivel: true, message: 'Iremos enviar o protocolo de redefinição de senha ao seu endereço de E-mail' })
        } else {
            setStatusToast({ visivel: true, message: 'Ocorreu algum erro, tente novamente mais tarde!' })
        }
    }
    return (
        <>
            {visible ?
                <>
                    <div className={styles.overlay} onClick={() => childToParent(false)} />
                    <div className={styles.container}>
                        <img src={Logo} alt='Logotipo Server of Business' />
                        <p>Insira seu E-mail abaixo</p>
                        <TextField id="outlined-email"
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                            label="E-mail" variant="outlined" autoComplete="email" className={styles.input} />
                        <p>Iremos enviar o protocolo de redefinição de senha</p>
                        <div className={styles.container__buttons}>
                            <Button dark={false} texto='Cancelar' onClick={() => childToParent(false)} />
                            <Button dark={true} texto='Enviar Protocolo de Redefinição' onClick={() => enviarProtocolo()} />
                        </div>
                    </div>
                    <Snackbar
                        open={statusToast.visivel}
                        onClose={() => setStatusToast({ ...statusToast, visivel: false })}
                        autoHideDuration={3000}
                        message={statusToast.message}
                    />
                </>
                : ''}
        </>
    )
}