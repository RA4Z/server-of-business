import Button from 'components/Button'
import styles from './Card.module.scss'

interface Props {
    titulo:string,
    descricao:string,
    imagem:string,
    buttonText:string
}

export default function Card(props:Props) {
    return (
        <div className={styles.corpo}>
            <div className={styles.top}>
                <img src={props.imagem} className={styles.top__img} alt='Imagem do Card' />
                <p className={styles.top__text}>{props.titulo}</p>
            </div>
            <p className={styles.descricao}>{props.descricao}</p>
            <Button dark={false} texto={props.buttonText} />
        </div>
    )
}