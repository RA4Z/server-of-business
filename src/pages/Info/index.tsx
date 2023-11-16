import Button from 'components/Button';
import styles from './Info.module.scss'

import Voltar from 'images/voltar.png'

import Obra from 'images/obra-temp.png'
import { info_servicos, info_especialistas } from 'pages/Pesquisa/infos';

import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom'

export default function Info() {
    const { categoria, id } = useParams();
    const navigate = useNavigate();
    const aba_atual = categoria === 'users' ? info_especialistas.cards[Number(id)-1] : info_servicos.cards[Number(id)-1]

    const info = {
        titulo: aba_atual.titulo,
        descricao: aba_atual.descricao,
        imagem: aba_atual.imagem,
    }

    return (
        <div className={styles.container}>
            <img src={Voltar} alt='Seta para retornar à página anterior' onClick={() => navigate(-1)} className={styles.seta_volta} />
            <div className={styles.info}>
                <div className={styles.info__titulo} >{info.titulo}</div>
                <div className={styles.info__desc}>
                    <img src={Obra} alt='Imagem do serviço solicitado' />
                    <p>Obra em Schroeder na rua Germano Muller, bairro Centro Norte, expectativa de 6 meses de obra.
                        Registrado para início em 27/01/2024 às 08:00.
                        Trabalho para autônomos
                        Trabalho solicitado por Robert Aron Zimmermann.</p>
                </div>
            </div>
            <Button texto='Candidatar-se ao serviço' dark={true} />
        </div>
    )
}