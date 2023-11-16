import Button from 'components/Button'
import styles from './OptionMenu.module.scss'
import Divider from '@mui/material/Divider'

import { useNavigate } from 'react-router-dom'

interface Props {
    logado: boolean
}

export default function OptionMenu(props: Props) {
    const navigate = useNavigate();

    function deslogar() {
        navigate('/login')
    }

    return (
        <div className={styles.container}>
            <div className={styles.titulo}>Informações Adicionais</div>
            {props.logado ?
                <>
                    <Button texto='Tornar-se Premium' dark={false} />
                    <Button texto='Procurar Especialistas' dark={false} onClick={() => navigate('/pesquisa/1')} />
                    <Button texto='Solicitações em aberto' dark={false} onClick={() => navigate('/pesquisa/2')} />
                    <Button texto='Perfil de Usuário' dark={false} />
                    <Button texto='Logout' onClick={() => deslogar} dark={true} />
                </>
                :
                <>
                    <Button texto='Crie sua conta' dark={true} onClick={() => navigate('/cadastro')} />
                    <Divider style={{ background: '#7C7C7C', width: '100%', margin: 5 }}></Divider>
                    <Button texto='Especialistas Cadastrados' dark={false} onClick={() => navigate('/pesquisa/1')} />
                    <Button texto='Serviços Solicitados em aberto' dark={false} onClick={() => navigate('/pesquisa/2')} />
                    <Button texto='Fazer Login' dark={false} onClick={() => navigate('/login')} />
                </>
            }
        </div>
    )
}