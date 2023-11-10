import Button from 'components/Button'
import styles from './OptionMenu.module.scss'
import Divider from '@mui/material/Divider'

interface Props {
    logado: boolean
}

export default function OptionMenu(props: Props) {
    return (
        <div className={styles.container}>
            <div className={styles.titulo}>Informações Adicionais</div>
            {props.logado ?
                <>
                    <Button texto='Tornar-se Premium' dark={false} />
                    <Button texto='Procurar Especialistas' dark={false} />
                    <Button texto='Solicitações em aberto' dark={false} />
                    <Button texto='Perfil de Usuário' dark={false} />
                    <Button texto='Logout' dark={true} />
                </>
                :
                <>
                    <Button texto='Crie sua conta' dark={true} />
                    <Divider style={{background:'#7C7C7C',width:'100%',margin:5}}></Divider>
                    <Button texto='Especialistas Cadastrados' dark={false} />
                    <Button texto='Serviços Solicitados em aberto' dark={false} />
                    <Button texto='Fazer Login' dark={false} />
                </>
            }
        </div>
    )
}