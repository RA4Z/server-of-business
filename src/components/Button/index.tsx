import styles from './Button.module.scss'
import classNames from 'classnames';

interface Props {
    texto: string;
    dark: boolean
}

export default function Button(props:Props) {
    return (
        <button className={classNames({
            [styles.preenchimento]: true,
            [styles['preenchimento__dark']]: props.dark === true})}>
            {props.texto}
        </button>
    )
}