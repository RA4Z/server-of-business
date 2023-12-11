import { Checkbox, FormControlLabel, TextField } from '@mui/material'
import { useState } from 'react'
import styles from './Solicitar.module.scss'
import Button from 'components/Button'
import Adicionar from '../Adicionar'
import { User_Interface } from 'types/User'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import dayjs from 'dayjs'

interface Props {
    visible: any,
    infoUser: User_Interface
}

export default function Solicitar({ visible, infoUser }: Props) {
    const [adicionar, setAdicionar] = useState(false)
    const [especializacoes, setEspecializacoes] = useState(['Engenheiro', 'Pedreiro'])

    const [serviceInfo, setServiceInfo] = useState({
        titulo: '',
        solicitante: infoUser.nome,
        descricao: '',
        premium: false,
        imagem: '',
        idContratado: '',
        horarioProcurado: '',
        diaProcurado: '',
        email: infoUser.email,
        cidade: '',
        freelancer: false,
        autonomo: false,
        inscritos: [],
        cargos: [],
    })

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
                {adicionar ? <div className={styles.bloco_servicos}>
                    <Adicionar visible={addEspecialista} especialistasCadastrados={addEspecializacao} defaultList={especializacoes} />
                </div> : ''}
                <div className={styles.lados}>

                    <div className={styles.left}>
                        <TextField id="outlined-solicitation-title"
                            value={serviceInfo.titulo}
                            onChange={e => setServiceInfo({ ...serviceInfo, titulo: e.target.value })}
                            label="Título da solicitação" variant="outlined" autoComplete="title" className={styles.input} />

                        <TextField id="outlined-solicitation-username"
                            value={infoUser.nome}
                            onChange={e => setServiceInfo({ ...serviceInfo, solicitante: e.target.value })}
                            label="Nome do solicitante" variant="outlined" autoComplete="username" className={styles.input} />

                        <TextField id="outlined-solicitation-description"
                            value={serviceInfo.descricao}
                            onChange={e => setServiceInfo({ ...serviceInfo, descricao: e.target.value })}
                            label="Descrição sobre a solicitação" multiline rows={8} variant="outlined" autoComplete="text" className={styles.input} />
                    </div>

                    <div className={styles.right}>
                        <Button texto='Possíveis Especializações' dark={false} onClick={() => setAdicionar(true)} />

                        <LocalizationProvider dateAdapter={AdapterDayjs} >
                            <div className={styles.input__dateTime}>
                                <DateTimePicker
                                    label="Data e hora desejados"
                                    defaultValue={null}
                                    onChange={e => setServiceInfo({
                                        ...serviceInfo,
                                        diaProcurado: dayjs(e).format('YYYY-MM-DD').toString(),
                                        horarioProcurado: dayjs(e).format('HH:MM').toString()
                                    })} />
                            </div>
                        </LocalizationProvider>

                        <div className={styles.right__local}>Localização</div>
                        <>
                            <FormControlLabel control={<Checkbox checked={serviceInfo.autonomo} onChange={e => setServiceInfo({ ...serviceInfo, autonomo: e.target.checked })} />} label="Autônomo" className={styles.check} />
                            <FormControlLabel control={<Checkbox checked={serviceInfo.freelancer} onChange={e => setServiceInfo({ ...serviceInfo, freelancer: e.target.checked })} />} label="Freelancer" className={styles.check} />
                        </>
                    </div>
                </div>
                <Button texto='Abrir Solicitação' dark={true} />
            </div>
        </>
    )
}