import { Accordion, AccordionDetails, AccordionSummary, Dialog, DialogContent, DialogTitle, Typography } from "@mui/material"
import styles from './Notifications.module.scss'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useEffect, useState } from "react";
import { getNotifications } from "services/database";
import { User_Interface } from "types/User";

interface Props {
    usuarioLogado: User_Interface
    notification: any
    setNotification: any
}

export default function Notifications(props: Props) {
    const [notificacoes, setNotificacoes] = useState<{ titulo: string, descricao: string, tipo: string, timestamp: number }[]>([])

    useEffect(() => {
        async function coletarNotifica() {
            await getNotifications(props.usuarioLogado.id, setNotificacoes)
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
                {notificacoes.map((registro, index) => (
                    <Accordion key={index}>
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel1a-content">
                            <Typography>{registro.titulo}</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Typography>
                                {registro.descricao}
                            </Typography>
                        </AccordionDetails>
                    </Accordion>
                ))}
            </DialogContent>
        </Dialog>
    )
}