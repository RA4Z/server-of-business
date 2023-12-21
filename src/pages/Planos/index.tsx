import { User_Interface } from 'types/User'
import styles from './Planos.module.scss'

export default function Planos(usuarioLogado: User_Interface) {
    return (
        <div className={styles.container}>
            <h1>Planos de assinatura</h1>
            <h2>{usuarioLogado.nome}</h2>
        </div>
    )
}