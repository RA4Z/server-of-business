import { memo } from 'react'
import Button from 'components/Button'
import Estrela from 'images/estrela.svg'
import Premium from 'images/premium.png'
import styles from './Card.module.scss'

interface Props {
    titulo: string,
    descricao?: string,
    imagem: string,
    buttonText: string,
    subtitulo?: string,
    premium?: boolean,
    onClick?: (_: any) => any;
}

function Card(props: Props) {
    return (
        <div className={styles.corpo}>
            <div className={styles.top}>
                <div className={styles.conjunto}>
                    <img src={props.imagem} className={styles.top__img} alt='Imagem do Card' style={props.subtitulo !== '' ? { width: 'auto' } : {}} />
                    <img src={Premium} className={styles.premium} alt='Indicativo User Premium' style={props.premium ? { opacity: 1 } : { opacity: 0 }} />
                </div>
                <div className={styles.top__textos}>
                    <p className={styles.top__text}>{props.titulo}</p>
                    {
                        props.subtitulo !== undefined && props.subtitulo !== '' ?
                            <div className={styles.classification}>
                                <img src={Estrela} alt='Estrela amarela' className={styles.classification__star} />
                                <p className={styles.top__text}>{props.subtitulo}</p>
                            </div>
                            : ''
                    }
                </div>
            </div>
            {props.descricao && <p className={styles.descricao}>{props.descricao}</p>}
            <Button dark={false} texto={props.buttonText} onClick={props.onClick} />
        </div>
    )
}
export default memo(Card)