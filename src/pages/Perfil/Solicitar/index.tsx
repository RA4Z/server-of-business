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
import { cadastrarSolicitacao } from 'services/firestore'
import { CountryDropdown, RegionDropdown } from 'react-country-region-selector'
import Snackbar from '@mui/material/Snackbar';
import { timeout, verificarSolicitacaoValida } from 'utils/common'

interface Props {
    visible: any,
    infoUser: User_Interface
    setLoad: any
}

export default function Solicitar({ visible, infoUser, setLoad }: Props) {
    const [adicionar, setAdicionar] = useState(false)
    const [statusToast, setStatusToast] = useState({
        visivel: false,
        message: ''
    })
    const [serviceInfo, setServiceInfo] = useState({
        titulo: '',
        idSolicitante: infoUser.id,
        solicitante: infoUser.nome,
        descricao: '',
        premium: infoUser.premium,
        imagem: '',
        idContratado: '',
        horarioProcurado: '',
        diaProcurado: '',
        email: infoUser.email,
        pais: infoUser.pais,
        estado: infoUser.estado,
        cidade: infoUser.cidade,
        endereco: '',
        freelancer: false,
        autonomo: false,
        inscritos: [],
        cargos: [],
    })

    async function cadastrar() {
        const verifica = verificarSolicitacaoValida({ ...serviceInfo, id: '' })
        if (verifica !== '') {
            setStatusToast({ message: verifica, visivel: true })
            return
        }
        setLoad(true)
        const response = await cadastrarSolicitacao(serviceInfo)
        setLoad(false)
        if (response === 'erro') {
            setStatusToast({ message: 'Ocorreu algum erro ao tentar cadastrar a solicitação!', visivel: true })
        } else {
            setStatusToast({ message: 'Solicitação cadastrada com sucesso!', visivel: true })
            await timeout(1000);
            window.location.reload()
        }
    }

    const addEspecialista = (childdata: boolean) => {
        setAdicionar(childdata)
    }
    const addEspecializacao = (childdata: any) => {
        setServiceInfo({ ...serviceInfo, cargos: childdata })
    }
    return (
        <>
            <div className={styles.overlay} onClick={() => visible(false)} />
            <div className={styles.container}>
                {adicionar ? <div className={styles.bloco_servicos}>
                    <Adicionar visible={addEspecialista} especialistasCadastrados={addEspecializacao} defaultList={serviceInfo.cargos} />
                </div> : ''}
                <div className={styles.lados}>

                    <div className={styles.left}>
                        <TextField id="outlined-solicitation-title"
                            value={serviceInfo.titulo}
                            onChange={e => setServiceInfo({ ...serviceInfo, titulo: e.target.value })}
                            label="Título da solicitação" variant="outlined" className={styles.input} />

                        <TextField id="outlined-solicitation-username"
                            value={infoUser.nome}
                            onChange={e => setServiceInfo({ ...serviceInfo, solicitante: e.target.value })}
                            label="Nome do solicitante" variant="outlined" className={styles.input} />

                        <TextField id="outlined-solicitation-description"
                            value={serviceInfo.descricao}
                            onChange={e => setServiceInfo({ ...serviceInfo, descricao: e.target.value })}
                            label="Descrição sobre a solicitação" multiline rows={8} variant="outlined" className={styles.input} />
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
                                        horarioProcurado: dayjs(e).format('HH:mm').toString()
                                    })} />
                            </div>
                        </LocalizationProvider>

                        <div className={styles.right__local}>
                            <p>Informações sobre a Localização...</p>

                            <div className={styles.right__local__countries}>
                                <CountryDropdown
                                    classes={styles.selection}
                                    defaultOptionLabel='Selecionar País'
                                    value={serviceInfo.pais}
                                    onChange={(val) => setServiceInfo({ ...serviceInfo, pais: val })} />
                                <RegionDropdown
                                    classes={styles.selection}
                                    defaultOptionLabel='Selecionar Região'
                                    country={serviceInfo.pais}
                                    value={serviceInfo.estado}
                                    onChange={(val) => setServiceInfo({ ...serviceInfo, estado: val })} />
                            </div>
                            <TextField id="outlined-solicitation-city"
                                value={serviceInfo.cidade}
                                onChange={e => setServiceInfo({ ...serviceInfo, cidade: e.target.value })}
                                label="Cidade" variant="outlined" autoComplete="city" className={styles.input} />

                            <TextField id="outlined-solicitation-address"
                                value={serviceInfo.endereco}
                                onChange={e => setServiceInfo({ ...serviceInfo, endereco: e.target.value })}
                                label="Endereço" variant="outlined" autoComplete="address" className={styles.input} />

                        </div>
                        <>
                            <FormControlLabel control={<Checkbox checked={serviceInfo.autonomo} onChange={e => setServiceInfo({ ...serviceInfo, autonomo: e.target.checked })} />} label="Autônomo" className={styles.check} />
                            <FormControlLabel control={<Checkbox checked={serviceInfo.freelancer} onChange={e => setServiceInfo({ ...serviceInfo, freelancer: e.target.checked })} />} label="Freelancer" className={styles.check} />
                        </>
                    </div>
                </div>
                <Button onClick={() => cadastrar()} texto='Abrir Solicitação' dark={true} />
            </div>
            <Snackbar
                open={statusToast.visivel}
                onClose={() => setStatusToast({ ...statusToast, visivel: false })}
                autoHideDuration={3000}
                message={statusToast.message}
            />
        </>
    )
}