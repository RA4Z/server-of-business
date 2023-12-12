import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useState, lazy, Suspense, useEffect } from 'react';
import { auth } from 'config/firebase'
import { infoUsuario } from 'services/firestore';
import { signOut } from 'firebase/auth';

const Home = lazy(() => import('pages/Home'));
const Login = lazy(() => import('pages/Login'));
const Cadastro = lazy(() => import('pages/Cadastro'));
const Header = lazy(() => import('components/Header'));
const Footer = lazy(() => import('components/Footer'));
const Pesquisa = lazy(() => import('pages/Pesquisa'));
const Info = lazy(() => import('pages/Info'));
const Perfil = lazy(() => import('pages/Perfil'));
const Trabalho = lazy(() => import('pages/Trabalho'));

export default function AppRouter() {
    const [pagina, setPagina] = useState(1)
    const [infoUser, setInfoUser] = useState({ id: '', email: '', autonomo: false, freelancer: false, premium: false, nome: '', estrelas: 0, cargos: [], estado: '', pais: '', telefone: '', descricao: '', avatar: '' })

    async function buscarUserInfo(emailAdress: any) {
        const result = await infoUsuario(emailAdress, setInfoUser)
        if (result === 'error') signOut(auth)
    }
    useEffect(() => (
        auth.onAuthStateChanged(usuario => {
            if (usuario) {
                let emailAdress = auth.currentUser!.email
                if (emailAdress && infoUser.email === '') {
                    buscarUserInfo(emailAdress)
                }
            }
        })
    ), [infoUser.email])

    const childToParent = (childdata: number) => {
        setPagina(childdata)
    }
    return (
        <Router>
            <Suspense fallback={<p>Carregando...</p>}>
                <Routes>
                    <Route path='/' element={<Header selected={pagina} childToParent={childToParent} avatar={infoUser.avatar} />}>
                        <Route index element={<Home pagina={pagina} childToParent={childToParent} />} />
                        <Route path='/cadastro' element={<Cadastro />} />
                        <Route path='pesquisa/:categoria/:especifico?' element={<Pesquisa childToParent={childToParent} />} />
                        <Route path='info/:categoria/:id' element={<Info />} />
                        <Route path='/perfil' element={<Perfil {...infoUser} setInfoUser={setInfoUser} />} />
                        <Route path='/trabalho/:jobId' element={<Trabalho />} />
                    </Route>
                    <Route path='/login' element={<Login />} />
                </Routes>
            </Suspense>
            <Footer />
        </Router>
    )
}