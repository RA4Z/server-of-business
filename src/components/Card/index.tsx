import Button from 'components/Button'
import Estrela from 'images/estrela.svg'
import styles from './Card.module.scss'

interface Props {
    titulo: string,
    descricao: string,
    imagem: string,
    buttonText: string,
    subtitulo?: string,
    onClick?: (_: any) => any;
}

export default function Card(props: Props) {
    return (
        <div className={styles.corpo}>
            <div className={styles.top}>
                <img src={props.imagem} className={styles.top__img} alt='Imagem do Card' style={props.subtitulo !== '' ? { width: 'auto' } : {}} />
                <div className={styles.top__textos}>
                    <p className={styles.top__text}>{props.titulo}</p>
                    {
                        props.subtitulo !== undefined ?
                            <div className={styles.classification}>
                                <img src={Estrela} alt='Estrela amarela' className={styles.classification__star} />
                                <p className={styles.top__text}>{props.subtitulo}</p>
                            </div>
                            : ''
                    }
                </div>
            </div>
            <p className={styles.descricao}>{props.descricao}</p>
            <Button dark={false} texto={props.buttonText} onClick={props.onClick} />
        </div>
    )
}