import { Accordion, AccordionDetails, AccordionSummary, CircularProgress, Dialog, DialogContent, DialogTitle, Rating, Snackbar, Typography } from "@mui/material"
import styles from './Notifications.module.scss'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useEffect, useState } from "react";
import { deleteNotification, getNotifications } from "services/database";
import { User_Interface } from "types/User";
import classNames from "classnames";
import TextoTitulos from "components/TextoTitulos";
import DeleteIcon from '@mui/icons-material/Delete';
import { useNavigate } from "react-router-dom";
import Button from "components/Button";
import { atualizarInfoService, atualizarInfoUser } from "services/firestore";

interface Props {
    usuarioLogado: User_Interface
    notification: any
    setNotification: any
}

export default function Notifications(props: Props) {
    const navigate = useNavigate()
    const [notificacoes, setNotificacoes] = useState<{ id: any, titulo: string, descricao: string, tipo: string, timestamp: number, idService?: string, avaliacoes?: number, estrelas?: number, idContratante?: string }[]>([])
    const [avaliacao, setAvaliacao] = useState<number | null>(5)
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

    async function conviteTrabalho(idNotificacao: string, direcionamento: string, index: number) {
        let response = 'ok'
        if (direcionamento === 'aceitar') {
            response = await atualizarInfoService(notificacoes[index].idService!, { idContratado: props.usuarioLogado.id })
        }
        if(response === 'ok') await deletarNotificacao(idNotificacao)
    }

    function acessarService(path: string) {
        navigate(path)
        props.setNotification(false)
    }

    async function avaliarUser(idNotificacao: string, index: number) {
        if (avaliacao === 0 || avaliacao === null) {
            setStatusToast({ message: 'Não é permitido dar nota zero ao Especialista contratado!', visivel: true })
            return
        }
        setNotificacoes(notificacoes.filter(especial => especial.id !== idNotificacao))
        const result = await deleteNotification(props.usuarioLogado.id, idNotificacao)
        if (!result) {
            setStatusToast({ message: 'Ocorreu algum erro ao tentar avaliar! Tente novamente mais tarde', visivel: true })
            return
        }
        if (notificacoes[index].estrelas !== undefined && notificacoes[index].avaliacoes !== undefined) {
            const numeroAvalia = Number((((notificacoes[index].estrelas! * notificacoes[index].avaliacoes!) + avaliacao) / (notificacoes[index].avaliacoes! + 1)).toFixed(2))
            await atualizarInfoUser(notificacoes[index].idContratante!, { avaliacoes: notificacoes[index].avaliacoes! + 1, estrelas: numeroAvalia })
        }
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
                                            {registro.tipo === 'concluido' &&
                                                <>
                                                    <div style={{ fontWeight: 'bold' }}>Por favor, avalie o Usuário Contratante</div>
                                                    <Rating
                                                        className={styles.star}
                                                        name="hover-feedback"
                                                        value={avaliacao}
                                                        onChange={(e, newValue) => setAvaliacao(newValue)}
                                                        precision={1}
                                                        size='large'
                                                    />
                                                </>}
                                            {registro.tipo === 'convite' &&
                                                <div className={styles.btnConvite}>
                                                    <Button texto='Aceitar' dark={true} onClick={() => conviteTrabalho(registro.id, 'aceitar', index)} />
                                                    <Button texto='Rejeitar' dark={false} onClick={() => conviteTrabalho(registro.id, 'rejeitar', index)} />
                                                </div>
                                            }
                                        </div>
                                        {registro.tipo === 'concluido' ?
                                            <div className={styles.textoDescritivo__delete}>
                                                <Button texto='Avaliar' dark={false} onClick={() => avaliarUser(registro.id, index)} />
                                            </div>
                                            :
                                            <>
                                                {registro.tipo !== 'convite' && <DeleteIcon titleAccess='Apagar Notificação' fontSize="large" onClick={() => deletarNotificacao(registro.id)} className={styles.textoDescritivo__delete} />}
                                            </>
                                        }
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