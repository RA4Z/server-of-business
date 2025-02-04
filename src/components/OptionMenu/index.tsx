import Button from 'components/Button'
import styles from './OptionMenu.module.scss'
import Divider from '@mui/material/Divider'
import { useNavigate } from 'react-router-dom'
import { useRef, useEffect, memo } from "react";

import { signOut } from 'firebase/auth';
import { auth } from 'config/firebase';
import { Dialog, DialogContent, DialogTitle } from '@mui/material';

interface Props {
    logado: boolean,
    mostrarOption: any,
}

function OptionMenu(props: Props) {
    const navigate = useNavigate();
    const wrapperRef = useRef(null);
    useOutsideAlerter(wrapperRef);

    const handleLogout = () => {
        signOut(auth).then(() => {
            navigate("/login");
            window.location.reload()
        }).catch((error) => {
            // An error happened.
        });
    }

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

    function navegar(path: string) {
        props.mostrarOption(false)
        navigate(path)
    }

    return (
        <>
            <Dialog
                open={props.mostrarOption}
                onClose={() => props.mostrarOption(false)}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
                className={styles.background}>
                <DialogTitle id="alert-dialog-title" style={{ background: '#e8e7e7' }}>
                    {`Informações Adicionais`}
                </DialogTitle>
                <DialogContent className={styles.container}>
                    {props.logado ?
                        <>
                            {/* <Button texto='Tornar-se Premium' dark={false} onClick={() => navegar('/planos')} /> */}
                            <Button texto='Procurar Especialistas' dark={false} onClick={() => navegar('/pesquisa/1')} />
                            <Button texto='Solicitações em aberto' dark={false} onClick={() => navegar('/pesquisa/2')} />
                            <Button texto='Perfil de Usuário' dark={false} onClick={() => navegar('/perfil')} />
                            <Button texto='Logout' onClick={() => handleLogout()} dark={true} />
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
                </DialogContent>
            </Dialog>
        </>
    )
}
export default memo(OptionMenu)