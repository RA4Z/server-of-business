import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useState, lazy, Suspense, useEffect } from 'react';
import { auth } from 'config/firebase'
import { infoUsuario } from 'services/firestore';
import { signOut } from 'firebase/auth';
import { info_especialistas } from 'utils/infos';
import { Box, LinearProgress } from '@mui/material';
import Loading from 'components/Loading';

const Home = lazy(() => import('pages/Home'));
const Login = lazy(() => import('pages/Login'));
const NotFound = lazy(() => import('pages/NotFound'));
const Cadastro = lazy(() => import('pages/Cadastro'));
const Header = lazy(() => import('components/Header'));
const Footer = lazy(() => import('components/Footer'));
const Pesquisa = lazy(() => import('pages/Pesquisa'));
const Info = lazy(() => import('pages/Info'));
const Perfil = lazy(() => import('pages/Perfil'));
const Planos = lazy(() => import('pages/Planos'));
const Trabalho = lazy(() => import('pages/Trabalho'));

export default function AppRouter() {
    const [pagina, setPagina] = useState(1)
    const [infoUser, setInfoUser] = useState(info_especialistas[0])
    const [load, setLoad] = useState(false)
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
        <>
            <Loading open={load} />
            <Router>
                <Suspense fallback={<Box sx={{ width: '100%' }}>
                    <LinearProgress />
                </Box>}>
                    <Routes>
                        <Route path='/' element={<Header selected={pagina} childToParent={childToParent} usuarioLogado={infoUser} />}>
                            <Route index element={<Home pagina={pagina} childToParent={childToParent} />} />
                            <Route path='/cadastro' element={<Cadastro setLoad={setLoad} />} />
                            <Route path='pesquisa/:categoria/:especifico?' element={<Pesquisa childToParent={childToParent} estado={infoUser.estado} />} />
                            <Route path='info/:categoria/:id' element={<Info {...infoUser} setInfoUser={setInfoUser} />} />
                            <Route path='/perfil' element={<Perfil infoUser={infoUser} setInfoUser={setInfoUser} setLoad={setLoad} />} />
                            <Route path='/planos' element={<Planos {...infoUser} setInfoUser={setInfoUser} />} />
                            <Route path='/trabalho/:jobId' element={<Trabalho usuarioLogado={infoUser} setLoad={setLoad} />} />
                            <Route path='*' element={<NotFound />} />
                        </Route>
                        <Route path='/login' element={<Login setLoad={setLoad} />} />
                    </Routes>
                    <Footer />
                </Suspense>
            </Router>
        </>
    )
}