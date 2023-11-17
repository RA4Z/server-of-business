import { Checkbox, FormControlLabel, TextField } from '@mui/material'
import { CountryDropdown, RegionDropdown } from 'react-country-region-selector';
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import styles from './Cadastro.module.scss'
import Imagem from 'images/tela-cadastro.png'
import Button from 'components/Button'

export default function Cadastro() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    const [country, setCountry] = useState('');
    const [region, setRegion] = useState('');

    const navigate = useNavigate();
    return (
        <>
            <div className={styles.container}>
                <form className={styles.container__left}>
                    <p>Criação de conta</p>
                    <TextField id="outlined-username" label="Nome completo" variant="outlined" autoComplete="username" className={styles.input} />
                    <TextField id="outlined-email" label="E-mail" variant="outlined" autoComplete="email" className={styles.input} />
                    <TextField id="outlined-password-input" label="Senha" variant="outlined" type='password' autoComplete="current-password" className={styles.input} />

                    <div className={styles.container__left__countries}>
                        <CountryDropdown
                            classes={styles.selection}
                            defaultOptionLabel='Selecionar País'
                            value={country}
                            onChange={(val) => setCountry(val)} />
                        <RegionDropdown
                            classes={styles.selection}
                            defaultOptionLabel='Selecionar Região'
                            country={country}
                            value={region}
                            onChange={(val) => setRegion(val)} />
                    </div>

                    <FormControlLabel control={<Checkbox />} label="Ao criar sua conta você estará aceitando os termos de serviço e a política de privacidade da Server of Business." className={styles.check} />
                    <Button texto='Crie sua conta' dark={true} />

                    <div className={styles.container__criar}>
                        Já possui uma conta?
                        <button onClick={() => navigate('/login')}>Login</button>
                    </div>
                </form>

                <div className={styles.container__right}>
                    <img src={Imagem} alt='Imagem representando profissões' />
                </div>
            </div>
        </>
    )
}