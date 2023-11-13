import { info_preenchida } from './infos'
import Card from 'components/Card';
import styles from './Home.module.scss';
import Button from 'components/Button';

export default function Home({ pagina = 1, childToParent }:any) {

    function direcionamento(destino: string) {
        switch (destino) {
            case 'Prestar serviço como Freelancer':
                console.log('Direcionar para Candidatar-se como Freelancer')
                break;
            case 'Prestar serviço como Autônomo':
                console.log('Direcionar para Candidatar-se como Autônomo')
                break;
            case 'Tenho um problema rápido de ser resolvido':
                console.log('Direcionar para Contratar um Freelancer')
                break;
            case 'Contratar autônomos para diversos serviços':
                console.log('Direcionar para Contratar um Autônomo')
                break;
            default:
                console.log('Erro Inesperado no Direcionamento!')
        }
    }
    return (
        <div>
            <div className={styles.propaganda}>
                <div>
                    <p className={styles.propaganda__title}>{info_preenchida[pagina-1].titulo}</p>
                    <p className={styles.propaganda__description}>{info_preenchida[pagina-1].descricao}</p>
                </div>
                <img src={info_preenchida[pagina-1].image} alt='Imagem Propaganda' />
            </div>
            <div className={styles.alternativa}>
                <Button dark={true} texto={info_preenchida[pagina-1].button} />
                <p className={styles.alternativa__texto} onClick={() => childToParent(info_preenchida[pagina-1].direcionamento)}>{info_preenchida[pagina-1].alternative_button}</p>
            </div>

            <div className={styles.container}>
                <div className={styles.cards}>
                    {info_preenchida[pagina-1].cards.map((card) => (
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