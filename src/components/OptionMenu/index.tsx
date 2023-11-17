import Button from 'components/Button'
import styles from './OptionMenu.module.scss'
import Divider from '@mui/material/Divider'
import { useNavigate } from 'react-router-dom'
import { useRef, useEffect } from "react";

interface Props {
    logado: boolean,
    mostrarOption: any
}

export default function OptionMenu(props: Props) {
    const navigate = useNavigate();
    const wrapperRef = useRef(null);
    useOutsideAlerter(wrapperRef);

    function useOutsideAlerter(ref: any) {
        useEffect(() => {
            function handleClickOutside(event: any) {
                if (ref.current && !ref.current.contains(event.target)) {
                    props.mostrarOption(false)
                }
            }
            document.addEventListener("mousedown", handleClickOutside);
            return () => {
                document.removeEventListener("mousedown", handleClickOutside);
            };
        }, [ref]);
    }

    function deslogar() {
        navigate('/login')
    }

    function navegar(path: string) {
        props.mostrarOption(false)
        navigate(path)
    }

    return (
        <div ref={wrapperRef} className={styles.container}>
            <div className={styles.titulo}>Informações Adicionais</div>
            {props.logado ?
                <>
                    <Button texto='Tornar-se Premium' dark={false} />
                    <Button texto='Procurar Especialistas' dark={false} onClick={() => navegar('/pesquisa/1')} />
                    <Button texto='Solicitações em aberto' dark={false} onClick={() => navegar('/pesquisa/2')} />
                    <Button texto='Perfil de Usuário' dark={false} onClick={() => navegar('/perfil')} />
                    <Button texto='Logout' onClick={() => deslogar} dark={true} />
                </>
                :
                <>
                    <Button texto='Crie sua conta' dark={true} onClick={() => navegar('/cadastro')} />
                    <Divider style={{ background: '#7C7C7C', width: '100%', margin: 5 }}></Divider>
                    <Button texto='Especialistas Cadastrados' dark={false} onClick={() => navegar('/pesquisa/1')} />
                    <Button texto='Serviços Solicitados em aberto' dark={false} onClick={() => navegar('/pesquisa/2')} />
                    <Button texto='Fazer Login' dark={false} onClick={() => navegar('/login')} />
                </>
            }
        </div>
    )
}