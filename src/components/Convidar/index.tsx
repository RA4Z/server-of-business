import { Accordion, AccordionDetails, AccordionSummary, CircularProgress, Dialog, DialogContent, DialogTitle, Snackbar, Typography } from '@mui/material'
import styles from './Convidar.module.scss'
import TextoTitulos from 'components/TextoTitulos'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Service_Interface, User_Interface } from 'types/User';
import { useEffect, useState } from 'react';
import { infoSolicitados } from 'services/firestore';
import AddAlertIcon from '@mui/icons-material/AddAlert';

interface Props {
    usuarioLogado: User_Interface
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
            await infoSolicitados(props.usuarioLogado.email, setSolicitados)
            setLoading(false)
        }
        Solicitar()
    }, [props.usuarioLogado.email])

    async function inviteUser() {
        console.log('Convidar usuário')
    }

    return (
        <Dialog
            open={props.show}
            onClose={() => props.setShow(false)}
            style={{ textAlign: 'center' }}>
            <DialogTitle>
                {`Solicitações em aberto`}
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
                                        <AddAlertIcon onClick={() => inviteUser()} titleAccess='Convidar usuário para o serviço'
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
                message={statusToast.message}
            />
        </Dialog>
    )
}