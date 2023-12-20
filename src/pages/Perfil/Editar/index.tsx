import { Checkbox, FormControl, FormControlLabel, Input, InputLabel, TextField } from '@mui/material'
import { useState } from 'react'
import styles from './Editar.module.scss'
import { CountryDropdown, RegionDropdown } from 'react-country-region-selector'
import Button from 'components/Button'
import Adicionar from '../Adicionar'
import { User_Interface } from 'types/User'
import { TextMaskCustom } from 'utils/genericos';
import { atualizarInfoUser } from 'services/firestore'

interface Props {
    visible: any,
    infoUser: User_Interface
}

export default function Editar({ visible, infoUser }: Props) {
    const [adicionar, setAdicionar] = useState(false)
    const [infoTemp, setInfoTemp] = useState({
        nome: infoUser.nome,
        cidade: infoUser.cidade,
        telefone: infoUser.telefone,
        descricao: infoUser.descricao,
        cargos: infoUser.cargos,
        pais: infoUser.pais,
        estado: infoUser.estado,
        autonomo: infoUser.autonomo,
        freelancer: infoUser.freelancer,
    })

    async function saveChanges() {
        const result = await atualizarInfoUser(infoUser.id, infoTemp)
        if (result === 'ok') {
            alert('Informações atualizadas com sucesso!')
            window.location.reload()
        } else {
            alert(`Ocorreu o erro ${result}`)
        }
    }

    const addEspecialista = (childdata: boolean) => {
        setAdicionar(childdata)
    }
    const addEspecializacao = (childdata: any) => {
        setInfoTemp({ ...infoTemp, cargos: childdata })
    }

    return (
        <>
            <div className={styles.overlay} onClick={() => visible(false)} />

            <div className={styles.container}>
                <TextField id="outlined-username" label="Nome"
                    defaultValue={infoTemp.nome}
                    onChange={e => setInfoTemp({ ...infoTemp, nome: e.target.value })}
                    variant="outlined" autoComplete="username" className={styles.input} />

                <TextField id="outlined-city" label="Cidade"
                    defaultValue={infoTemp.cidade}
                    onChange={e => setInfoTemp({ ...infoTemp, cidade: e.target.value })}
                    variant="outlined" autoComplete="city" className={styles.input__mail} />

                <FormControl>
                    <InputLabel htmlFor="outlined-formatted-text-mask-input">Telefone</InputLabel>
                    <Input
                        defaultValue={infoTemp.telefone}
                        onChange={e => setInfoTemp({ ...infoTemp, telefone: e.target.value })}
                        name="textmask"
                        className={styles.input__phone}
                        id="outlined-formatted-text-mask-input"
                        inputComponent={TextMaskCustom as any}
                    />
                </FormControl>

                <div className={styles.countries}>
                    <CountryDropdown
                        classes={styles.selection}
                        defaultOptionLabel='Selecionar País'
                        value={infoTemp.pais}
                        onChange={(val) => setInfoTemp({ ...infoTemp, pais: val })} />
                    <RegionDropdown
                        classes={styles.selection}
                        defaultOptionLabel='Selecionar Região'
                        country={infoTemp.pais}
                        value={infoTemp.estado}
                        onChange={(val) => setInfoTemp({ ...infoTemp, estado: val })} />

                    <div style={{ display: 'flex', justifyContent: 'space-evenly' }}>
                        <FormControlLabel control={<Checkbox checked={infoTemp.autonomo} onChange={e => setInfoTemp({ ...infoTemp, autonomo: e.target.checked })} />} label="Autônomo" className={styles.check} />
                        <FormControlLabel control={<Checkbox checked={infoTemp.freelancer} onChange={e => setInfoTemp({ ...infoTemp, freelancer: e.target.checked })} />} label="Freelancer" className={styles.check} />
                    </div>

                    <Button texto='Minhas Especializações' dark={false} onClick={() => setAdicionar(true)} />
                </div>
                <TextField id="outlined-multiline-static"
                    defaultValue={infoTemp.descricao}
                    onChange={e => setInfoTemp({ ...infoTemp, descricao: e.target.value })}
                    label="Sobre você" multiline rows={4} variant="outlined" autoComplete="text" className={styles.input__about} />

                <div className={styles.buttons}>
                    <Button texto='Cancelar' dark={false} onClick={() => visible(false)} />
                    <Button texto='Salvar' dark={true} onClick={() => saveChanges()} />
                </div>

                {adicionar ? <div className={styles.bloco_servicos}>
                    <Adicionar visible={addEspecialista} especialistasCadastrados={addEspecializacao} defaultList={infoTemp.cargos} />
                </div> : ''}
            </div>
        </>
    )
}
