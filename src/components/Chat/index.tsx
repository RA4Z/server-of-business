import { Dialog, TextField } from '@mui/material'
import styles from './Chat.module.scss'
import Cancelar from '@mui/icons-material/Close';
import Send from '@mui/icons-material/Send';
import { useEffect, useState } from 'react'
import { getMessages, sendMessage } from 'services/database'
import { User_Interface } from 'types/User'
import dayjs from 'dayjs'

interface Props {
    idProjeto: any,
    user: User_Interface,
    receptor: string,
    contatarChat: any,
    setContatarChat: any,
}

export default function Chat(props: Props) {
    const [historico, setHistorico] = useState<{ enviadoPor: string, mensagem: string, timestamp: number }[]>([])
    const [mensagem, setMensagem] = useState('')
    const chatElement = document.querySelector('#texto_chat');

    async function enviarMensagem() {
        if (mensagem !== '') {
            await sendMessage(props.idProjeto, mensagem, props.user.email)
            if (chatElement) chatElement.scrollTop = chatElement.scrollHeight;
        }
        setMensagem('')
    }

    useEffect(() => {
        if (historico.length > 0) {
            if (chatElement) chatElement.scrollTop = chatElement.scrollHeight;
        }
    }, [historico, chatElement])

    useEffect(() => {
        async function fetchData() {
            try {
                await getMessages(`chats/${props.idProjeto}`, setHistorico)
            } catch (error) {
                console.error('Erro ao buscar mensagens:', error);
            }
        }
        fetchData();
    }, [props]);
    return (
        <>
            <Dialog open={true} style={{ zIndex: '5' }} onClose={() => props.setContatarChat(false)}>
                <div className={styles.container}>
                    {props.contatarChat && <div className={styles.container}>
                        <div className={styles.container__header}>
                            <li>{props.receptor}</li>
                            <Cancelar fontSize='large' onClick={() => props.setContatarChat(false)} className={styles.container__header__close} />
                        </div>
                        <div id='texto_chat' className={styles.container__chat}>
                            {historico.map((message, index) => (
                                <>
                                    <div className={message.enviadoPor === props.user.email ? styles.enviada : styles.recebida} key={index}>
                                        <li>{message.mensagem}</li>
                                        <li className={message.enviadoPor === props.user.email ? styles.enviada__chat : styles.recebida__chat}>
                                            {dayjs(new Date(message.timestamp)).isBefore(dayjs(), 'day') ?
                                                dayjs(new Date(message.timestamp).toString()).format('DD MMM YY - HH:mm:ss')
                                                :
                                                dayjs(new Date(message.timestamp).toString()).format('HH:mm:ss')}</li>
                                    </div>
                                </>
                            ))}
                        </div>
                        <div className={styles.sendMessage}>
                            <TextField
                                id="text-chat"
                                label="Escrever mensagem"
                                type='text'
                                value={mensagem}
                                onChange={(e) => setMensagem(e.target.value)}
                                multiline
                                maxRows={4}
                                className={styles.input}
                                onKeyDown={(e) => {
                                    if (e.key === 'Enter' && !e.shiftKey) {
                                        e.preventDefault();
                                        enviarMensagem();
                                    }
                                }}
                            />

                            <Send
                                fontSize='large'
                                className={styles.send}
                                onClick={() => {
                                    if (mensagem.trim() !== '') {
                                        enviarMensagem();
                                    }
                                }}
                            />
                        </div>
                    </div>}
                </div>
            </Dialog>
        </>
    )
}