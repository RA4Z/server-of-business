import { FormControl, Input, InputLabel, TextField } from '@mui/material'
import { useState } from 'react'
import styles from './Editar.module.scss'
import { CountryDropdown, RegionDropdown } from 'react-country-region-selector'
import Button from 'components/Button'
import Adicionar from '../Adicionar'
import { User_Interface } from 'types/User'
import { TextMaskCustom } from 'services/genericos';

interface Props {
    visible: any,
    infoUser: User_Interface
}

export default function Editar({ visible, infoUser }: Props) {
    const [adicionar, setAdicionar] = useState(false)
    const [infoTemp, setInfoTemp] = useState({
        nome: infoUser.nome,
        email: infoUser.email,
        telefone: infoUser.telefone,
        descricao: infoUser.descricao,
        especializacoes: infoUser.cargos,
        pais: infoUser.pais,
        estado: infoUser.estado,
    })

    const addEspecialista = (childdata: boolean) => {
        setAdicionar(childdata)
    }
    const addEspecializacao = (childdata: any) => {
        setInfoTemp({ ...infoTemp, especializacoes: childdata })
    }

    return (
        <>
            <div className={styles.overlay} onClick={() => visible(false)} />

            <div className={styles.container}>
                <TextField id="outlined-username" label="Nome"
                    defaultValue={infoTemp.nome}
                    onChange={e => setInfoTemp({ ...infoTemp, nome: e.target.value })}
                    variant="outlined" autoComplete="username" className={styles.input} />

                <TextField id="outlined-email" label="E-mail"
                    defaultValue={infoTemp.email}
                    onChange={e => setInfoTemp({ ...infoTemp, email: e.target.value })}
                    variant="outlined" autoComplete="email" className={styles.input__mail} />

                <FormControl>
                    <InputLabel htmlFor="outlined-formatted-text-mask-input">Telefone</InputLabel>
                    <Input
                        defaultValue={infoTemp.telefone}
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
                    <Button texto='Minhas Especializações' dark={false} onClick={() => setAdicionar(true)} />
                </div>
                <TextField id="outlined-multiline-static"
                    defaultValue={infoTemp.descricao}
                    onChange={e => setInfoTemp({ ...infoTemp, descricao: e.target.value })}
                    label="Sobre você" multiline rows={4} variant="outlined" autoComplete="text" className={styles.input__about} />

                <div className={styles.buttons}>
                    <Button texto='Cancelar' dark={false} onClick={() => visible(false)} />
                    <Button texto='Salvar' dark={true} />
                </div>

                {adicionar ? <div className={styles.bloco_servicos}>
                    <Adicionar visible={addEspecialista} especialistasCadastrados={addEspecializacao} defaultList={infoTemp.especializacoes} />
                </div> : ''}
            </div>
        </>
    )
}
