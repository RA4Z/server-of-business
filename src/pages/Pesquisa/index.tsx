import { Checkbox, Divider, FormControlLabel, TextField } from '@mui/material'
import { info_preenchida } from './infos'
import styles from './Pesquisa.module.scss'
import Button from 'components/Button'
import { useParams } from 'react-router-dom'
import Card from 'components/Card'

export default function Pesquisa({ childToParent }: any) {
    const { categoria, especifico } = useParams();

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
                        <TextField id="outlined-name" label={info_preenchida[Number(categoria) - 1].titulo} variant="outlined" autoComplete="username" className={styles.input} />
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

            <div className={styles.container}>
                {info_preenchida[Number(categoria) - 1].cards.map((card) => (
                    <Card
                        key={card.titulo}
                        titulo={card.titulo}
                        descricao={card.descricao}
                        imagem={card.imagem}
                        buttonText='Ver mais informações'
                    />
                ))}
            </div>
        </>
    )
}
