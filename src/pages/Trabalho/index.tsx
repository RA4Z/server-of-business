import styles from './Trabalho.module.scss'
import { useNavigate, useParams } from 'react-router-dom'
import { useState } from 'react'
import { info_servicos, info_especialistas } from 'utils/infos'

import Voltar from 'images/voltar.png'
import Obra from 'images/obra-temp.png'
import UserIMG from 'images/user.png'
import User from './User'
import Estrela from 'images/estrela.svg'

import { Divider } from '@mui/material'

export default function Trabalho() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    const { userId, jobId } = useParams();
    const [userVisibility, setUserVisibility] = useState(false)
    const [userSelecionado, setUserSelecionado] = useState(0)
    const navigate = useNavigate()

    var info = info_servicos.filter(service => service.idSolicitante === Number(userId) && service.id === Number(jobId))
    var inscritos = info_especialistas.filter(especialista => info[0].inscritos.indexOf(especialista.id) > -1)

    function infoUsuarios(idUser: number) {
        setUserSelecionado(idUser)
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
                        id={userSelecionado}
                    />
                    : ''}
            </div>
            <div className={styles.container}>
                <img src={Voltar} alt='Seta para retornar à página anterior' onClick={() => navigate(-1)} className={styles.seta_volta} />
                <div className={styles.info}>
                    <div className={styles.info__titulo}>{info[0].titulo}</div>
                    <div className={styles.info__desc}>
                        <img src={Obra} alt='Imagem do serviço solicitado' className={styles.info__desc__serviceImg} />
                        <p>{info[0].descricao} registrado para início em {info[0].diaProcurado} às {info[0].horarioProcurado}. Trabalho exclusivo para {info[0].necessario}, solicitado por {info[0].solicitadoPor}.</p>
                    </div>
                </div>
                <Divider />
                <div>
                    <div className={styles.especialistas__title}>Especialistas Candidatados</div>
                    <div className={styles.especialistas__cards}>
                        {inscritos.map(inscrito => (
                            <div className={styles.especialistas__card} key={inscrito.id} onClick={() => infoUsuarios(inscrito.id)}>
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
