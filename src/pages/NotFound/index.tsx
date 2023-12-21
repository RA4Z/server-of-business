import styles from './NotFound.module.scss';
import { ReactComponent as NotFoundImage } from 'images/not_found.svg';
import classNames from 'classnames';
import { useNavigate } from 'react-router-dom';
import TextoTitulos from 'components/TextoTitulos';
import { memo } from 'react';

export function NotFound() {
    const navigate = useNavigate();
    return (
        <div className={classNames({
            [styles.container]: true
        })}>
            <div className={styles.voltar}>
                <button onClick={() => navigate(-1)}>
                    {'< Voltar'}
                </button>
            </div>
            <NotFoundImage className={styles.image} />
            <TextoTitulos>Página não encontrada!</TextoTitulos>
        </div>
    );
}
export default memo(NotFound)