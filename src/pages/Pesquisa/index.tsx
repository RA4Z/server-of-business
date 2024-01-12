import { memo, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Checkbox, Divider, FormControlLabel, TextField } from '@mui/material'

import styles from './Pesquisa.module.scss'
import Card from 'components/Card'

import ImagemTrabalho from 'images/contratar_freelancer.jpg'
import UserIMG from 'images/user.png'

import { info_especialistas, info_servicos } from 'utils/infos'
import { visualizarSolicitados, visualizarUsuarios } from 'services/firestore'
import TextoTitulos from 'components/TextoTitulos'
import { regexTest } from 'utils/common';

interface Props {
    childToParent: any,
    estado: string
}

function Pesquisa({ childToParent, estado }: Props) {
    useEffect(() => { window.scrollTo({ top: 0, behavior: 'smooth' }); })
    const { categoria, especifico } = useParams();
    const [filtro, setFiltro] = useState({ nome: '', cidade: '', especializacao: '', freelancer: especifico === 'free' ? true : false, autonomo: especifico === 'auto' ? true : false })
    const [services, setServices] = useState(info_servicos)
    const [backupServices, setBackupServices] = useState(info_servicos)
    const [infoSearch, setInfoSearch] = useState({ users: false, services: false })
    const [users, setUsers] = useState(info_especialistas)
    const [backupUser, setBackupUser] = useState(info_especialistas)
    const navigate = useNavigate()

    useEffect(() => {
        async function buscarUsers() {
            if (categoria === '1' && !infoSearch.users && estado !== '') {
                await visualizarUsuarios(setUsers, setBackupUser, estado)
                setInfoSearch({ ...infoSearch, users: true })
            }
            if (categoria === '2' && !infoSearch.services && estado !== '') {
                await visualizarSolicitados(setServices, setBackupServices, estado)
                setInfoSearch({ ...infoSearch, services: true })
            }
        }
        buscarUsers()
    }, [backupUser, backupServices, categoria, infoSearch, estado])

    useEffect(() => {
        function filtrarEspecialistaUser(novaLista: typeof users) {
            let lista = novaLista.filter(item => item.freelancer === true || item.autonomo === true)
            if (filtro.autonomo && !filtro.freelancer) lista = lista.filter(item => item.autonomo === true)
            if (filtro.freelancer && !filtro.autonomo) lista = lista.filter(item => item.freelancer === true)
            return lista
        }
        function filtrarEspecialistaService(novaLista: typeof services) {
            let lista = novaLista.filter(item => item.freelancer === true || item.autonomo === true)
            if (filtro.autonomo && !filtro.freelancer) lista = lista.filter(item => item.autonomo === true)
            if (filtro.freelancer && !filtro.autonomo) lista = lista.filter(item => item.freelancer === true)
            return lista
        }
        if (categoria === '1') {
            let novaLista = backupUser.filter(item => regexTest(item.nome, filtro.nome) && regexTest(item.cargos, filtro.especializacao) && regexTest(item.cidade, filtro.cidade))
            novaLista = filtrarEspecialistaUser(novaLista)
            novaLista.sort(item => item.premium ? -1 : 1)
            setUsers(novaLista)
        } else {
            let novaLista = backupServices.filter(item => regexTest(item.titulo, filtro.nome) && regexTest(item.cargos, filtro.especializacao) && regexTest(item.cidade, filtro.cidade))
            novaLista = filtrarEspecialistaService(novaLista)
            novaLista.sort((a, b) => (a.diaProcurado < b.diaProcurado) ? -1 : 1)
            novaLista.sort(item => item.premium ? -1 : 1)
            setServices(novaLista)
        }
    }, [backupUser, filtro, backupServices, categoria, estado])

    switch (categoria) {
        case '1':
            childToParent(1)
            break;
        case '2':
            childToParent(2)
            break;
        default:
            alert('Erro Inesperado no Direcionamento!')
    }

    return (
        <>
            <form>
                <div className={styles.pesquisas}>
                    <div className={styles.pesquisas__left}>
                        <TextField id="outlined-name"
                            label={categoria === '1' ? 'Nome Especialista' : 'Título do Serviço'}
                            value={filtro.nome}
                            onChange={e => setFiltro({ ...filtro, nome: e.target.value })}
                            variant="outlined"
                            className={styles.input} />
                        <div>
                            <FormControlLabel control={
                                <Checkbox checked={filtro.freelancer}
                                    onChange={e => setFiltro({ ...filtro, freelancer: e.target.checked })} />}
                                label="Freelancer"
                                className={styles.check} />

                            <FormControlLabel control={
                                <Checkbox checked={filtro.autonomo}
                                    onChange={e => setFiltro({ ...filtro, autonomo: e.target.checked })} />}
                                label="Autônomo"
                                className={styles.check} />
                        </div>
                    </div>
                    <div className={styles.pesquisas__right}>

                        <TextField id="outlined-city"
                            label="Cidade"
                            value={filtro.cidade}
                            onChange={e => setFiltro({ ...filtro, cidade: e.target.value })}
                            variant="outlined"
                            autoComplete="cidade"
                            className={styles.input} />

                        <TextField id="outlined-special"
                            label="Tipo de Especialização"
                            value={filtro.especializacao}
                            onChange={e => setFiltro({ ...filtro, especializacao: e.target.value })}
                            variant="outlined"
                            className={styles.input} />

                    </div>
                </div>
                <Divider style={{ background: '#7C7C7C', width: 'auto', margin: 25 }}></Divider>
            </form>

            <div id='card_container' className={styles.container}>

                {estado !== '' ? <>
                    {categoria === '1' ?
                        <>
                            {users.length > 0 ? users.map((card) => (
                                <Card
                                    key={card.id}
                                    titulo={card.nome}
                                    subtitulo={`${Number(card.estrelas).toFixed(2)} - ${card.cargos[0]}`}
                                    imagem={card.avatar ? card.avatar : UserIMG}
                                    premium={card.premium}
                                    onClick={() => navigate(`/info/users/${card.id}`)}
                                    buttonText='Ver mais informações'
                                />
                            )) : <TextoTitulos>Nenhum usuário encontrado!</TextoTitulos>}
                        </>
                        :
                        <>
                            {services.length > 0 ? services.map((card) => (
                                <Card
                                    key={card.id}
                                    titulo={card.titulo}
                                    imagem={card.imagem ? card.imagem : ImagemTrabalho}
                                    premium={card.premium}
                                    onClick={() => navigate(`/info/services/${card.id}`)}
                                    buttonText='Ver mais informações'
                                />
                            )) : <TextoTitulos>Nenhum serviço em aberto na sua região encontrado!</TextoTitulos>}
                        </>
                    }
                </> : <TextoTitulos>Entre em sua conta para conseguir visualizar os {categoria === '1' ? 'especialistas cadastrados' : 'serviços em aberto'}</TextoTitulos>}
            </div>
        </>
    )
}
export default memo(Pesquisa)