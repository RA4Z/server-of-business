import styles from './User.module.scss'

import Button from 'components/Button'

import Estrela from 'images/estrela.svg'
import UserIMG from 'images/user.png'

interface Props {
    id: string,
    visible: any,
    nome: string,
    estrelas: number,
    avatar: string,
    cargos: string[],
    descricao: string
}

export default function User(props: Props) {
    return (
        <>
            <div className={styles.overlay} onClick={() => props.visible(false)} />
            <div className={styles.container}>
                <div className={styles.info__titulo}>{props.nome}</div>
                <div className={styles.info__desc}>
                    <div className={styles.textos}>
                        <img src={Estrela} alt='Classificação em estrelas' />
                        {props.estrelas}
                    </div>
                    <img src={props.avatar !== '' ? props.avatar : UserIMG} alt='Imagem de perfil do usuário' className={styles.logotipo} />
                    <div className={styles.textos}>{props.cargos[0]}</div>
                    <div className={styles.textos}>{props.descricao}</div>
                </div>
                <Button texto='Aprovar candidato' dark={true} />
            </div>
        </>
    )
}
