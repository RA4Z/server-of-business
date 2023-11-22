import styles from './Trabalho.module.scss'
import { useNavigate } from 'react-router-dom'

import Voltar from 'images/voltar.png'
import Obra from 'images/obra-temp.png'
import User from 'images/user.png'
import Estrela from 'images/estrela.svg'

import { Divider } from '@mui/material'

export default function Trabalho() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    const navigate = useNavigate()
    const info = {
        descricao: 'Trabalho',
        data: '22/11/2023',
        hora: '08:30',
        necessario: 'Autônomos',
        solicitante: 'Robert Aron Zimmermann'
    }
    return (
        <div className={styles.container}>
            <img src={Voltar} alt='Seta para retornar à página anterior' onClick={() => navigate(-1)} className={styles.seta_volta} />
            <div className={styles.info}>
                <div className={styles.info__titulo}>Trabalho Genérico</div>
                <div className={styles.info__desc}>
                    <img src={Obra} alt='Imagem do serviço solicitado' className={styles.info__desc__serviceImg} />
                    <p>{info.descricao} registrado para início em {info.data} às {info.hora}. Trabalho exclusivo para {info.necessario}, solicitado por {info.solicitante}.</p>
                </div>
            </div>
            <Divider />
            <div>
                <div className={styles.especialistas__title}>Especialistas Candidatados</div>
                <div className={styles.especialistas__cards}>
                    <div className={styles.especialistas__card}>
                        <img src={User} alt='Perfil de usuário' />
                        <div>
                            <p>Dio Brando</p>
                            <p><img src={Estrela} alt='Estrela' />1.2</p>
                        </div>
                    </div>
                    <div className={styles.especialistas__card}>
                        <img src={User} alt='Perfil de usuário' />
                        <div>
                            <p>Dio Brando</p>
                            <p><img src={Estrela} alt='Estrela' />1.2</p>
                        </div>
                    </div>
                    <div className={styles.especialistas__card}>
                        <img src={User} alt='Perfil de usuário' />
                        <div>
                            <p>Dio Brando</p>
                            <p><img src={Estrela} alt='Estrela' />1.2</p>
                        </div>
                    </div>
                    <div className={styles.especialistas__card}>
                        <img src={User} alt='Perfil de usuário' />
                        <div>
                            <p>Dio Brando</p>
                            <p><img src={Estrela} alt='Estrela' />1.2</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
