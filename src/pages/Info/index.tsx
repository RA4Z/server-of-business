import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom';

import Button from 'components/Button';

import Voltar from 'images/voltar.png'
import Obra from 'images/obra-temp.png'
import Estrela from 'images/estrela.svg'
import UserIMG from 'images/user.png'

import Candidatar from './Candidatar';
import styles from './Info.module.scss'

import { infoSolicitado, infoUser } from 'services/firestore';

export default function Info() {
    useEffect(() => { window.scrollTo({ top: 0, behavior: 'smooth' }); })
    const [askCandidatar, setAskCandidatar] = useState(false)
    const [necessario, setNecessario] = useState('')

    const [user, setUser] = useState({
        id: '', nome: '', email: '', pais: '', estado: '',
        premium: false, telefone: '', estrelas: 5, descricao: '', avatar: '', cargos: []
    })
    const [service, setService] = useState({
        id: '', titulo: '', autonomo: false, freelancer: false, solicitadoPor: '', diaProcurado: '',
        horarioProcurado: '', cidade: '', premium: true, descricao: '', imagem: '',
        inscritos: [2, 4, 5]
    })

    const { categoria, id } = useParams();
    const navigate = useNavigate();
    const aba_atual = categoria === 'users' ? user : service

    useEffect(() => {
        async function addInfo() {
            if (categoria === 'users') await infoUser(id, setUser)
            if (categoria === 'services') {
                await infoSolicitado(id, setService)
                if (service.autonomo && service.freelancer) setNecessario('Autônomos e Freelancers')
                if (service.autonomo && !service.freelancer) setNecessario('Autônomos')
                if (!service.autonomo && service.freelancer) setNecessario('Freelancers')
            }
        }
        addInfo()
    }, [id, categoria, service.autonomo, service.freelancer])

    const visible = (childdata: boolean) => {
        setAskCandidatar(childdata)
    }

    function direcionarTarefa(categoria: any) {
        if (categoria === 'services') {
            setAskCandidatar(true)
        } else {
            console.log('Direcionar a um chat')
        }
    }

    const info = {
        titulo: categoria === 'users' ? user.nome : service.titulo,
        descricao: aba_atual.descricao,
        imagem: categoria === 'users' ? user.avatar : service.imagem,
        premium: aba_atual.premium,
        cargo: categoria === 'users' ? user.cargos[0] : '',
        estrelas: categoria === 'users' ? user.estrelas : '',
        data: categoria === 'services' ? service.diaProcurado : '',
        hora: categoria === 'services' ? service.horarioProcurado : '',
        cidade: categoria === 'services' ? service.cidade : '',
        solicitante: categoria === 'services' ? service.solicitadoPor : ''
    }

    return (
        <>
            {askCandidatar ?
                <div className={styles.certeza_candidatar}>
                    <Candidatar visible={visible} />
                </div>
                : ''}
            <div className={styles.container}>
                <img src={Voltar} alt='Seta para retornar à página anterior' onClick={() => navigate(-1)} className={styles.seta_volta} />
                <div className={styles.info}>
                    <div className={styles.info__titulo}>{info.titulo}</div>
                    <div className={styles.info__desc}>
                        {categoria === 'services' ?
                            <>
                                <img src={Obra} alt='Imagem do serviço solicitado' className={styles.info__desc__serviceImg} />
                                <p>{info.descricao} registrado para início em {info.data} às {info.hora}. À procura de {necessario}, solicitado por {info.solicitante}.</p>
                            </>
                            :
                            <>
                                <div className={styles.textos}>
                                    <img src={Estrela} alt='Classificação em estrelas' />
                                    {info.estrelas}
                                </div>
                                <img src={info.imagem ? info.imagem : UserIMG} alt='Imagem de perfil do usuário' className={styles.logotipo} />
                                <div className={styles.textos}>{info.cargo}</div>
                            </>
                        }
                    </div>
                    {categoria === 'users' ? <p>{info.descricao}</p> : ''}
                </div>
                <Button texto={categoria === 'services' ? 'Candidatar-se ao serviço' : 'Contatar Especialista'} dark={true} onClick={() => direcionarTarefa(categoria)} />
            </div>
        </>
    )
}