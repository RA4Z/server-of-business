import { Checkbox, FormControlLabel, TextField } from '@mui/material'
import styles from './Cadastro.module.scss'
import Imagem from 'images/tela-cadastro.jpg'
import Header from 'components/Header'
import Button from 'components/Button'

export default function Cadastro() {
    return (
        <>
            <Header />
            <div className={styles.container}>
                <form className={styles.container__left}>
                    <TextField id="outlined-basic" label="Nome completo" variant="outlined" className={styles.input} />
                    <TextField id="outlined-basic" label="E-mail" variant="outlined" className={styles.input} />
                    <TextField id="outlined-password-input" label="Senha" variant="outlined" type='password' autoComplete="current-password" className={styles.input} />

                    <FormControlLabel control={<Checkbox />} label="Ao criar sua conta você estará aceitando os termos de serviço e a política de privacidade da Server of Business." className={styles.check} />
                    <Button texto='Crie sua conta' dark={true} />
                </form>
                <div className={styles.container__right}>
                    <img src={Imagem} alt='Imagem representando profissões' />
                </div>
            </div>
        </>
    )
}