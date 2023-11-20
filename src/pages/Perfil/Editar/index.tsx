import { TextField } from '@mui/material'
import { useState } from 'react'
import styles from './Editar.module.scss'
import { CountryDropdown, RegionDropdown } from 'react-country-region-selector'
import Button from 'components/Button'

export default function Editar({ visible }: any) {
    const [country, setCountry] = useState('')
    const [region, setRegion] = useState('')

    if (visible) {
        document.body.style.overflow = "hidden";
    }
    function sair() {
        document.body.style.overflow = "visible";
        visible(false)
    }
    return (
        <>
            <div className={styles.overlay} onClick={() => sair()} />
            <div className={styles.container}>
                <TextField id="outlined-username" label="Nome" variant="outlined" autoComplete="username" className={styles.input} />
                <TextField id="outlined-email" label="E-mail" variant="outlined" autoComplete="email" className={styles.input} />
                <div className={styles.countries}>
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
                <TextField id="outlined-about" label="Sobre você" variant="outlined" autoComplete="text" className={styles.input} />
                <Button texto='Cancelar' dark={false} onClick={() => sair()} />
                <Button texto='Salvar' dark={true} />
            </div>
        </>
    )
}
