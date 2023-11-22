import { TextField } from '@mui/material'
import { useState } from 'react'
import styles from './Editar.module.scss'
import { CountryDropdown, RegionDropdown } from 'react-country-region-selector'
import Button from 'components/Button'
import Adicionar from '../Adicionar'

export default function Editar({ visible }: any) {
    const [especializacoes, setEspecializacoes] = useState([])
    const [adicionar, setAdicionar] = useState(false)
    const [country, setCountry] = useState('')
    const [region, setRegion] = useState('')

    const addEspecialista = (childdata: boolean) => {
        setAdicionar(childdata)
    }
    const addEspecializacao = (childdata: any) => {
        setEspecializacoes(childdata)
    }

    return (
        <>
            <div className={styles.overlay} onClick={() => visible(false)} />
            <div className={styles.container}>
                <TextField id="outlined-username" label="Nome" variant="outlined" autoComplete="username" className={styles.input} />
                <TextField id="outlined-email" label="E-mail" variant="outlined" autoComplete="email" className={styles.input__mail} />
                <TextField id="outlined-phone" label="Telefone" variant="outlined" autoComplete="phone" className={styles.input__phone} />
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
                    <Button texto='Minhas Especializações' dark={false} onClick={() => setAdicionar(true)} />
                </div>
                <TextField id="outlined-multiline-static" label="Sobre você" multiline rows={4} variant="outlined" autoComplete="text" className={styles.input__about} />

                <div className={styles.buttons}>
                    <Button texto='Cancelar' dark={false} onClick={() => visible(false)} />
                    <Button texto='Salvar' dark={true} />
                </div>

                {adicionar ? <div className={styles.bloco_servicos}>
                    <Adicionar visible={addEspecialista} especialistasCadastrados={addEspecializacao} defaultList={especializacoes} />
                </div> : ''}
            </div>
        </>
    )
}
