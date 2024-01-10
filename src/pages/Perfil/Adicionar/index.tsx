import { Divider, TextField } from '@mui/material'
import { useState } from 'react'
import styles from './Adicionar.module.scss'
import Cancelar from '@mui/icons-material/Close';
import Button from 'components/Button'

interface Props {
    visible: any,
    especialistasCadastrados: any,
    defaultList: string[]
}

export default function Adicionar(props: Props) {
    const [texto, setTexto] = useState('')
    const [especializacoes, setEspecializacoes] = useState(props.defaultList)

    function removerEspecializacao(especializacao: string) {
        setEspecializacoes(especializacoes.filter(especial => especial !== especializacao))
        props.especialistasCadastrados(especializacoes)
    }
    function adicionarEspecializacao(especializacao: string) {
        if (especializacao !== '') {
            especializacoes.push(especializacao)
            setTexto('')
            props.especialistasCadastrados(especializacoes)
        }
    }

    return (
        <>
            <div className={styles.overlay} onClick={() => props.visible(false)} />
            <div className={styles.container}>
                <h2>Adição de Especializações</h2>
                <form onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                        e.preventDefault();
                        adicionarEspecializacao(texto)
                    }
                }}>
                    <TextField id="add-especialist" label="Nome da Especialização" value={texto} onChange={(e) => setTexto(e.target.value)} variant="outlined" autoComplete="especialização" className={styles.input} />
                    <Button texto='Adicionar' dark={false} onClick={(e) => {
                        e.preventDefault()
                        adicionarEspecializacao(texto)
                    }} />
                </form>
                <Divider style={{ margin: 20 }} />

                <div className={styles.especializacoes}>
                    {especializacoes.map((especializacao) => (
                        <div className={styles.especializacoes__especializacao} key={especializacao}>
                            <li>{especializacao}</li>
                            <Cancelar onClick={() => removerEspecializacao(especializacao)} />
                        </div>
                    ))}
                </div>
            </div>
        </>
    )
}