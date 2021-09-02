import { useState } from 'react'
import { FormEvent } from 'react'
import { Button } from '../../components/Button'
import illustrationImg from '../../assets/images/illustration.svg'
import logoImg from '../../assets/images/logo.svg'
import { useAuth } from '../../hooks/useAuth'
import { useHistory } from 'react-router-dom'


import '../../styles/auth.scss'
import './styles.scss'

export function Login() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const history = useHistory()
    const { signIn } = useAuth()

    async function handleLogin(event: FormEvent) {
        event.preventDefault()
        try {
            await signIn(email, password)

            history.push("/rooms/new")
        } catch (error) {
            alert('Credenciais inválidas, verifique seus dados e tente novamente.')
        }
    }

    return (
        <div id="page-auth">
            <aside>
                <img src={illustrationImg} alt="Ilustração simbolizando perguntas e respostas" />
                <strong>Crie salas de Q&amp;A ao-vivo</strong>
                <p>Tire as dúvidas da sua audiência em tempo-real</p>
            </aside>
            <main>
                <div className="main-content">
                    <img src={logoImg} alt="Letmeask" />
                    <form id="form-login" onSubmit={handleLogin}>
                        <input
                            type="text"
                            placeholder="Digite seu email"
                            value={email}
                            onChange={(event) => { setEmail(event.target.value) }}
                        />
                        <input
                            type="password"
                            placeholder="Digite sua senha"
                            value={password}
                            onChange={(event) => { setPassword(event.target.value) }}
                        />
                        <Button type="submit">
                            Entrar
                        </Button>
                    </form>
                </div>
            </main>
        </div>
    )
}