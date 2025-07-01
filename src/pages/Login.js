import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from "react-router-dom";

function Login({ onLogin }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [msg, setMsg] = useState('');
  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('/api/login', { username, password });
      onLogin(res.data.token);
      navigate('/');
    } catch (err) {
      setMsg("Credenciais inválidas.");
    }
  };

  return (
    <div style={styles.container}>
      <h2>G.and.w Cinema - Login</h2>
      <form onSubmit={submit} style={styles.form}>
        <input placeholder="Usuário" value={username} onChange={e => setUsername(e.target.value)} required />
        <input placeholder="Senha" type="password" value={password} onChange={e => setPassword(e.target.value)} required />
        <button type="submit">Entrar</button>
        <p style={{ color: "red" }}>{msg}</p>
      </form>
      <p>Não tem cadastro? <Link to="/register">Registrar-se</Link></p>
    </div>
  );
}

const styles = {
  container: { maxWidth: 400, margin: "70px auto", padding: 20, border: "1px solid #ccc", borderRadius: 10, background: "#f9fafd", textAlign: "center" },
  form: { display: "flex", flexDirection: "column", gap: 10 }
};

export default Login;