import UserImg from 'images/user.png'
import Calendario from 'images/calendario.jpg'

import Card from 'components/Card'

import styles from './Perfil.module.scss'

export default function Perfil() {
    return (
        <div className={styles.container}>
            <div className={styles.user}>
                <img src={UserImg} alt='Imagem do perfil de usuário' />
                <p className={styles.user__editar}>Editar perfil</p>
            </div>
            <div>
                <p>Jotaro Kujo</p>
                <p>4.7 Biólogo</p>
                <p>Schroeder, Santa Catarina, Brazil</p>
            </div>
            <Card
                buttonText='Abrir solicitação de serviço'
                titulo='Gostaria de agendar uma solicitação?'
                descricao='Abra um chamado em algum horário para qualquer categoria de serviço, diversas pessoas de sua região serão notificadas para atendimento.'
                imagem={Calendario}
            />
        </div>
    )
}