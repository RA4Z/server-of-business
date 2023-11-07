import Button from 'components/Button'
import styles from './Card.module.scss'

export default function Card() {
    return (
        <div className={styles.corpo}>
            <div className={styles.top}>
                <img src='' className={styles.top__img} alt='Imagem do Card' />
                <p className={styles.top__text}>Prestar serviço como Freelancer</p>
            </div>
            <p className={styles.descricao}>Procurar serviços de curta duração, para serem realizados em poucos dias ou horas.</p>
            <Button dark={false} texto='Candidatar-se como Freelancer' />
        </div>
    )
}