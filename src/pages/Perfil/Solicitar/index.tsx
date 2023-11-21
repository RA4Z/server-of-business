import styles from './Solicitar.module.scss'

export default function Solicitar({ visible }: any) {
    return (
        <>
            <div className={styles.overlay} onClick={() => visible(false)} />
            <div className={styles.container}>
                Abrir solicitação de serviço
            </div>
        </>
    )
}