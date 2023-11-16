import styles from './Info.module.scss'
import { useParams } from 'react-router-dom'

export default function Info({ childToParent }:any) {
    const { categoria, id } = useParams();
    
    return (
        <div>
            Informações sobre o selecionado {id}...
        </div>
    )
}