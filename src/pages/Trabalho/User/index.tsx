import { info_especialistas } from 'pages/Pesquisa/infos'
import styles from './User.module.scss'
import Estrela from 'images/estrela.svg'
import Button from 'components/Button'

interface Props {
    visible: any,
    id: number
}

export default function User(props: Props) {
    var candidato = info_especialistas.filter(especialista => especialista.id === props.id)
    return (
        <>
            <div className={styles.overlay} onClick={() => props.visible(false)} />
            <div className={styles.container}>
                <div className={styles.info__titulo}>{candidato[0].nome}</div>
                <div className={styles.info__desc}>
                    <div className={styles.textos}>
                        <img src={Estrela} alt='Classificação em estrelas' />
                        {candidato[0].estrelas}
                    </div>
                    <img src={candidato[0].imagem} alt='Imagem de perfil do usuário' className={styles.logotipo} />
                    <div className={styles.textos}>{candidato[0].cargos[0]}</div>
                    <div className={styles.textos}>{candidato[0].descricao}</div>
                </div>
                <Button texto='Aprovar candidato' dark={true} />
            </div>
        </>
    )
}
