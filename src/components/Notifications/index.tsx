import { Accordion, AccordionDetails, AccordionSummary, Dialog, DialogContent, DialogTitle, Typography } from "@mui/material"
import styles from './Notifications.module.scss'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

interface Props {
    notification: any
    setNotification: any
    registrados: [{ titulo: string, descricao: string, link: string }]
}

export default function Notifications(props: Props) {
    return (
        <Dialog
            open={props.notification}
            onClose={() => props.setNotification(false)}
            style={{ textAlign: 'center' }}>
            <DialogTitle>
                {`Caixa de Entrada de Notificações`}
            </DialogTitle>
            <DialogContent className={styles.caixa}>
                {props.registrados.map((registro, index) => (
                    <Accordion key={index}>
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel1a-content"
                        >
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