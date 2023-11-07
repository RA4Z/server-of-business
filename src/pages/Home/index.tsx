import Card from 'components/Card';
import Header from 'components/Header';
import 'pages/home.css';

export default function Home() {
    return (
        <div className="App">
            <Header logado={false} />
            <header className="App-header">
                <Card />
            </header>
        </div>
    );
}