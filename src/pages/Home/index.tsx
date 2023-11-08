import Card from 'components/Card';
import Header from 'components/Header';
import OptionMenu from 'components/OptionMenu';
import 'pages/home.css';

export default function Home() {
    return (
        <div>
            <Header logado={false} selected={0} />
            <div className="App-body">
                <Card
                    titulo='Prestar serviço como Freelancer'
                    descricao='Procurar serviços de curta duração, para serem realizados em poucos dias ou horas.'
                    imagem='/assets/freelancer.jpg'
                    buttonText='Candidatar-se como Freelancer'
                />
                <OptionMenu logado={false} />
            </div>
        </div>
    );
}