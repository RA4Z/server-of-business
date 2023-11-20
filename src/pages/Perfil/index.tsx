import UserImg from 'images/user.png'
import Calendario from 'images/calendario.jpg'
import Estrela from 'images/estrela.svg'

import Card from 'components/Card'

import styles from './Perfil.module.scss'
import { Divider } from '@mui/material'

export default function Perfil() {
    return (
        <>
            <div className={styles.container}>
                <div className={styles.user}>
                    <img src={UserImg} alt='Imagem do perfil de usuário' />
                    <p className={styles.user__editar}>Editar perfil</p>
                </div>
                <div>
                    <p className={styles.info__nome}>Jotaro Kujo</p>
                    <p className={styles.info__especialidade}><img src={Estrela} alt='Estrela' />4.7 Biólogo</p>
                    <p className={styles.info__regiao}>Schroeder, Santa Catarina, Brazil</p>
                </div>
                <Card
                    buttonText='Abrir solicitação de serviço'
                    titulo='Gostaria de agendar uma solicitação?'
                    descricao='Abra um chamado em algum horário para qualquer categoria de serviço, diversas pessoas de sua região serão notificadas para atendimento.'
                    imagem={Calendario}
                />
            </div>
            <Divider style={{ margin: 50 }} />
            <p className={styles.titulo_solicita}>Suas solicitações em aberto</p>
        </>
    )
}