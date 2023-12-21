import { User_Interface } from 'types/User'
import logo from 'images/logo.svg'
import styles from './Planos.module.scss'
import TextoTitulos from 'components/TextoTitulos'
import Plano from './Plano'
import { useState } from 'react'
import { Snackbar } from '@mui/material'

export default function Planos(usuarioLogado: User_Interface) {
    const [statusToast, setStatusToast] = useState({
        visivel: false,
        message: ''
    })
    async function selecionarPlano(plano: string) {
        if (usuarioLogado.planoAtual !== undefined) {
            if (usuarioLogado.planoAtual === plano) {
                setStatusToast({ message: 'Você já possui este plano!', visivel: true })
            }
        } else {
            console.log(`Selecionando Plano ${plano}`)
        }
    }
    return (
        <div className={styles.container}>
            <img className={styles.logotipo} src={logo} alt='Logo do projeto' />
            <TextoTitulos>Planos Premium</TextoTitulos>
            <li className={styles.container__texto}>Status atual de {usuarioLogado.nome}: {usuarioLogado.premium ? 'Ativo' : 'Inativo'}</li>

            <div className={styles.container__planos}>
                <Plano titulo='Premium Padrão'
                    valor={19.99}
                    onClick={() => selecionarPlano('Padrão')}
                    descricao='Com esse plano você enviará e receberá notificações de serviços de outros usuários Premium quando as Especialidades batem com os requisitos.' />

                <Plano titulo='Premium Especial'
                    valor={39.99}
                    onClick={() => selecionarPlano('Especial')}
                    descricao='Com esse plano você enviará e receberá notificações de serviços de todos os usuários quando as Especialidades batem com os requisitos.' />
            </div>
            <Snackbar
                open={statusToast.visivel}
                onClose={() => setStatusToast({ ...statusToast, visivel: false })}
                autoHideDuration={3000}
                message={statusToast.message} />
        </div>
    )
}