import UserImg from 'images/user.png'
import Calendario from 'images/calendario.jpg'
import Estrela from 'images/estrela.svg'

import Card from 'components/Card'
import { info_servicos, info_especialistas } from 'pages/Pesquisa/infos'

import { useNavigate } from 'react-router-dom'
import styles from './Perfil.module.scss'
import { useState } from 'react'
import { Divider } from '@mui/material'
import Editar from './Editar'
import Solicitar from './Solicitar'

export default function Perfil() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    const userId = 1
    const infoUser = info_especialistas.filter(info => info.id === userId)
    const solicitados = info_servicos.filter(info => info.solicitadoPor === infoUser[0].titulo)
    const [editar, setEditar] = useState(false)
    const [solicitar, setSolicitar] = useState(false)
    const navigate = useNavigate()

    const visible = (childdata: boolean) => {
        setEditar(childdata)
    }
    const service = (childdata: boolean) => {
        setSolicitar(childdata)
    }
    return (
        <>
            {editar ? <div className={styles.pagina_editar}>
                <Editar visible={visible} />
            </div> : ''}
            {solicitar ? <div className={styles.pagina_editar}>
                <Solicitar visible={service} />
            </div> : ''}

            <div className={styles.container}>
                <div className={styles.user}>
                    <img src={UserImg} alt='Imagem do perfil de usuário' />
                    <p className={styles.user__editar} onClick={() => setEditar(true)}>Editar perfil</p>
                </div>
                <div>
                    <p className={styles.info__nome}>{infoUser[0].titulo}</p>
                    <p className={styles.info__especialidade}><img src={Estrela} alt='Estrela' />{infoUser[0].estrelas} {infoUser[0].cargo}</p>
                    <p className={styles.info__regiao}>Schroeder, Santa Catarina, Brazil</p>
                </div>
                <Card
                    buttonText='Abrir solicitação de serviço'
                    titulo='Gostaria de agendar uma solicitação?'
                    descricao='Abra um chamado em algum horário para qualquer categoria de serviço, diversas pessoas de sua região serão notificadas para atendimento.'
                    imagem={Calendario}
                    onClick={() => setSolicitar(true)}
                />
            </div>
            <Divider style={{ margin: 50 }} />
            <p className={styles.titulo_solicita}>Suas solicitações em aberto</p>
            <div className={styles.cards_solicitados}>
                {solicitados.map(solicitado => (
                    <Card
                        key={solicitado.id}
                        titulo={solicitado.titulo}
                        imagem={solicitado.imagem}
                        buttonText='Ver mais informações'
                        descricao={solicitado.descricao}
                        onClick={() => navigate(`/trabalho/${infoUser[0].id}/${solicitado.id}`)}
                    />
                ))}
            </div>
        </>
    )
}