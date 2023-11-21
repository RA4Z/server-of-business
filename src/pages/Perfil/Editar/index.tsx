import { Checkbox, FormControlLabel, TextField } from '@mui/material'
import { useEffect, useRef, useState } from 'react'
import styles from './Editar.module.scss'
import { CountryDropdown, RegionDropdown } from 'react-country-region-selector'
import Button from 'components/Button'
import Adicionar from '../Adicionar'

export default function Editar({ visible }: any) {
    const wrapperRef = useRef(null);
    useOutsideAlerter(wrapperRef);
    const [showEspecialista, setShowEspecialista] = useState(false)
    const [adicionar, setAdicionar] = useState(false)
    const [country, setCountry] = useState('')
    const [region, setRegion] = useState('')

    function useOutsideAlerter(ref: any) {
        useEffect(() => {
            function handleClickOutside(event: any) {
                if (ref.current && !ref.current.contains(event.target)) {
                    setShowEspecialista(false)
                }
            }
            document.addEventListener("mousedown", handleClickOutside);
            return () => {
                document.removeEventListener("mousedown", handleClickOutside);
            };
        }, [ref]);
    }

    const addEspecialista = (childdata: boolean) => {
        setAdicionar(childdata)
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
                    <Button texto='Configurações Especialista' dark={false} onClick={() => setShowEspecialista(true)} />
                </div>
                <TextField id="outlined-multiline-static" label="Sobre você" multiline rows={4} variant="outlined" autoComplete="text" className={styles.input__about} />

                <div className={styles.buttons}>
                    <Button texto='Cancelar' dark={false} onClick={() => visible(false)} />
                    <Button texto='Salvar' dark={true} />
                </div>

                {showEspecialista ? <div ref={wrapperRef} className={styles.bloco_servicos}>
                    <TextField id="outlined-especialist" label="Especialista?" variant="outlined" autoComplete="yes/no" className={styles.bloco_servicos__input} />
                    <Button dark={false} texto='Especializações' onClick={() => setAdicionar(true)} />
                    <TextField id="outlined-hour-value" label="Valor hora" variant="outlined" autoComplete="money" className={styles.bloco_servicos__input} />
                    <TextField id="outlined-exibition" label="Em exibição" variant="outlined" autoComplete="exibition" className={styles.bloco_servicos__input} />
                    <>
                        <FormControlLabel control={<Checkbox />} label="Autônomo" className={styles.check} />
                        <FormControlLabel control={<Checkbox />} label="Freelancer" className={styles.check} />
                    </>
                </div> : ''}
                {adicionar ? <div className={styles.bloco_servicos}>
                    <Adicionar visible={addEspecialista} />
                </div> : ''}
            </div>
        </>
    )
}
