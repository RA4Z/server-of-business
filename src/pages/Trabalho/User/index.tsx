import styles from './User.module.scss'
import Estrela from 'images/estrela.svg'

interface Props {
    visible: any,
    titulo: string,
    estrelas: string,
    imagem: string,
    cargo: string,
    descricao: string,
}

export default function User(props: Props) {
    return (
        <>
            <div className={styles.overlay} onClick={() => props.visible(false)} />
            <div className={styles.container}>
                <div className={styles.info}>
                    <div className={styles.info__titulo}>{props.titulo}</div>
                    <div className={styles.info__desc}>

                        <div className={styles.textos}>
                            <img src={Estrela} alt='Classificação em estrelas' />
                            {props.estrelas}
                        </div>
                        <img src={props.imagem} alt='Imagem de perfil do usuário' className={styles.logotipo} />
                        <div className={styles.textos}>{props.cargo}</div>

                    </div>
                    <p>{props.descricao}</p>
                </div>
            </div>
        </>
    )
}
