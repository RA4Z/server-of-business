import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Home';
import Login from './Login';
import Header from 'components/Header';
import { useState } from 'react';
import Footer from 'components/Footer';

export default function AppRouter() {
    const [pagina, setPagina] = useState(1)

    const childToParent = (childdata: number) => {
        setPagina(childdata)
    }

    return (
        <Router>
            <Header logado={false} selected={pagina} childToParent={childToParent} />
            <Routes>
                <Route path='/' element={<Home pagina={pagina} childToParent={childToParent} />} />
            </Routes>
            <Footer />

        </Router>
    )
}