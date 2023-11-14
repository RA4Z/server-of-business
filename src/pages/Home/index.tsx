import { info_preenchida } from './infos'
import { useNavigate } from 'react-router-dom';
import Card from 'components/Card';
import styles from './Home.module.scss';
import Button from 'components/Button';

export default function Home({ pagina = 1, childToParent }: any) {
    const navigate = useNavigate()
    function direcionamento(destino: string) {
        switch (destino) {
            case 'Contratar Especialistas':
                navigate('/pesquisa/1')
                break;
            case 'Candidatar-se como Especialista':
                navigate('/pesquisa/2')
                break;
            case 'Prestar serviço como Freelancer':
                navigate('/pesquisa/2/free')
                break;
            case 'Prestar serviço como Autônomo':
                navigate('/pesquisa/2/auto')
                break;
            case 'Tenho um problema rápido de ser resolvido':
                navigate('/pesquisa/1/free')
                break;
            case 'Contratar autônomos para diversos serviços':
                navigate('/pesquisa/1/auto')
                break;
            default:
                console.log('Erro Inesperado no Direcionamento!')
        }
    }
    return (
        <div>
            <div className={styles.propaganda}>
                <div>
                    <p className={styles.propaganda__title}>{info_preenchida[pagina - 1].titulo}</p>
                    <p className={styles.propaganda__description}>{info_preenchida[pagina - 1].descricao}</p>
                </div>
                <img src={info_preenchida[pagina - 1].image} alt='Imagem Propaganda' />
            </div>
            <div className={styles.alternativa}>
                <Button dark={true} texto={info_preenchida[pagina - 1].button} onClick={() => direcionamento(info_preenchida[pagina - 1].button)} />
                <p className={styles.alternativa__texto} onClick={() => childToParent(info_preenchida[pagina - 1].direcionamento)}>{info_preenchida[pagina - 1].alternative_button}</p>
            </div>

            <div className={styles.container}>
                <div className={styles.cards}>
                    {info_preenchida[pagina - 1].cards.map((card) => (
                        <Card
                            key={card.titulo}
                            titulo={card.titulo}
                            descricao={card.descricao}
                            imagem={card.imagem}
                            buttonText={card.buttonText}
                            onClick={() => direcionamento(card.titulo)}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}