import { TextField } from '@mui/material'
import styles from './Chat.module.scss'
import Cancelar from 'images/cancelar.png'
import Send from 'images/send.png'
import { useEffect, useState } from 'react'
import { getMessages, sendMessage } from 'services/database'
import { User_Interface } from 'types/User'

interface Props {
    idProjeto: any,
    user: User_Interface,
    receptor: string,
    contatarChat: any,
    setContatarChat: any,
    mensagens: { enviadoPor: string, mensagem: string, timestamp: number }[],
    setMensagens: any
}

export default function Chat(props: Props) {
    const [historico, setHistorico] = useState(props.mensagens)
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
        <div className={styles.container}>
            {props.contatarChat && <div className={styles.container}>
                <div className={styles.container__header}>
                    <li>{props.receptor}</li>
                    <img src={Cancelar} alt='Fechar Chat' onClick={() => props.setContatarChat(false)} />
                </div>
                <div id='texto_chat' className={styles.container__chat}>
                    {historico.map((message, index) => (
                        <>
                            {message.enviadoPor === props.user.email ?
                                <li className={styles.enviada} key={index}>{message.mensagem}</li>
                                :
                                <li className={styles.recebida} key={index}>{message.mensagem}</li>}
                        </>
                    ))}
                </div>
                <div className={styles.sendMessage}>
                    <TextField
                        id="text-chat"
                        label="Escrever mensagem"
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

                    <img
                        src={Send}
                        alt='Enviar mensagem'
                        onClick={() => {
                            if (mensagem.trim() !== '') {
                                enviarMensagem();
                            }
                        }}
                    />
                </div>
            </div>}
        </div>
    )
}