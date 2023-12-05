import UserImg from 'images/user.png'
import ImagemTrabalho from 'images/contratar_freelancer.jpg'
import Calendario from 'images/calendario.jpg'
import Estrela from 'images/estrela.svg'

import Card from 'components/Card'
import { info_servicos } from 'utils/infos'

import { useNavigate } from 'react-router-dom'
import styles from './Perfil.module.scss'
import { useState, memo, useEffect } from 'react'
import { Divider } from '@mui/material'
import Editar from './Editar'
import Solicitar from './Solicitar'
import { User_Interface } from 'types/User'
import { auth } from 'config/firebase'
import { infoSolicitados } from 'services/firestore'

function Perfil(infoUser: User_Interface) {
    useEffect(() => { window.scrollTo({ top: 0, behavior: 'smooth' }); })
    const navigate = useNavigate()
    auth.onAuthStateChanged(usuario => {
        if (!usuario) navigate('/login')
    })

    const [editar, setEditar] = useState(false)
    const [solicitar, setSolicitar] = useState(false)
    const [solicitados, setSolicitados] = useState(info_servicos)

    useEffect(() => {
        async function Solicitar() {
            await infoSolicitados(infoUser.email, setSolicitados)
        }
        Solicitar()
    }, [infoUser.email])

    const visible = (childdata: boolean) => {
        setEditar(childdata)
    }
    const service = (childdata: boolean) => {
        setSolicitar(childdata)
    }
    return (
        <>
            {editar ? <div className={styles.pagina_editar}>
                <Editar visible={visible} infoUser={infoUser} />
            </div> : ''}
            {solicitar ? <div className={styles.pagina_editar}>
                <Solicitar visible={service} infoUser={infoUser} />
            </div> : ''}

            <div className={styles.container}>
                <div className={styles.user}>
                    <img src={UserImg} alt='Imagem do perfil de usuário' />
                    <p className={styles.user__editar} onClick={() => setEditar(true)}>Editar perfil</p>
                </div>
                <div>
                    <p className={styles.info__nome}>{infoUser.nome}</p>
                    <p className={styles.info__especialidade}><img src={Estrela} alt='Estrela' />{infoUser.estrelas} {infoUser.cargos[0]}</p>
                    <p className={styles.info__regiao}>{infoUser.estado}, {infoUser.pais}</p>
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
                        imagem={solicitado.imagem === '' ? ImagemTrabalho : solicitado.imagem}
                        buttonText='Ver mais informações'
                        descricao={solicitado.descricao}
                        onClick={() => navigate(`/trabalho/${solicitado.id}`)}
                    />
                ))}
            </div>
        </>
    )
}
export default memo(Perfil)