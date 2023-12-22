import { Accordion, AccordionDetails, AccordionSummary, CircularProgress, Dialog, DialogContent, DialogTitle, Snackbar, Typography } from "@mui/material"
import styles from './Notifications.module.scss'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useEffect, useState } from "react";
import { deleteNotification, getNotifications } from "services/database";
import { User_Interface } from "types/User";
import classNames from "classnames";
import TextoTitulos from "components/TextoTitulos";
import DeleteIcon from '@mui/icons-material/Delete';
import { useNavigate } from "react-router-dom";

interface Props {
    usuarioLogado: User_Interface
    notification: any
    setNotification: any
}

export default function Notifications(props: Props) {
    const navigate = useNavigate()
    const [notificacoes, setNotificacoes] = useState<{ id: any, titulo: string, descricao: string, tipo: string, timestamp: number, idService?: string }[]>([])
    const [loading, setLoading] = useState(true)
    const [statusToast, setStatusToast] = useState({
        visivel: false,
        message: ''
    })

    useEffect(() => {
        async function coletarNotifica() {
            await getNotifications(props.usuarioLogado.id, setNotificacoes)
            setLoading(false)
        }
        coletarNotifica()
    }, [props.usuarioLogado.id])

    async function deletarNotificacao(idNotificacao: string) {
        setNotificacoes(notificacoes.filter(especial => especial.id !== idNotificacao))
        const result = await deleteNotification(props.usuarioLogado.id, idNotificacao)
        if (!result) {
            setStatusToast({ message: 'Ocorreu algum erro ao tentar deletar! Tente novamente mais tarde', visivel: true })
        }
    }

    function acessarService(path: string) {
        navigate(path)
        props.setNotification(false)
    }

    return (
        <Dialog
            open={props.notification}
            onClose={() => props.setNotification(false)}
            style={{ textAlign: 'center' }}>
            <DialogTitle>
                {`Caixa de Entrada de Notificações`}
            </DialogTitle>
            <DialogContent className={styles.caixa}>
                {loading ? <CircularProgress color="inherit" /> :
                    <>
                        {notificacoes.length > 0 ? notificacoes.map((registro, index) => (
                            <Accordion key={index}>
                                <AccordionSummary
                                    expandIcon={<ExpandMoreIcon />}
                                    aria-controls="panel1a-content">
                                    <Typography className={classNames(
                                        [styles['titulo']],
                                        styles[`titulo__${registro.tipo}`])}>{registro.titulo}</Typography>
                                </AccordionSummary>
                                <AccordionDetails>
                                    <Typography className={styles.textoDescritivo}>
                                        <div>
                                            <li>{registro.descricao}</li>
                                            {registro.idService !== undefined && <li className={styles.textoDescritivo__link} onClick={() => acessarService(`/info/services/${registro.idService}`)}>Acessar o serviço correspondente</li>}
                                        </div>
                                        <DeleteIcon titleAccess='Apagar Notificação' fontSize="large" onClick={() => deletarNotificacao(registro.id)} className={styles.textoDescritivo__delete} />
                                    </Typography>
                                </AccordionDetails>
                            </Accordion>
                        )) : <TextoTitulos>Não há notificações a serem visualizadas!</TextoTitulos>}
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