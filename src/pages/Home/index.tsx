import { info_preenchida } from './infos'
import Card from 'components/Card';
import Header from 'components/Header';
import styles from './Home.module.scss';
import Button from 'components/Button';
import { useState } from 'react';

export default function Home() {
    const [pagina, setPagina] = useState(0);
    function direcionamento(destino: string) {
        setPagina(0)
        
        switch (destino) {
            case 'Prestar serviço como Freelancer':
                console.log('Direcionar para Freelancer')
                break;
            case 'Prestar serviço como Autônomo':
                console.log('Direcionar para Autônomo')
                break;
            default:
                console.log('Erro Inesperado no Direcionamento')
        }
    }

    return (
        <div>
            <Header logado={false} selected={pagina+1} />
            <div className={styles.propaganda}>
                <div>
                    <p className={styles.propaganda__title}>{info_preenchida[pagina].titulo}</p>
                    <p className={styles.propaganda__description}>{info_preenchida[pagina].descricao}</p>
                </div>
                <img src={info_preenchida[pagina].image} alt='Pessoas apertando as mãos' />
            </div>
            <div className={styles.alternativa}>
                <Button dark={true} texto={info_preenchida[pagina].button} />
                <p className={styles.alternativa__texto}>{info_preenchida[pagina].alternative_button}</p>
            </div>
            <div className={styles.container}>
                <div className={styles.cards}>
                    {info_preenchida[pagina].cards.map((card) => (
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