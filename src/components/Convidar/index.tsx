import { Accordion, AccordionDetails, AccordionSummary, CircularProgress, Dialog, DialogContent, DialogTitle, Snackbar, Typography } from '@mui/material'
import styles from './Convidar.module.scss'
import TextoTitulos from 'components/TextoTitulos'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Service_Interface, User_Interface } from 'types/User';
import { useEffect, useState } from 'react';
import { infoProjetosNaoContratados } from 'services/firestore';
import AddAlertIcon from '@mui/icons-material/AddAlert';
import { sendNotification } from 'services/database';

interface Props {
    usuarioLogado: User_Interface
    usuarioAlvoId: any
    show: any,
    setShow: any
}

export default function Convidar(props: Props) {
    const [solicitados, setSolicitados] = useState<Service_Interface[]>([])
    const [loading, setLoading] = useState(true)
    const [statusToast, setStatusToast] = useState({
        visivel: false,
        message: ''
    })

    useEffect(() => {
        async function Solicitar() {
            await infoProjetosNaoContratados(props.usuarioLogado.email, setSolicitados)
            setLoading(false)
        }
        Solicitar()
    }, [props.usuarioLogado.email])

    async function inviteUser(service: Service_Interface) {
        await sendNotification(props.usuarioAlvoId, `Convite de Serviço`,
            `O usuário ${props.usuarioLogado.nome} te convidou para o serviço "${service.titulo}"!`,
            'convite', service.id)
        setStatusToast({ visivel: true, message: 'Usuário convidado com sucesso!' })
    }

    return (
        <Dialog
            open={props.show}
            onClose={() => props.setShow(false)}
            style={{ textAlign: 'center' }}>
            <DialogTitle>
                {`Convidar usuário para serviço`}
            </DialogTitle>
            <DialogContent className={styles.caixa}>
                {loading ? <CircularProgress color="inherit" /> :
                    <>
                        {solicitados.length > 0 ? solicitados.map((registro, index) => (
                            <Accordion key={index}>
                                <AccordionSummary
                                    expandIcon={<ExpandMoreIcon />}
                                    aria-controls="panel1a-content">
                                    <Typography>{registro.titulo}</Typography>
                                </AccordionSummary>
                                <AccordionDetails>
                                    <Typography className={styles.cargos}>
                                        <li>{registro.descricao}</li>
                                        <AddAlertIcon onClick={() => inviteUser(registro)} titleAccess='Convidar usuário para o serviço'
                                            fontSize='large' className={styles.cargos__invite} />
                                        <div className={styles.cargos__container}>
                                            {registro.cargos.map((cargo, index) => (
                                                <div className={styles.cargos__especializacao} key={index}>
                                                    <li>{cargo}</li>
                                                </div>
                                            ))}
                                        </div>
                                    </Typography>
                                </AccordionDetails>
                            </Accordion>
                        )) : <TextoTitulos>Não há solicitações a serem visualizadas!</TextoTitulos>}
                    </>
                }

            </DialogContent>
            <Snackbar
                open={statusToast.visivel}
                onClose={() => setStatusToast({ ...statusToast, visivel: false })}
                autoHideDuration={3000}
                message={statusToast.message} />
        </Dialog>
    )
}