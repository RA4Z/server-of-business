import { TextField } from '@mui/material'
import styles from './Chat.module.scss'
import Cancelar from 'images/cancelar.png'
import Send from 'images/send.png'
import { useState } from 'react'
import { sendMessage } from 'services/database'
import { User_Interface } from 'types/User'

interface Props {
    idProjeto: any
    user: User_Interface
    receptor: string
    contatarChat: any,
    setContatarChat: any
}

export default function Chat(props: Props) {
    const [mensagem, setMensagem] = useState('')
    async function enviarMensagem() {
        await sendMessage(props.idProjeto, mensagem, props.user.email)
        setMensagem('')
    }
    return (
        <>
            {props.contatarChat && <div className={styles.container}>
                <div className={styles.container__header}>
                    <li>{props.receptor}</li>
                    <img src={Cancelar} alt='Fechar Chat' onClick={() => props.setContatarChat(false)} />
                </div>
                <div className={styles.container__chat}>
                    Mensagens enviadas
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