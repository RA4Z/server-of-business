import Button from 'components/Button';
import styles from './Info.module.scss'

import Voltar from 'images/voltar.png'

import Obra from 'images/obra-temp.png'
import Estrela from 'images/estrela.svg'
import { info_servicos, info_especialistas } from 'pages/Pesquisa/infos';

import { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom'
import Candidatar from './Candidatar';

export default function Info() {
    const [askCandidatar, setAskCandidatar] = useState(false)
    const { categoria, id } = useParams();
    const navigate = useNavigate();
    const aba_atual = categoria === 'users' ? info_especialistas.cards[Number(id) - 1] : info_servicos.cards[Number(id) - 1]

    const visible = (childdata: boolean) => {
        setAskCandidatar(childdata)
    }

    function direcionarTarefa(categoria:any) {
        if(categoria === 'services') {
            setAskCandidatar(true)
        } else {
            console.log('Direcionar a um chat')
        }
    }

    const info = {
        titulo: aba_atual.titulo,
        descricao: aba_atual.descricao,
        imagem: aba_atual.imagem,
        premium: aba_atual.premium,
        cargo: categoria === 'users' ? info_especialistas.cards[Number(id) - 1].cargo : '',
        estrelas: categoria === 'users' ? info_especialistas.cards[Number(id) - 1].estrelas : '',
        data: categoria === 'services' ? info_servicos.cards[Number(id) - 1].diaProcurado : '',
        hora: categoria === 'services' ? info_servicos.cards[Number(id) - 1].horarioProcurado : '',
        cidade: categoria === 'services' ? info_servicos.cards[Number(id) - 1].cidade : '',
        necessario: categoria === 'services' ? info_servicos.cards[Number(id) - 1].necessario : '',
        solicitante: categoria === 'services' ? info_servicos.cards[Number(id) - 1].solicitadoPor : ''
    }

    return (
        <div className={styles.container}>
            <img src={Voltar} alt='Seta para retornar à página anterior' onClick={() => navigate(-1)} className={styles.seta_volta} />
            <div className={styles.info}>
                <div className={styles.info__titulo}>{info.titulo}</div>
                <div className={styles.info__desc}>
                    {categoria === 'services' ?
                        <>
                            <img src={Obra} alt='Imagem do serviço solicitado' className={styles.info__desc__serviceImg} />
                            <p>{info.descricao} registrado para início em {info.data} às {info.hora}. Trabalho exclusivo para um {info.necessario}, solicitado por {info.solicitante}.</p>
                        </>
                        :
                        <>
                            <div className={styles.textos}>
                                <img src={Estrela} alt='Classificação em estrelas' />
                                {info.estrelas}
                            </div>
                            <img src={info.imagem} alt='Imagem de perfil do usuário' className={styles.logotipo} />
                            <div className={styles.textos}>{info.cargo}</div>
                        </>
                    }
                </div>
                {categoria === 'users' ? <p>{info.descricao}</p> : ''}
            </div>
            {askCandidatar ? <Candidatar visible={visible} /> : ''}
            <Button texto={categoria === 'services' ? 'Candidatar-se ao serviço' : 'Contatar Especialista'} dark={true} onClick={() => direcionarTarefa(categoria)} />
        </div>
    )
}