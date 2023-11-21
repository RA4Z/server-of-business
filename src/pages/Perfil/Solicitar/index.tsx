import { Checkbox, FormControlLabel, TextField } from '@mui/material'
import UploadIco from 'images/upload.png'
import styles from './Solicitar.module.scss'
import Button from 'components/Button'

export default function Solicitar({ visible }: any) {
    
    if (visible) {
        document.body.style.overflow = "hidden";
    }
    function sair() {
        document.body.style.overflow = "visible";
        visible(false)
    }
    return (
        <>
            <div className={styles.overlay} onClick={() => sair()} />
            <div className={styles.container}>
                <div className={styles.lados}>
                    <div className={styles.left}>
                        <TextField id="outlined-solicitation-title" label="Título da solicitação" variant="outlined" autoComplete="title" className={styles.input} />
                        <TextField id="outlined-solicitation-username" label="Nome do solicitante" variant="outlined" autoComplete="username" className={styles.input} />
                        <TextField id="outlined-solicitation-description" label="Descrição sobre a solicitação" multiline rows={8} variant="outlined" autoComplete="text" className={styles.input} />

                    </div>
                    <div className={styles.right}>
                        <Button texto='Possíveis Especializações' dark={false} />
                        <TextField id="solicitation-date" label="Data:" variant="outlined" autoComplete="date" className={styles.input__bloco} />
                        <TextField id="solicitation-time" label="Hora" variant="outlined" autoComplete="hour" className={styles.input__bloco} />
                        <div className={styles.right__local}>Localização</div>
                        <div className={styles.right__upload}><img src={UploadIco} alt='Ícone de Upload' />Upload Imagem</div>
                        <>
                            <FormControlLabel control={<Checkbox />} label="Autônomo" className={styles.check} />
                            <FormControlLabel control={<Checkbox />} label="Freelancer" className={styles.check} />
                        </>
                    </div>
                </div>
                <Button texto='Abrir Solicitação' dark={true} />
            </div>
        </>
    )
}