import { useState, useEffect } from 'react'
import styles from './User.module.scss'

import Button from 'components/Button'
import { atualizarInfoService } from 'services/firestore'
import { Service_Interface } from 'types/User'

import Estrela from 'images/estrela.svg'
import UserIMG from 'images/user.png'

interface Props {
    id: any,
    visible: any,
    nome: string,
    estrelas: number,
    avatar: string,
    cargos: string[],
    descricao: string,
    serviceId: any,
    service: Service_Interface
}

export default function User(props: Props) {
    const [info, setInfo] = useState(props.service)

    useEffect(() => {
        setInfo((prevInfo) => ({ ...prevInfo, idContratado: props.id }));
    }, [props.id])

    async function updateInformation() {
        await atualizarInfoService(props.serviceId, info)
        props.visible(false)
        window.location.reload()
    }
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
                    <div className={styles.cargos_armazenados}>
                        {props.cargos.map((cargo, index) => (
                            <div className={styles.especializacao} key={index}>
                                <li>{cargo}</li>
                            </div>
                        ))}
                    </div>
                    <div className={styles.textos__desc}>
                        <li>
                            {props.descricao}
                        </li>
                    </div>
                </div>
                <Button texto='Aprovar candidato' dark={true} onClick={() => updateInformation()} />
            </div>
        </>
    )
}
