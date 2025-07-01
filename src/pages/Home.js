import React from 'react';
import { Link } from "react-router-dom";

function Home({ onLogout }) {
  return (
    <div style={styles.container}>
      <header style={styles.header}>
        <img src="https://cdn-icons-png.flaticon.com/512/833/833314.png" alt="Logo" width={50} />
        <h1>G.and.w Cinema</h1>
        <button onClick={onLogout} style={styles.logout}>Sair</button>
      </header>
      <nav style={styles.nav}>
        <Link to="/filmes" style={styles.link}>🎬 Filmes Online</Link>
        <a href="https://www.confiaemjesus.com.br/" target="_blank" rel="noopener noreferrer" style={styles.link}>Mensagens Cristãs</a>
      </nav>
      <section>
        <h2>Destaques da Semana</h2>
        <div style={styles.cards}>
          <div style={styles.card}>
            <img src="https://image.tmdb.org/t/p/w500/uJYYizSuA9Y3DCs0qS4qWvHfZg4.jpg" width={180} alt="Homem-Aranha" />
            <h3>Homem-Aranha: Sem Volta Para Casa</h3>
          </div>
          <div style={styles.card}>
            <img src="https://upload.wikimedia.org/wikipedia/pt/0/05/Facing_the_Giants.jpg" width={180} alt="Desafiando Gigantes" />
            <h3>Desafiando Gigantes</h3>
          </div>
          <div style={styles.card}>
            <img src="https://image.tmdb.org/t/p/w500/RYMX2wcKCBAr24UyPD7xwmjaTn.jpg" width={180} alt="Vingadores" />
            <h3>Os Vingadores</h3>
          </div>
        </div>
      </section>
      <footer style={styles.footer}>
        <p>G.and.w Cinema &copy; 2025 | Filmes decentes para toda família</p>
      </footer>
    </div>
  );
}

const styles = {
  container: { fontFamily: 'sans-serif', minHeight: '100vh', display: 'flex', flexDirection: 'column' },
  header: { display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: 20, background: 'linear-gradient(90deg, #254a6a, #1c2b36)', color: '#fff' },
  logout: { background: '#c00', color: '#fff', border: 'none', padding: '8px 16px', borderRadius: 5, cursor: 'pointer' },
  nav: { display: 'flex', gap: 20, justifyContent: 'center', margin: '20px 0' },
  link: { textDecoration: 'none', color: '#254a6a', fontWeight: 'bold', fontSize: 18 },
  cards: { display: 'flex', gap: 18, justifyContent: 'center', margin: '25px 0' },
  card: { background: '#fff', borderRadius: 10, boxShadow: '0 2px 8px #ccc', padding: 12, textAlign: 'center', width: 200 },
  footer: { marginTop: 'auto', background: '#254a6a', color: '#fff', textAlign: 'center', padding: 12 }
};

export default Home;