import { memo, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Checkbox, Divider, FormControlLabel, TextField } from '@mui/material'

import styles from './Pesquisa.module.scss'
import Card from 'components/Card'

import ImagemTrabalho from 'images/contratar_freelancer.jpg'
import UserIMG from 'images/user.png'

import { info_especialistas, info_servicos } from 'utils/infos'
import { visualizarSolicitados, visualizarUsuarios } from 'services/firestore'

function Pesquisa({ childToParent }: any) {
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
            if (categoria === '1' && !infoSearch.users) {
                await visualizarUsuarios(setUsers, setBackupUser)
                setInfoSearch({ ...infoSearch, users: true })
            }
            if (categoria === '2' && !infoSearch.services) {
                await visualizarSolicitados(setServices, setBackupServices)
                setInfoSearch({ ...infoSearch, services: true })
            }
        }
        buscarUsers()
    }, [backupUser, backupServices, categoria, infoSearch])

    useEffect(() => {
        function testaNome(title: string) {
            const regex = new RegExp(filtro.nome, 'i');
            return regex.test(title);
        }
        function testaCargo(cargo: any) {
            const regex = new RegExp(filtro.especializacao, 'i');
            return regex.test(cargo);
        }
        function testaCidade(cidade: string) {
            const regex = new RegExp(filtro.cidade, 'i');
            return regex.test(cidade);
        }
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
            let novaLista = backupUser.filter(item => testaNome(item.nome) && testaCargo(item.cargos) && testaCidade(item.cidade))
            novaLista = filtrarEspecialistaUser(novaLista)
            setUsers(novaLista)
        } else {
            let novaLista = backupServices.filter(item => testaNome(item.titulo) && testaCargo(item.cargos) && testaCidade(item.cidade))
            novaLista = filtrarEspecialistaService(novaLista)
            setServices(novaLista)
        }
    }, [backupUser, filtro, backupServices, categoria])

    switch (categoria) {
        case '1':
            childToParent(1)
            break;
        case '2':
            childToParent(2)
            break;
        default:
            console.log('Erro Inesperado no Direcionamento!')
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
                            autoComplete="username"
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
                            autoComplete="city"
                            className={styles.input} />

                        <TextField id="outlined-special"
                            label="Tipo de Especialização"
                            value={filtro.especializacao}
                            onChange={e => setFiltro({ ...filtro, especializacao: e.target.value })}
                            variant="outlined"
                            autoComplete="type"
                            className={styles.input} />

                    </div>
                </div>
                <Divider style={{ background: '#7C7C7C', width: 'auto', margin: 25 }}></Divider>
            </form>

            <div id='card_container' className={styles.container}>
                {categoria === '1' ?
                    users.map((card) => (
                        <Card
                            key={card.id}
                            titulo={card.nome}
                            subtitulo={`${card.estrelas} - ${card.cargos[0]}`}
                            imagem={card.avatar ? card.avatar : UserIMG}
                            premium={card.premium}
                            onClick={() => navigate(`/info/users/${card.id}`)}
                            buttonText='Ver mais informações'
                        />
                    ))
                    :
                    services.map((card) => (
                        <Card
                            key={card.id}
                            titulo={card.titulo}
                            imagem={card.imagem ? card.imagem : ImagemTrabalho}
                            premium={card.premium}
                            onClick={() => navigate(`/info/services/${card.id}`)}
                            buttonText='Ver mais informações'
                        />
                    ))}
            </div>
        </>
    )
}
export default memo(Pesquisa)