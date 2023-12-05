import styles from './Trabalho.module.scss'
import { useNavigate, useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'

import Voltar from 'images/voltar.png'
import Obra from 'images/obra-temp.png'
import UserIMG from 'images/user.png'
import User from './User'
import Estrela from 'images/estrela.svg'

import { Divider } from '@mui/material'
import { infoSolicitado, userInscrito } from 'services/firestore'

export default function Trabalho() {
    useEffect(() => { window.scrollTo({ top: 0, behavior: 'smooth' }); }, [])
    const { jobId } = useParams();
    const [userVisibility, setUserVisibility] = useState(false)
    const [necessario, setNecessario] = useState('')
    const [userSelecionado, setUserSelecionado] = useState({ id: '', nome: '', estrelas: 0, cargos: [], descricao: '', avatar: '' })
    const navigate = useNavigate()

    const [inscritos, setInscritos] = useState([{ id: '', nome: '', estrelas: 0, cargos: [], descricao: '', avatar: '' }])
    const [info, setInfo] = useState({
        id: '0',
        titulo: '',
        solicitante: '',
        diaProcurado: '',
        horarioProcurado: '',
        autonomo: false,
        freelancer: false,
        cidade: '',
        descricao: '',
        imagem: '',
        inscritos: []
    })

    useEffect(() => {
        async function buscarDados() {
            await infoSolicitado(jobId, setInfo)
            if (info.autonomo && info.freelancer) setNecessario('Autônomos e Freelancers')
            if (info.autonomo && !info.freelancer) setNecessario('Autônomos')
            if (!info.autonomo && info.freelancer) setNecessario('Freelancers')
        }
        buscarDados()
        if (info.inscritos.length > 0) userInscrito(info.inscritos, setInscritos)
    }, [jobId, info.autonomo, info.freelancer, info.titulo])

    function infoUsuarios(user: typeof userSelecionado) {
        setUserSelecionado(user)
        setUserVisibility(true)
    }

    const userVisible = (childdata: boolean) => {
        setUserVisibility(childdata)
    }

    return (
        <>
            <div className={styles.pagina_overlay}>
                {userVisibility ?
                    <User
                        visible={userVisible}
                        {...userSelecionado}
                    />
                    : ''}
            </div>
            <div className={styles.container}>
                <img src={Voltar} alt='Seta para retornar à página anterior' onClick={() => navigate(-1)} className={styles.seta_volta} />
                <div className={styles.info}>
                    <div className={styles.info__titulo}>{info.titulo}</div>
                    <div className={styles.info__desc}>
                        <img src={Obra} alt='Imagem do serviço solicitado' className={styles.info__desc__serviceImg} />
                        <p>{info.descricao} registrado para início em {info.diaProcurado} às {info.horarioProcurado}. À procura de {necessario}, solicitado por {info.solicitante}.</p>
                    </div>
                </div>
                <Divider />
                <div>
                    <div className={styles.especialistas__title}>Especialistas Candidatados</div>
                    <div className={styles.especialistas__cards}>
                        {inscritos.map((inscrito, keyId) => (
                            <div className={styles.especialistas__card} key={keyId} onClick={() => infoUsuarios(inscrito)}>
                                <img src={UserIMG} alt='Perfil de usuário' />
                                <div>
                                    <p>{inscrito.nome}</p>
                                    <p><img src={Estrela} alt='Estrela' />{inscrito.estrelas}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </>
    )
}
