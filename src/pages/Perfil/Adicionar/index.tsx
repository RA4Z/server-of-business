import { Divider, TextField } from '@mui/material'
import styles from './Adicionar.module.scss'
import Cancelar from 'images/cancelar.png'
import Button from 'components/Button'

export default function Adicionar({ visible }: any) {
    return (
        <>
            <div className={styles.overlay} onClick={() => visible(false)} />
            <div className={styles.container}>
                <h2>Adição de Especializações</h2>
                <TextField id="add-especialist" label="Nome da Especialização" variant="outlined" autoComplete="especialização" className={styles.input} />
                <Button texto='Adicionar' dark={false} />
                <Divider style={{ margin: 20 }} />

                <div className={styles.especializacoes}>
                    <div className={styles.especializacoes__especializacao}>
                        <li>Biólogo</li>
                        <img src={Cancelar} alt='Botão de cancelar' />
                    </div>
                    <div className={styles.especializacoes__especializacao}>
                        <li>Engenheiro de software</li>
                        <img src={Cancelar} alt='Botão de cancelar' />
                    </div>
                </div>
            </div>
        </>
    )
}