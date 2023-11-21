import { Checkbox, FormControlLabel, TextField } from '@mui/material'
import { useState } from 'react'
import UploadIco from 'images/upload.png'
import styles from './Solicitar.module.scss'
import Button from 'components/Button'
import Adicionar from '../Adicionar'

export default function Solicitar({ visible }: any) {
    const [adicionar, setAdicionar] = useState(false)

    const addEspecialista = (childdata: boolean) => {
        setAdicionar(childdata)
    }
    return (
        <>
            <div className={styles.overlay} onClick={() => visible(false)} />
            <div className={styles.container}>
                {adicionar ? <div className={styles.bloco_servicos}>
                    <Adicionar visible={addEspecialista} />
                </div> : ''}
                <div className={styles.lados}>
                    <div className={styles.left}>
                        <TextField id="outlined-solicitation-title" label="Título da solicitação" variant="outlined" autoComplete="title" className={styles.input} />
                        <TextField id="outlined-solicitation-username" label="Nome do solicitante" variant="outlined" autoComplete="username" className={styles.input} />
                        <TextField id="outlined-solicitation-description" label="Descrição sobre a solicitação" multiline rows={8} variant="outlined" autoComplete="text" className={styles.input} />

                    </div>
                    <div className={styles.right}>
                        <Button texto='Possíveis Especializações' dark={false} onClick={() => setAdicionar(true)} />
                        <div className={styles.right__blocosdados}>
                            <TextField id="solicitation-date" label="Data" variant="outlined" autoComplete="date" className={styles.input__bloco} />
                            <TextField id="solicitation-time" label="Hora" variant="outlined" autoComplete="hour" className={styles.input__bloco} />
                        </div>
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