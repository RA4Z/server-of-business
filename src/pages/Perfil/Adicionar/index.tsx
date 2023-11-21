import { Divider, TextField } from '@mui/material'
import { useState } from 'react'
import styles from './Adicionar.module.scss'
import Cancelar from 'images/cancelar.png'
import Button from 'components/Button'

export default function Adicionar({ visible }: any) {
    const [texto, setTexto] = useState('')
    const [especializacoes, setEspecializacoes] = useState(['Biólogo', 'Engenheiro de software', 'Stand User'])

    function removerEspecializacao(especializacao: string) {
        setEspecializacoes(especializacoes.filter(especial => especial !== especializacao))
    }
    function adicionarEspecializacao(especializacao: string) {
        especializacoes.push(especializacao)
        setTexto('')
    }

    return (
        <>
            <div className={styles.overlay} onClick={() => visible(false)} />
            <div className={styles.container}>
                <h2>Adição de Especializações</h2>
                <TextField id="add-especialist" label="Nome da Especialização" value={texto} onChange={(e) => setTexto(e.target.value)} variant="outlined" autoComplete="especialização" className={styles.input} />
                <Button texto='Adicionar' dark={false} onClick={() => adicionarEspecializacao(texto)} />
                <Divider style={{ margin: 20 }} />

                <div className={styles.especializacoes}>
                    {especializacoes.map((especializacao) => (
                        <div className={styles.especializacoes__especializacao} key={especializacao}>
                            <li>{especializacao}</li>
                            <img src={Cancelar} alt='Botão de cancelar' onClick={() => removerEspecializacao(especializacao)} />
                        </div>
                    ))}
                </div>
            </div>
        </>
    )
}