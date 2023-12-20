import styles from './Trabalho.module.scss';
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Divider, Snackbar } from '@mui/material';
import { atualizarInfoUser, deletarSolicitacao, infoSolicitado, infoUser, userInscrito } from 'services/firestore';
import Voltar from 'images/voltar.png';
import ImagemTrabalho from 'images/contratar_freelancer.jpg'
import UserIMG from 'images/user.png';
import User from './User';
import Estrela from 'images/estrela.svg';
import ImportImage from 'components/ImportImage';
import dayjs from 'dayjs'
import NotFound from 'pages/NotFound';
import { auth } from 'config/firebase';
import Button from 'components/Button';
import { Rating } from '@mui/material'
import { timeout } from 'utils/common';
import Chat from 'components/Chat';
import { sendNotification } from 'services/database';

interface UserInformation {
    id: any,
    nome: string,
    estrelas: number,
    cargos: string[],
    descricao: string,
    avatar: string,
    avaliacoes: number
}

export default function Trabalho({ usuarioLogado, setLoad }: any) {
    const { jobId } = useParams();
    const navigate = useNavigate();
    auth.onAuthStateChanged(usuario => {
        if (!usuario) navigate('/login')
    })
    const [statusToast, setStatusToast] = useState({
        visivel: false,
        message: ''
    })
    const [contatarChat, setContatarChat] = useState(false)
    const [avaliacao, setAvaliacao] = useState<number | null>(5)
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
            avaliacoes: 1,
            inscritos: [],
            cargos: []
        },
        necessario: '',
        userSelecionado: { id: '', nome: '', estrelas: 0, cargos: [], descricao: '', avatar: '', avaliacoes: 1 },
        inscritos: [],
        contratado: { id: '', nome: '', estrelas: 0, cargos: [], descricao: '', avatar: '', avaliacoes: 1 }
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
        setLoad(true)
        const response = await deletarSolicitacao(jobId!)
        setLoad(false)
        if (response === 'ok') {
            if (trabalhoInfo.info.idContratado !== '') await sendNotification(trabalhoInfo.info.idContratado, `Serviço Cancelado`, `O usuário ${usuarioLogado.nome} cancelou o serviço "${trabalhoInfo.info.titulo}"!`, 'Cancelado')
            setStatusToast({ message: 'Solicitação deletada com sucesso!', visivel: true })
            await timeout(2000)
            navigate(-1)
        } else {
            setStatusToast({ message: 'Ocorreu algum erro ao tentar deletar a solicitação! Tente novamente mais tarde!', visivel: true })
            setDeletar(false)
        }
    }

    async function concluirSolicitacao() {
        if (trabalhoInfo.info.idContratado === '') {
            setStatusToast({ message: 'Não é permitido concluir uma solicitação sem nenhum usuário contratado!', visivel: true })
            return
        }
        if (avaliacao === 0 || avaliacao === null) {
            setStatusToast({ message: 'Não é permitido dar nota zero ao Especialista contratado!', visivel: true })
            return
        }
        const numeroAvalia = Number((((trabalhoInfo.contratado.estrelas * trabalhoInfo.contratado.avaliacoes) + avaliacao) / (trabalhoInfo.contratado.avaliacoes + 1)).toFixed(2))
        setLoad(true)
        const response = await deletarSolicitacao(jobId!)
        setLoad(false)
        if (response === 'ok') {
            await sendNotification(trabalhoInfo.info.idContratado, `Serviço Concluído com sucesso`, `O usuário ${usuarioLogado.nome} registrou o serviço "${trabalhoInfo.info.titulo}" como concluído, obrigado pela ajuda!`, 'Concluído')
            setStatusToast({ message: 'Solicitação concluída com sucesso! Aguarde um momento...', visivel: true })
            await atualizarInfoUser(trabalhoInfo.info.idContratado, { avaliacoes: trabalhoInfo.contratado.avaliacoes + 1, estrelas: numeroAvalia })
            await timeout(2000)
            navigate(-1)
        } else {
            setStatusToast({ message: 'Ocorreu algum erro ao tentar encerrar a solicitação! Tente novamente mais tarde!', visivel: true })
            setConcluirProjeto(false)
        }
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
                        <div>Tem certeza de que deseja deletar essa solicitação?</div>
                        <div>Essa ação é irreversível!</div>
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
                        <div>Você está concluindo a solicitação "{info.titulo}".</div>
                        <div>Por favor, avalie o Especialista Contratado</div>
                    </DialogContentText>
                    {trabalhoInfo.contratado.id !== '' && <Rating
                        name="hover-feedback"
                        value={avaliacao}
                        onChange={(e, newValue) => setAvaliacao(newValue)}
                        precision={1}
                        size='large'
                    />}
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
                    <div className={styles.especialistas__title}>{trabalhoInfo.contratado.id === '' ? 'Especialistas Candidatados' : 'Especialista Responsável'}</div>
                    <div className={styles.especialistas__cards}>
                        {trabalhoInfo.info.idContratado === '' ?
                            inscritos.map((inscrito, keyId) => (
                                <div className={styles.especialistas__card} key={keyId} onClick={() => infoUsuarios(inscrito)}>
                                    <img className={styles.especialistas__card__avatar} src={inscrito.avatar ? inscrito.avatar : UserIMG} alt='Perfil de usuário' />
                                    <div>
                                        <p>{inscrito.nome}</p>
                                        <p><img src={Estrela} alt='Estrela' />{Number(inscrito.estrelas).toFixed(2)}</p>
                                    </div>
                                </div>
                            ))
                            :
                            <div className={styles.especialistas__card} onClick={() => setContatarChat(true)}>
                                <img className={styles.especialistas__card__avatar} src={trabalhoInfo.contratado.avatar ? trabalhoInfo.contratado.avatar : UserIMG} alt='Perfil de usuário' />
                                <div>
                                    <p>{trabalhoInfo.contratado.nome}</p>
                                    <p><img src={Estrela} alt='Estrela' />{Number(trabalhoInfo.contratado.estrelas).toFixed(2)}</p>
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
            {contatarChat && <Chat idProjeto={jobId} user={usuarioLogado}
                contatarChat={contatarChat} setContatarChat={setContatarChat}
                receptor={trabalhoInfo.contratado.nome} />}
        </>
    );
}
