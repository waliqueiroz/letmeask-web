import { Button } from '../../components/Button'
import illustrationImg from '../../assets/images/illustration.svg'
import logoImg from '../../assets/images/logo.svg'

// import { useAuth } from '../../hooks/useAuth'

import '../../styles/auth.scss'
import './styles.scss'
import { useState } from 'react'

export function Login() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    // handle login
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
                    <form id="form-login" onSubmit={() => { }}>
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