import Button from "components/Button";
import styles from './Candidatar.module.scss';

export default function Candidatar({ visible }: any) {
    if (visible) {
        document.body.style.overflow = "hidden";
    }
    function sair() {
        document.body.style.overflow = "visible";
        visible(false)
    }
    function candidatura() {
        document.body.style.overflow = "visible";
        visible(false)
    }
    return (
        <>
            <div className={styles.overlay} onClick={() => sair()} />
            <div className={styles.container}>
                <div>Tem certeza de que deseja se candidatar a este serviço?</div>
                <div className={styles.buttons}>
                    <Button dark={false} texto="Cancelar" onClick={() => sair()} />
                    <Button dark={true} texto="Candidatar-se" onClick={() => candidatura()} />
                </div>
            </div>
        </>
    )
}