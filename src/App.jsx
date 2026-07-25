import React, { useState } from 'react';
import './App.css';

function App() {
  const [abaAtiva, setAbaAtiva] = useState('Dashboard');
  const [transacoes, setTransacoes] = useState([]);
  
  // NOVO ESTADO: Guarda o valor que você digitar
  const [novoValor, setNovoValor] = useState('');

  const receitas = transacoes.filter(t => t.tipo === 'Receita').reduce((acc, curr) => acc + curr.valor, 0);
  const despesas = transacoes.filter(t => t.tipo === 'Despesa').reduce((acc, curr) => acc + curr.valor, 0);
  const saldo = receitas - despesas;

  // FUNÇÃO ATUALIZADA: Pega o valor do input em vez de gerar aleatório
  const adicionarTransacao = (tipo) => {
    const valorNumerico = parseFloat(novoValor);
    
    if (isNaN(valorNumerico) || valorNumerico <= 0) {
      alert("Por favor, digite um valor numérico válido maior que zero.");
      return;
    }

    const novaTransacao = {
      id: Date.now(),
      data: new Date().toLocaleDateString('pt-BR'),
      descricao: tipo === 'Receita' ? 'Entrada Manual' : 'Saída Manual',
      tipo: tipo,
      valor: valorNumerico
    };
    
    setTransacoes([novaTransacao, ...transacoes]);
    setNovoValor(''); // Limpa a caixinha depois de clicar
  };

  const formatarMoeda = (valor) => valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });

  const maxValor = Math.max(receitas, despesas, 1);
  const alturaReceita = `${(receitas / maxValor) * 100}%`;
  const alturaDespesa = `${(despesas / maxValor) * 100}%`;

  const renderizarConteudo = () => {
    if (abaAtiva === 'Dashboard') {
      return (
        <div className="fade-in">
          {/* NOVA INTERFACE DOS BOTÕES COM INPUT */}
          <div className="action-buttons">
            <input 
              type="number" 
              placeholder="Digite o valor (Ex: 150.50)" 
              value={novoValor}
              onChange={(e) => setNovoValor(e.target.value)}
              className="input-valor"
            />
            <button className="btn-success" onClick={() => adicionarTransacao('Receita')}>+ Adicionar Receita</button>
            <button className="btn-danger" onClick={() => adicionarTransacao('Despesa')}>- Adicionar Despesa</button>
          </div>

          <section className="cards">
            <div className="card">
              <h3>Saldo Atual</h3>
              <p className="value highlight">{formatarMoeda(saldo)}</p>
            </div>
            <div className="card">
              <h3>Receitas</h3>
              <p className="value positive">{formatarMoeda(receitas)}</p>
            </div>
            <div className="card">
              <h3>Despesas</h3>
              <p className="value negative">{formatarMoeda(despesas)}</p>
            </div>
          </section>

          <div className="dashboard-grid">
            <section className="transactions grid-item">
              <h2>Transações Recentes</h2>
              {transacoes.length === 0 ? (
                <p className="empty-state">Nenhuma transação registrada. O saldo é zero.</p>
              ) : (
                <table>
                  <thead>
                    <tr>
                      <th>Data</th>
                      <th>Descrição</th>
                      <th>Valor</th>
                    </tr>
                  </thead>
                  <tbody>
                    {transacoes.slice(0, 4).map((t) => (
                      <tr key={t.id}>
                        <td>{t.data}</td>
                        <td>{t.descricao}</td>
                        <td className={t.tipo === 'Receita' ? 'positive' : 'negative'}>
                          {t.tipo === 'Receita' ? '+' : '-'} {formatarMoeda(t.valor)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </section>

            <section className="chart-section grid-item">
              <h2>Visão Geral</h2>
              <div className="chart-container">
                <div className="bar receita" style={{ height: alturaReceita }}>
                   <span>{receitas > 0 && 'Receitas'}</span>
                </div>
                <div className="bar despesa" style={{ height: alturaDespesa }}>
                   <span>{despesas > 0 && 'Despesas'}</span>
                </div>
              </div>
            </section>
          </div>
        </div>
      );
    }

    return (
      <div className="fade-in placeholder-content">
        <h2>{abaAtiva}</h2>
        <p>Interface pronta para desenvolvimento das funções de {abaAtiva.toLowerCase()}.</p>
      </div>
    );
  };

  return (
    <div className="dashboard-container">
      <aside className="sidebar">
        <h2>GestãoFinanceira</h2>
        <nav>
          <ul>
            {['Dashboard', 'Transações', 'Relatórios', 'Configurações'].map((aba) => (
              <li key={aba} className={abaAtiva === aba ? 'active' : ''} onClick={() => setAbaAtiva(aba)}>
                {aba}
              </li>
            ))}
          </ul>
        </nav>
      </aside>

      <main className="main-content">
        <header>
          <h1>{abaAtiva}</h1>
        </header>
        {renderizarConteudo()}
      </main>
    </div>
  );
}

export default App;