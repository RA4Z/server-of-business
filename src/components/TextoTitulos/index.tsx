import styles from './TextoTitulos.module.scss'

interface Props {
    children: string | string[]
}

export default function TextoTitulos({ children }: Props) {
    return (
        <li className={styles.titulo}>{children}</li>
    )
}