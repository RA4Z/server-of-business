import { Checkbox, FormControl, FormControlLabel, Input, InputLabel, Snackbar, TextField } from '@mui/material'
import { CountryDropdown, RegionDropdown } from 'react-country-region-selector';
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

import styles from './Cadastro.module.scss'
import Imagem from 'images/tela-cadastro.png'
import Button from 'components/Button'
import { auth } from 'config/firebase';
import { cadastrar } from 'services/requisitions';
import { TextMaskCustom } from 'utils/genericos';

interface Props {
    setLoad: any
}

export default function Cadastro(props: Props) {
    const navigate = useNavigate();
    const [extras, setExtras] = useState({ repeatPassword: '', termos: false, senha: '' })
    const [statusToast, setStatusToast] = useState({ visivel: false, message: '' })
    const [data, setData] = useState({
        avatar: '',
        nome: '',
        email: '',
        pais: '',
        cidade: '',
        estado: '',
        telefone: '',
        dataExpira: '',
        planoAtual: '',
        premium: false,
        autonomo: false,
        freelancer: false,
        estrelas: 5.0,
        avaliacoes: 1,
        cargos: [],
        descricao: ''
    })

    //VERIFICAR SE ESTÁ LOGADO
    useEffect(() => {
        const estadoUsuario = auth.onAuthStateChanged(usuario => {
            if (usuario) {
                navigate('/Perfil')
            }
        })
        return () => estadoUsuario();
    })

    async function criarConta() {
        if (extras.senha !== extras.repeatPassword) return setStatusToast({ visivel: true, message: 'As senhas não conferem!' })
        if (data.nome === '') return setStatusToast({ visivel: true, message: 'O nome de usuário está em branco!' })
        if (data.pais === '' || data.estado === '') return setStatusToast({ visivel: true, message: 'Selecione um país e um estado válidos!' })
        if (data.pais !== 'Brazil') return setStatusToast({ visivel: true, message: 'Só estão liberados contas cadastradas no Brasil por enquanto!' })
        if (!extras.termos) return setStatusToast({ visivel: true, message: 'Os termos de serviço e a política de privacidade não foram aceitas!' })
        props.setLoad(true)
        const response = await cadastrar(data.email, extras.senha, data)
        props.setLoad(false)
        if (response !== 'sucesso') setStatusToast({ visivel: true, message: response!.toString() })
    }

    return (
        <>
            <div className={styles.container}>
                <div className={styles.container__left}
                    onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                            e.preventDefault();
                            criarConta()
                        }
                    }}>
                    <p>Criação de conta</p>
                    <TextField id="outlined-username"
                        label="Nome completo"
                        autoComplete="username"
                        value={data.nome}
                        onChange={e => setData({ ...data, nome: e.target.value })}
                        className={styles.input}
                    />
                    <TextField id="outlined-email"
                        label="E-mail"
                        autoComplete="email"
                        value={data.email}
                        onChange={e => setData({ ...data, email: e.target.value.toLowerCase() })}
                        className={styles.input}
                    />
                    <TextField id="outlined-password-input"
                        label="Senha"
                        type='password'
                        autoComplete="current-password"
                        value={extras.senha}
                        onChange={e => setExtras({ ...extras, senha: e.target.value })}
                        className={styles.input}
                    />
                    <TextField id="outlined-password-repeat"
                        label="Repetir Senha"
                        type='password'
                        autoComplete="current-password"
                        value={extras.repeatPassword}
                        onChange={e => setExtras({ ...extras, repeatPassword: e.target.value })}
                        className={styles.input}
                    />
                    <FormControl>
                        <InputLabel htmlFor="outlined-formatted-text-mask-input">Telefone</InputLabel>
                        <Input
                            value={data.telefone}
                            onChange={e => setData({ ...data, telefone: e.target.value })}
                            name="textmask"
                            className={styles.input}
                            id="outlined-formatted-text-mask-input"
                            inputComponent={TextMaskCustom as any}
                        />
                    </FormControl>
                    <div className={styles.container__left__countries}>
                        <CountryDropdown
                            classes={styles.selection}
                            defaultOptionLabel='Selecionar País'
                            value={data.pais}
                            onChange={(val) => setData({ ...data, pais: val })} />
                        <RegionDropdown
                            classes={styles.selection}
                            defaultOptionLabel='Selecionar Região'
                            country={data.pais}
                            value={data.estado}
                            onChange={(val) => setData({ ...data, estado: val })} />
                    </div>

                    <FormControlLabel control={<Checkbox onChange={e => setExtras({ ...extras, termos: e.target.checked })} />} label="Ao criar sua conta você estará aceitando os termos de serviço e a política de privacidade do Wolls." className={styles.check} />
                    <Button texto='Crie sua conta' dark={true} onClick={() => criarConta()} />

                    <div className={styles.container__criar}>
                        Já possui uma conta?
                        <button onClick={() => navigate('/login')}>Login</button>
                    </div>
                </div>

                <div className={styles.container__right}>
                    <img src={Imagem} alt='Imagem representando profissões' />
                </div>
                <Snackbar
                    open={statusToast.visivel}
                    onClose={() => setStatusToast({ ...statusToast, visivel: false })}
                    autoHideDuration={3000}
                    message={statusToast.message}
                />
            </div>
        </>
    )
}