import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Filmes() {
  const [filmes, setFilmes] = useState([]);

  useEffect(() => {
    axios.get('/api/filmes', {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
    }).then(res => setFilmes(res.data));
  }, []);

  return (
    <div style={styles.container}>
      <h2>Filmes Online</h2>
      <div style={styles.cards}>
        {filmes.map((filme, idx) => (
          <div key={idx} style={styles.card}>
            <img src={filme.imagem} alt={filme.titulo} width={160} />
            <h3>{filme.titulo}</h3>
            <p>{filme.descricao}</p>
            <button style={styles.button}>Assistir</button>
          </div>
        ))}
      </div>
    </div>
  );
}

const styles = {
  container: { maxWidth: 1100, margin: "30px auto", padding: 20, background: "#f9fafd", borderRadius: 12 },
  cards: { display: "flex", flexWrap: "wrap", gap: 24, justifyContent: "center" },
  card: { background: "#fff", borderRadius: 10, boxShadow: "0 2px 8px #ccc", padding: 14, textAlign: "center", width: 220, marginBottom: 16 },
  button: { marginTop: 10, background: "#254a6a", color: "#fff", border: "none", padding: "8px 18px", borderRadius: 6, cursor: "pointer" }
};

export default Filmes;