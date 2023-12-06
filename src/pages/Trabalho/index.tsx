import styles from './Trabalho.module.scss';
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Divider } from '@mui/material';
import { infoSolicitado, infoUser, userInscrito } from 'services/firestore';
import Voltar from 'images/voltar.png';
import Obra from 'images/obra-temp.png';
import UserIMG from 'images/user.png';
import User from './User';
import Estrela from 'images/estrela.svg';

export default function Trabalho() {
    const { jobId } = useParams();
    const navigate = useNavigate();
    const [userVisibility, setUserVisibility] = useState(false);
    const [trabalhoInfo, setTrabalhoInfo] = useState({
        info: {
            id: '0',
            titulo: '',
            solicitante: '',
            diaProcurado: '',
            horarioProcurado: '',
            autonomo: false,
            freelancer: false,
            cidade: '',
            descricao: '',
            imagem: '',
            idContratado: '',
            inscritos: []
        },
        necessario: '',
        userSelecionado: {
            id: '',
            nome: '',
            estrelas: 0,
            cargos: [],
            descricao: '',
            avatar: ''
        },
        inscritos: [{ id: '', nome: '', estrelas: 0, cargos: [], descricao: '', avatar: '' }],
        contratado: { id: '', nome: '', estrelas: 0, cargos: [], descricao: '', avatar: '' }
    });

    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
        async function buscarDados() {
            const fetchedInfo = await infoSolicitado(jobId);
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
        }
        buscarDados();
    }, [jobId]);

    function infoUsuarios(user: any) {
        setUserVisibility(true)
        setTrabalhoInfo((prevState) => ({ ...prevState, userSelecionado: user }));
    }

    const userVisible = (childdata: any) => {
        setUserVisibility(childdata);
    };

    const { info, necessario, inscritos, userSelecionado } = trabalhoInfo;

    return (
        <>
            <div className={styles.pagina_overlay}>
                {userVisibility ?
                    <User
                        visible={userVisible}
                        {...userSelecionado}
                    />
                    : ''}
            </div>
            <div className={styles.container}>
                <img src={Voltar} alt='Seta para retornar à página anterior' onClick={() => navigate(-1)} className={styles.seta_volta} />
                <div className={styles.info}>
                    <div className={styles.info__titulo}>{info.titulo}</div>
                    <div className={styles.info__desc}>
                        <img src={Obra} alt='Imagem do serviço solicitado' className={styles.info__desc__serviceImg} />
                        <p>{info.descricao} registrado para início em {info.diaProcurado} às {info.horarioProcurado}. À procura de {necessario}, solicitado por {info.solicitante}.</p>
                    </div>
                </div>
                <Divider />
                <div>
                    <div className={styles.especialistas__title}>Especialistas Candidatados</div>
                    <div className={styles.especialistas__cards}>
                        {trabalhoInfo.info.idContratado === '' ?
                            inscritos.map((inscrito, keyId) => (
                                <div className={styles.especialistas__card} key={keyId} onClick={() => infoUsuarios(inscrito)}>
                                    <img src={UserIMG} alt='Perfil de usuário' />
                                    <div>
                                        <p>{inscrito.nome}</p>
                                        <p><img src={Estrela} alt='Estrela' />{inscrito.estrelas}</p>
                                    </div>
                                </div>
                            ))
                            :
                            <div className={styles.especialistas__card}>
                                <img src={UserIMG} alt='Perfil de usuário' />
                                <div>
                                    <p>{trabalhoInfo.contratado.nome}</p>
                                    <p><img src={Estrela} alt='Estrela' />{trabalhoInfo.contratado.estrelas}</p>
                                </div>
                            </div>}
                    </div>
                </div>
            </div>
        </>
    );
}
