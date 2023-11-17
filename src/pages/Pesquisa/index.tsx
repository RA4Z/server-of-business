import { Checkbox, Divider, FormControlLabel, TextField } from '@mui/material'
import { info_especialistas, info_servicos } from './infos'
import { useNavigate } from 'react-router-dom'
import styles from './Pesquisa.module.scss'
import Button from 'components/Button'
import { useParams } from 'react-router-dom'
import Card from 'components/Card'

export default function Pesquisa({ childToParent }: any) {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    const { categoria, especifico } = useParams();
    const navigate = useNavigate()

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
                    info_especialistas.cards.map((card) => (
                        <Card
                            key={card.id}
                            titulo={card.titulo}
                            subtitulo={`${card.estrelas} - ${card.cargo}`}
                            descricao={card.descricao}
                            imagem={card.imagem}
                            premium={card.premium}
                            onClick={() => navigate(`/info/users/${card.id}`)}
                            buttonText='Ver mais informações'
                        />
                    ))
                    :
                    info_servicos.cards.map((card) => (
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
