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
    async function enviarMensagem() {
        await sendMessage(props.idProjeto, mensagem, props.user.email)
        setMensagem('')
    }

    useEffect(() => {
        async function fetchData() {
            if (props.mensagens.length === 0) {
                try {
                    await getMessages(`chats/${props.idProjeto}`, setHistorico, props.setMensagens)
                } catch (error) {
                    console.error('Erro ao buscar mensagens:', error);
                }
            }
        }
        fetchData();
    }, [props]);
    return (
        <>
            {props.contatarChat && <div className={styles.container}>
                <div className={styles.container__header}>
                    <li>{props.receptor}</li>
                    <img src={Cancelar} alt='Fechar Chat' onClick={() => props.setContatarChat(false)} />
                </div>
                <div className={styles.container__chat}>
                    {historico.map((message, index) => (
                        <div key={index}>{message.mensagem}</div>
                    ))}
                </div>
                <div className={styles.sendMessage}>
                    <TextField id="text-chat"
                        label="Escrever mensagem"
                        value={mensagem}
                        onChange={e => setMensagem(e.target.value)}
                        multiline
                        maxRows={4}
                        className={styles.input}
                    />
                    <img src={Send} alt='Enviar mensagem' onClick={() => enviarMensagem()} />
                </div>
            </div>}
        </>
    )
}