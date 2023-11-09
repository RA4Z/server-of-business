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
    function teste() {
        console.log("teste")
    }

    return (
        <div onClick={event => event}>
            <Header logado={false} selected={0} />
            <div className={styles.container}>
                <div className={styles.cards}>
                    {cards_especialista.map((card) => (
                        <Card
                            key={card.titulo}
                            titulo={card.titulo}
                            descricao={card.descricao}
                            imagem={card.imagem}
                            buttonText={card.buttonText}
                            onClick={teste}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}