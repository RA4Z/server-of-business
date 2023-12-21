import { User_Interface } from 'types/User'
import logo from 'images/logo.svg'
import styles from './Planos.module.scss'
import TextoTitulos from 'components/TextoTitulos'
import Plano from './Plano'

export default function Planos(usuarioLogado: User_Interface) {
    return (
        <div className={styles.container}>
            <img className={styles.logotipo} src={logo} alt='Logo do projeto' />
            <TextoTitulos>Planos Premium</TextoTitulos>
            <li className={styles.container__texto}>Status atual de {usuarioLogado.nome}: {usuarioLogado.premium ? 'Ativo' : 'Inativo'}</li>

            <div className={styles.container__planos}>
                <Plano titulo='Mensal' valor={19.99} descricao='Escrever informações básicas sobre o plano' />
            </div>

        </div>
    )
}