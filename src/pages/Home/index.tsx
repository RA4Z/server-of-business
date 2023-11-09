import contratante from 'images/main_contratante.jpg';

import Card from 'components/Card';
import Header from 'components/Header';
import styles from './Home.module.scss';
import 'pages/home.css';

export default function Home() {
    const cards_especialista = [
        {
            titulo: 'Prestar serviço como Freelancer',
            descricao: 'Procurar serviços de curta duração, para serem realizados em poucos dias ou horas.',
            imagem: '/assets/freelancer.jpg',
            buttonText: 'Candidatar-se como Freelancer',
        },
        {
            titulo: 'Prestar serviço como Autônomo',
            descricao: 'Procurar oportunidades de serviços de médio a longo prazo para duração de meses a anos.',
            imagem: '/assets/autonomo.jpg',
            buttonText: 'Candidatar-se como Autônomo',
        }
    ]

    function direcionamento(destino: string) {
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
            <Header logado={false} selected={1} />

            <div className={styles.propaganda}>
                <div>
                    <p className={styles.propaganda__title}>Todo dia precisamos resolver diversos problemas, por que não procurar alguém especializado na resolução deles?</p>
                    <p className={styles.propaganda__description}>Aqui você pode encontrar especialistas das mais diversas áreas de negócio que podem resolver dos mais diversos tipos de problemas em sua vida!</p>
                </div>
                <img src={contratante} alt='Pessoas apertando as mãos' />
            </div>

            <div className={styles.container}>
                <div className={styles.cards}>
                    {cards_especialista.map((card) => (
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