import { Divider, TextField } from '@mui/material'
import styles from './Adicionar.module.scss'
import Button from 'components/Button'

export default function Adicionar({ visible }: any) {
    return (
        <>
            <div className={styles.overlay} onClick={() => visible(false)} />
            <div className={styles.container}>
                <h3>Adição de Especializações</h3>
                <TextField id="add-especialist" label="Nome da Especialização" variant="outlined" autoComplete="especialização" className={styles.input} />
                <Button texto='Adicionar' dark={false} />
                <Divider style={{margin:20}} />
            </div>
        </>
    )
}