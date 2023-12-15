import styles from './Chat.module.scss'
import Cancelar from 'images/cancelar.png'

interface Props {
    contatarChat: any,
    setContatarChat: any
}

export default function Chat(props: Props) {
    return (
        <>
            {props.contatarChat && <div className={styles.container}>
                <div className={styles.container__header}>
                    <li>Robert Aron Zimmermann</li>
                    <img src={Cancelar} alt='Fechar Chat' onClick={() => props.setContatarChat(false)} />
                </div>
            </div>}
        </>
    )
}