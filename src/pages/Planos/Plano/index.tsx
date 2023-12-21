import { Divider } from '@mui/material'
import styles from './Plano.module.scss'
import Button from 'components/Button'

interface Props {
    titulo: string,
    valor: number,
    descricao: string
    onClick: () => any
}

export default function Plano(props: Props) {
    return (
        <div className={styles.container}>
            <div>
                <div className={styles.container__header}>
                    {props.titulo}
                </div>
                <div className={styles.container__valor}>
                    {props.valor.toFixed(2)}R$
                </div>
                <Divider style={{ height: 1, background: 'black' }} />
                <div className={styles.container__body}>
                    {props.descricao}
                </div>
            </div>
            <div className={styles.container__btn}>
                <Button dark={false} texto='Assinar' onClick={() => props.onClick()} />
            </div>
        </div>
    )
}