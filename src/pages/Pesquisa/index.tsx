import { Checkbox, Divider, FormControlLabel, TextField } from '@mui/material'
import { memo, useEffect, useState } from 'react'
import { info_especialistas, info_servicos } from 'utils/infos'
import { useNavigate } from 'react-router-dom'
import styles from './Pesquisa.module.scss'
import Button from 'components/Button'
import { useParams } from 'react-router-dom'
import UserIMG from 'images/user.png'
import Card from 'components/Card'
import { visualizarUsuarios } from 'services/firestore'

function Pesquisa({ childToParent }: any) {
    const { categoria, especifico } = useParams();
    const [users, setUsers] = useState(info_especialistas)
    const navigate = useNavigate()

    useEffect(() => {
        async function buscarUsers() {
            if (users.length <= 1 && categoria === '1') {
                await visualizarUsuarios(setUsers)
            }
        }
        buscarUsers()
    }, [users, categoria])

    useEffect(() => { window.scrollTo({ top: 0, behavior: 'smooth' }); })

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
                        <TextField id="outlined-name" label={categoria === '1' ? 'Nome Especialista' : 'Título do Serviço'} variant="outlined" autoComplete="username" className={styles.input} />
                        <div>
                            <FormControlLabel control={<Checkbox defaultChecked={especifico === 'free' ? true : false} />} label="Freelancer" className={styles.check} />
                            <FormControlLabel control={<Checkbox defaultChecked={especifico === 'auto' ? true : false} />} label="Autônomo" className={styles.check} />
                        </div>
                    </div>
                    <div className={styles.pesquisas__right}>
                        <TextField id="outlined-city" label="Cidade" variant="outlined" autoComplete="city" className={styles.input} />
                        <TextField id="outlined-special" label="Tipo de Especialização" variant="outlined" autoComplete="type" className={styles.input} />
                    </div>
                </div>
                <Button dark={true} texto='Pesquisar' />
                <Divider style={{ background: '#7C7C7C', width: 'auto', margin: 25 }}></Divider>
            </form>

            <div id='card_container' className={styles.container}>
                {categoria === '1' ?
                    users.map((card) => (
                        <Card
                            key={card.id}
                            titulo={card.nome}
                            subtitulo={`${card.estrelas} - ${card.cargos[0]}`}
                            imagem={card.imagem ? card.imagem : UserIMG}
                            premium={card.premium}
                            onClick={() => navigate(`/info/users/${card.id}`)}
                            buttonText='Ver mais informações'
                        />
                    ))
                    :
                    info_servicos.map((card) => (
                        <Card
                            key={card.id}
                            titulo={card.titulo}
                            descricao={card.descricao}
                            imagem={card.imagem}
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