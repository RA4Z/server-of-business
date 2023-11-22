import { Divider, TextField } from '@mui/material'
import { useState } from 'react'
import styles from './Adicionar.module.scss'
import Cancelar from 'images/cancelar.png'
import Button from 'components/Button'

interface Props {
    visible: any,
    especialistasCadastrados: any,
    defaultList: string[]
}

export default function Adicionar(props: Props) {
    const [texto, setTexto] = useState('')
    const [especializacoes, setEspecializacoes] = useState(props.defaultList)
    const form = document.getElementById('adicionar-especialista')

    form?.addEventListener('submit', e => {
        e.preventDefault()
    })

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
                <form id='adicionar-especialista'>
                    <TextField id="add-especialist" label="Nome da Especialização" value={texto} onChange={(e) => setTexto(e.target.value)} variant="outlined" autoComplete="especialização" className={styles.input} />
                    <Button texto='Adicionar' dark={false} onClick={() => adicionarEspecializacao(texto)} />
                </form>
                <Divider style={{ margin: 20 }} />

                <div className={styles.especializacoes}>
                    {especializacoes.map((especializacao) => (
                        <div className={styles.especializacoes__especializacao} key={especializacao}>
                            <li>{especializacao}</li>
                            <img src={Cancelar} alt='Botão de remover' onClick={() => removerEspecializacao(especializacao)} />
                        </div>
                    ))}
                </div>
            </div>
        </>
    )
}