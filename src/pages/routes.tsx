import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useState } from 'react';

import Home from './Home';
import Login from './Login';
import Cadastro from './Cadastro';

import Header from 'components/Header';
import Footer from 'components/Footer';
import Pesquisa from './Pesquisa';
import Info from './Info';
import Perfil from './Perfil';
import Trabalho from './Trabalho'

export default function AppRouter() {
    const [pagina, setPagina] = useState(1)

    const childToParent = (childdata: number) => {
        setPagina(childdata)
    }
    return (
        <Router>
            <Routes>
                <Route path='/' element={<Header selected={pagina} childToParent={childToParent} />}>
                    <Route index element={<Home pagina={pagina} childToParent={childToParent} />} />
                    <Route path='/cadastro' element={<Cadastro />} />
                    <Route path='pesquisa/:categoria/:especifico?' element={<Pesquisa childToParent={childToParent} />} />
                    <Route path='info/:categoria/:id' element={<Info />} />
                    <Route path='/perfil' element={<Perfil />} />
                    <Route path='/trabalho' element={<Trabalho />} />
                    {/* /:userId/:jobId */}
                </Route>
                <Route path='/login' element={<Login />} />
            </Routes>
            <Footer />
        </Router>
    )
}