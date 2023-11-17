import Button from "components/Button";
import styles from './Candidatar.module.scss';

export default function Candidatar({ visible }: any) {
    function candidatura() {
        visible(false)
    }
    return (
        <>
            <div className={styles.overlay} onClick={() => visible(false)} />
            <div className={styles.container}>
                <div>Tem certeza de que deseja se candidatar a este serviço?</div>
                <div className={styles.buttons}>
                    <Button dark={false} texto="Cancelar" onClick={() => visible(false)} />
                    <Button dark={true} texto="Candidatar-se" onClick={() => candidatura()} />
                </div>
            </div>
        </>
    )
}