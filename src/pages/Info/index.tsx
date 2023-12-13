import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom';

import Button from 'components/Button';

import Voltar from 'images/voltar.png'
import ImagemTrabalho from 'images/contratar_freelancer.jpg'
import Estrela from 'images/estrela.svg'
import UserIMG from 'images/user.png'

import styles from './Info.module.scss'

import { atualizarInfoService, infoSolicitado, infoUser } from 'services/firestore';
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Snackbar } from '@mui/material';
import { info_especialistas, info_servicos } from 'utils/infos';
import { User_Interface } from 'types/User';
import { auth } from 'config/firebase';
import dayjs from 'dayjs'

export default function Info(usuarioLogado: User_Interface) {
    useEffect(() => { window.scrollTo({ top: 0, behavior: 'smooth' }); })
    const { categoria, id } = useParams();
    const navigate = useNavigate();
    auth.onAuthStateChanged(usuario => {
        if (!usuario) navigate('/login')
    })

    const [statusToast, setStatusToast] = useState({
        visivel: false,
        message: ''
    })
    const [askCandidatar, setAskCandidatar] = useState(false)
    const [necessario, setNecessario] = useState('')
    const [user, setUser] = useState(info_especialistas[0])
    const [service, setService] = useState(info_servicos[0])

    const aba_atual = categoria === 'users' ? user : service

    useEffect(() => {
        async function addInfo() {
            if (categoria === 'users') await infoUser(id, setUser)
            if (categoria === 'services') {
                await infoSolicitado(id, setService)
                if (service.autonomo && service.freelancer) setNecessario('Autônomos e Freelancers')
                if (service.autonomo && !service.freelancer) setNecessario('Autônomos')
                if (!service.autonomo && service.freelancer) setNecessario('Freelancers')
            }
        }
        addInfo()
    }, [id, categoria, service.autonomo, service.freelancer])

    function direcionarTarefa(categoria: any) {
        if (categoria === 'services') {
            if (service.inscritos.includes(usuarioLogado.id)) {
                setStatusToast({ message: 'Você já está inscrito nessa solicitação!', visivel: true })
            } else if (service.email === usuarioLogado.email) {
                setStatusToast({ message: 'Não é possível se inscrever em sua própria solicitação!', visivel: true })
            } else setAskCandidatar(true)
        } else {
            console.log('Direcionar a um chat')
        }
    }

    const info = {
        titulo: categoria === 'users' ? user.nome : service.titulo,
        descricao: aba_atual.descricao,
        imagem: categoria === 'users' ? user.avatar : service.imagem,
        premium: aba_atual.premium,
        cargo: categoria === 'users' ? user.cargos[0] : '',
        estrelas: categoria === 'users' ? user.estrelas : '',
        data: categoria === 'services' ? service.diaProcurado : '',
        hora: categoria === 'services' ? service.horarioProcurado : '',
        cidade: categoria === 'services' ? service.cidade : '',
        solicitante: categoria === 'services' ? service.solicitante : ''
    }

    async function candidatura() {
        let inscritos = service.inscritos
        inscritos.push(usuarioLogado.id)
        await atualizarInfoService(id!, { inscritos: inscritos })
        setStatusToast({ message: 'Você se inscreveu com sucesso na solicitação!', visivel: true })
        setAskCandidatar(false)
    }

    return (
        <>
            <Dialog
                open={askCandidatar}
                onClose={() => setAskCandidatar(false)}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
                style={{ textAlign: 'center' }}>
                <DialogTitle id="alert-dialog-title">
                    {`Canditatar-se à solicitação`}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Tem certeza de que deseja se candidatar a este serviço?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button dark={false} texto="Cancelar" onClick={() => setAskCandidatar(false)} />
                    <Button dark={true} texto="Candidatar-se" onClick={() => candidatura()} />
                </DialogActions>
            </Dialog>
            <div className={styles.container}>
                <img src={Voltar} alt='Seta para retornar à página anterior' onClick={() => navigate(-1)} className={styles.seta_volta} />
                <div className={styles.info}>
                    <div className={styles.info__titulo}>{info.titulo}</div>
                    <div className={styles.info__desc}>
                        {categoria === 'services' ?
                            <>
                                <img src={info.imagem ? info.imagem : ImagemTrabalho} alt='Imagem do serviço solicitado' className={styles.info__desc__serviceImg} />
                                <p>{info.descricao} registrado para início em {dayjs(info.data).format('DD/MM/YYYY')} às {info.hora}. À procura de {necessario}, solicitado por {info.solicitante}.</p>
                            </>
                            :
                            <>
                                <div className={styles.textos}>
                                    <img src={Estrela} alt='Classificação em estrelas' />
                                    {info.estrelas}
                                </div>
                                <img src={info.imagem ? info.imagem : UserIMG} alt='Imagem de perfil do usuário' className={styles.logotipo} />
                                <div className={styles.textos}>{info.cargo}</div>
                            </>
                        }
                    </div>
                    {categoria === 'users' ? <p>{info.descricao}</p> : ''}
                </div>
                <Button texto={categoria === 'services' ? 'Candidatar-se ao serviço' : 'Contatar Especialista'} dark={true} onClick={() => direcionarTarefa(categoria)} />
            </div>
            <Snackbar
                open={statusToast.visivel}
                onClose={() => setStatusToast({ ...statusToast, visivel: false })}
                autoHideDuration={3000}
                message={statusToast.message}
            />
        </>
    )
}