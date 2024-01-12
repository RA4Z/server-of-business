import UserImg from 'images/user.png'
import ImagemTrabalho from 'images/contratar_freelancer.jpg'
import Calendario from 'images/calendario.jpg'
import Estrela from 'images/estrela.svg'

import Card from 'components/Card'

import { useNavigate } from 'react-router-dom'
import styles from './Perfil.module.scss'
import { useState, memo, useEffect } from 'react'
import { Divider } from '@mui/material'
import Editar from './Editar'
import Solicitar from './Solicitar'
import { Service_Interface } from 'types/User'
import { auth } from 'config/firebase'
import { infoProjetosContratados, infoSolicitados } from 'services/firestore'
import ImportImage from 'components/ImportImage'

function Perfil({ infoUser, setLoad }: any) {
    useEffect(() => { window.scrollTo({ top: 0, behavior: 'smooth' }); })
    const navigate = useNavigate()
    auth.onAuthStateChanged(usuario => {
        if (!usuario) navigate('/login')
    })

    const [editar, setEditar] = useState(false)
    const [solicitar, setSolicitar] = useState(false)
    const [solicitados, setSolicitados] = useState<Service_Interface[]>()
    const [contratado, setContratado] = useState<Service_Interface[]>()

    useEffect(() => {
        async function Solicitar() {
            await infoSolicitados(infoUser.email, setSolicitados)
            await infoProjetosContratados(infoUser.id, setContratado)
        }
        Solicitar()
    }, [infoUser.email, infoUser.id])

    const visible = (childdata: boolean) => {
        setEditar(childdata)
    }
    const service = (childdata: boolean) => {
        setSolicitar(childdata)
    }
    return (
        <>
            {editar ? <div className={styles.pagina_editar}>
                <Editar visible={visible} infoUser={infoUser} setLoad={setLoad} />
            </div> : ''}
            {solicitar ? <div className={styles.pagina_editar}>
                <Solicitar visible={service} infoUser={infoUser} setLoad={setLoad} />
            </div> : ''}

            <div className={styles.container}>
                <div className={styles.user}>
                    <div className={styles.user__image}>
                        <img className={styles.user__image__avatar} src={infoUser.avatar !== '' ? infoUser.avatar : UserImg} alt='Imagem do perfil de usuário' />
                        <div className={styles.use__image__import}><ImportImage userInfo={infoUser} /></div>
                    </div>
                    <p className={styles.user__editar} onClick={() => setEditar(true)}>Editar perfil</p>
                </div>

                <div>
                    <p className={styles.info__nome}>{infoUser.nome}</p>
                    <p className={styles.info__especialidade}><img src={Estrela} alt='Estrela' />{Number(infoUser.estrelas).toFixed(2)} {infoUser.cargos[0]}</p>
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
            {(solicitados !== undefined && solicitados.length > 0) && <>
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
                </div></>}
            {(contratado !== undefined && contratado.length > 0) && <>
                <Divider style={{ margin: 50 }} />
                <p className={styles.titulo_solicita}>Projetos Contratados</p>
                <div className={styles.cards_solicitados}>
                    {contratado && contratado.map(solicitado => (
                        <Card
                            key={solicitado.id}
                            titulo={solicitado.titulo}
                            imagem={solicitado.imagem === '' ? ImagemTrabalho : solicitado.imagem}
                            buttonText='Ver mais informações'
                            descricao={solicitado.descricao}
                            onClick={() => navigate(`/info/services/${solicitado.id}`)}
                        />
                    ))}
                </div></>}
        </>
    )
}
export default memo(Perfil)