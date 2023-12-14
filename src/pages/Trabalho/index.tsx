import styles from './Trabalho.module.scss';
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Divider, Snackbar } from '@mui/material';
import { deletarSolicitacao, infoSolicitado, infoUser, userInscrito } from 'services/firestore';
import Voltar from 'images/voltar.png';
import ImagemTrabalho from 'images/contratar_freelancer.jpg'
import UserIMG from 'images/user.png';
import User from './User';
import Estrela from 'images/estrela.svg';
import ImportImage from 'components/ImportImage';
import dayjs from 'dayjs'
import NotFound from 'pages/NotFound';
import { User_Interface } from 'types/User';
import { auth } from 'config/firebase';
import Button from 'components/Button';
import { timeout } from 'utils/common';

interface UserInformation {
    id: any,
    nome: string,
    estrelas: number,
    cargos: string[],
    descricao: string,
    avatar: string
}

export default function Trabalho(usuarioLogado: User_Interface) {
    const { jobId } = useParams();
    const navigate = useNavigate();
    auth.onAuthStateChanged(usuario => {
        if (!usuario) navigate('/login')
    })
    const [statusToast, setStatusToast] = useState({
        visivel: false,
        message: ''
    })
    const [deletar, setDeletar] = useState(false)
    const [concluirProjeto, setConcluirProjeto] = useState(false)
    const [erroNotFound, setErroNotFound] = useState(false)
    const [userVisibility, setUserVisibility] = useState(false);
    const [trabalhoInfo, setTrabalhoInfo] = useState<{
        info: any;
        necessario: string;
        userSelecionado: UserInformation;
        inscritos: UserInformation[]; // Alterado para o tipo UserInformation[]
        contratado: UserInformation; // Alterado para o tipo UserInformation
    }>({
        info: {
            id: jobId,
            titulo: '',
            solicitante: '',
            descricao: '',
            premium: false,
            imagem: '',
            idContratado: '',
            horarioProcurado: '',
            diaProcurado: '',
            email: '',
            cidade: '',
            freelancer: false,
            autonomo: false,
            inscritos: [],
            cargos: []
        },
        necessario: '',
        userSelecionado: { id: '', nome: '', estrelas: 0, cargos: [], descricao: '', avatar: '' },
        inscritos: [],
        contratado: { id: '', nome: '', estrelas: 0, cargos: [], descricao: '', avatar: '' }
    });

    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
        async function buscarDados() {
            const fetchedInfo = await infoSolicitado(jobId);
            if (fetchedInfo !== undefined) {
                setTrabalhoInfo((prevState) => ({
                    ...prevState,
                    info: fetchedInfo,
                    necessario: (fetchedInfo.autonomo && fetchedInfo.freelancer) ? 'Autônomos e Freelancers' :
                        (fetchedInfo.autonomo && !fetchedInfo.freelancer) ? 'Autônomos' :
                            (!fetchedInfo.autonomo && fetchedInfo.freelancer) ? 'Freelancers' : ''
                }));
                if (fetchedInfo.idContratado === '') {
                    if (fetchedInfo.inscritos.length > 0) {
                        setTrabalhoInfo((prevState) => ({
                            ...prevState,
                            inscritos: fetchedInfo.inscritos
                        }));
                        userInscrito(fetchedInfo.inscritos, (users: any) => {
                            setTrabalhoInfo((prevState) => ({
                                ...prevState,
                                inscritos: users
                            }));
                        });
                    }
                } else {
                    infoUser(fetchedInfo.idContratado, (user: any) => {
                        setTrabalhoInfo((prevState) => ({
                            ...prevState,
                            contratado: user
                        }));
                    });
                }
                if (usuarioLogado.email !== fetchedInfo.email && usuarioLogado.email !== '') navigate(-1)
            } else setErroNotFound(true)
        }
        buscarDados();
    }, [jobId, usuarioLogado.email, navigate]);

    if (erroNotFound) {
        return <NotFound />;
    }

    function infoUsuarios(user: any) {
        setUserVisibility(true)
        setTrabalhoInfo((prevState) => ({ ...prevState, userSelecionado: user }));
    }

    const userVisible = (childdata: any) => {
        setUserVisibility(childdata);
    };

    async function cancelarSolicitacao() {
        const response = await deletarSolicitacao(jobId!)
        if (response === 'ok') {
            setStatusToast({ message: 'Solicitação deletada com sucesso!', visivel: true })
            await timeout(3000)
            navigate(-1)
        } else {
            setStatusToast({ message: 'Ocorreu algum erro ao tentar deletar a solicitação! Tente novamente mais tarde!', visivel: true })
        }
    }

    async function concluirSolicitacao() {
        if(trabalhoInfo.contratado.id === '') {
            setStatusToast({ message: 'Não é permitido concluir uma solicitação sem nenhum usuário contratado!', visivel: true })
            return
        }
        console.log('concluído')
    }

    const { info, necessario, inscritos, userSelecionado } = trabalhoInfo;
    return (
        <>
            <Dialog
                open={deletar}
                onClose={() => setDeletar(false)}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
                style={{ textAlign: 'center' }}>
                <DialogTitle id="alert-dialog-title">
                    {`Cancelar Solicitação`}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Tem certeza de que deseja deletar essa solicitação? Essa ação é irreversível!
                    </DialogContentText>
                </DialogContent>
                <DialogActions style={{ display: 'flex', justifyContent: 'center' }}>
                    <Button dark={false} texto="Cancelar" onClick={() => setDeletar(false)} />
                    <Button dark={true} texto="Deletar Solicitação" onClick={() => cancelarSolicitacao()} />
                </DialogActions>
            </Dialog>
            <Dialog
                open={concluirProjeto}
                onClose={() => setConcluirProjeto(false)}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
                style={{ textAlign: 'center' }}>
                <DialogTitle id="alert-dialog-title">
                    {`Concluir Projeto`}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Você está concluindo a solicitação "{info.titulo}"
                    </DialogContentText>
                </DialogContent>
                <DialogActions style={{ display: 'flex', justifyContent: 'center' }}>
                    <Button dark={false} texto="Cancelar Conclusão" onClick={() => setConcluirProjeto(false)} />
                    <Button dark={true} texto="Concluir Solicitação" onClick={() => concluirSolicitacao()} />
                </DialogActions>
            </Dialog>

            <div className={styles.pagina_overlay}>
                {userVisibility ?
                    <User
                        visible={userVisible}
                        {...userSelecionado}
                        serviceId={jobId}
                        service={trabalhoInfo.info}
                    />
                    : ''}
            </div>
            <div className={styles.container}>
                <img src={Voltar} alt='Seta para retornar à página anterior' onClick={() => navigate(-1)} className={styles.seta_volta} />
                <div className={styles.info}>
                    <div className={styles.info__titulo}>{info.titulo}</div>
                    <div className={styles.info__desc}>
                        <div>
                            <img src={trabalhoInfo.info.imagem ? trabalhoInfo.info.imagem : ImagemTrabalho} alt='Imagem do serviço solicitado' className={styles.info__desc__serviceImg} />
                            <ImportImage serviceId={jobId} service={true} />
                        </div>
                        <p>{info.descricao} registrado para início em {dayjs(info.diaProcurado).format('DD/MM/YYYY')} às {info.horarioProcurado}. À procura de {necessario}, solicitado por {info.solicitante}.</p>
                    </div>
                    <div className={styles.botoes}>
                        <Button dark={false} texto='Cancelar Solicitação' onClick={() => setDeletar(true)} />
                        <Button dark={true} texto='Concluir Solicitação' onClick={() => setConcluirProjeto(true)} />
                    </div>
                </div>
                <Divider />
                <div>
                    <div className={styles.especialistas__title}>Especialistas Candidatados</div>
                    <div className={styles.especialistas__cards}>
                        {trabalhoInfo.info.idContratado === '' ?
                            inscritos.map((inscrito, keyId) => (
                                <div className={styles.especialistas__card} key={keyId} onClick={() => infoUsuarios(inscrito)}>
                                    <img className={styles.especialistas__card__avatar} src={inscrito.avatar ? inscrito.avatar : UserIMG} alt='Perfil de usuário' />
                                    <div>
                                        <p>{inscrito.nome}</p>
                                        <p><img src={Estrela} alt='Estrela' />{inscrito.estrelas}</p>
                                    </div>
                                </div>
                            ))
                            :
                            <div className={styles.especialistas__card}>
                                <img src={trabalhoInfo.contratado.avatar ? trabalhoInfo.contratado.avatar : UserIMG} alt='Perfil de usuário' />
                                <div>
                                    <p>{trabalhoInfo.contratado.nome}</p>
                                    <p><img src={Estrela} alt='Estrela' />{trabalhoInfo.contratado.estrelas}</p>
                                </div>
                            </div>}
                    </div>
                </div>
            </div>
            <Snackbar
                open={statusToast.visivel}
                onClose={() => setStatusToast({ ...statusToast, visivel: false })}
                autoHideDuration={3000}
                message={statusToast.message}
            />
        </>
    );
}
