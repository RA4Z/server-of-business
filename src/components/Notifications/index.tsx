import { Accordion, AccordionDetails, AccordionSummary, CircularProgress, Dialog, DialogContent, DialogTitle, Typography } from "@mui/material"
import styles from './Notifications.module.scss'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useEffect, useState } from "react";
import { getNotifications } from "services/database";
import { User_Interface } from "types/User";
import classNames from "classnames";
import TextoTitulos from "components/TextoTitulos";

interface Props {
    usuarioLogado: User_Interface
    notification: any
    setNotification: any
}

export default function Notifications(props: Props) {
    const [notificacoes, setNotificacoes] = useState<{ titulo: string, descricao: string, tipo: string, timestamp: number }[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        async function coletarNotifica() {
            await getNotifications(props.usuarioLogado.id, setNotificacoes)
            setLoading(false)
        }
        coletarNotifica()
    }, [props.usuarioLogado.id])

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
                                    <Typography>
                                        {registro.descricao}
                                    </Typography>
                                </AccordionDetails>
                            </Accordion>
                        )) : <TextoTitulos>Não há notificações a serem visualizadas!</TextoTitulos>}
                    </>
                }

            </DialogContent>
        </Dialog>
    )
}