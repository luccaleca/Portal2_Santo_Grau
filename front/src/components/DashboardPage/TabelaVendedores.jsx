import React from 'react';
import useTabelaVendedores from '../../hooks/dashboard/useTabelaVendedores';
import '../../styles/dashboard/TabelaVendedores.css';

const TabelaVendedores = () => {
    const { vendedoresWhatsapp, vendedoresHomeOtica, formatCurrency } = useTabelaVendedores();
  
    return (
      <div className="table-container">
        <h2>Tabela de Vendas - WhatsApp</h2>
        <table className="table">
          <thead>
            <tr>
              <th>Vendedor</th>
              <th>Vendas</th>
              <th>Meta</th>
              <th>Ticket Médio</th>
            </tr>
          </thead>
          <tbody>
            {vendedoresWhatsapp.map((vendedor, index) => (
              <tr key={index}>
                <td>{vendedor.VENDEDOR}</td>
                <td>{formatCurrency(vendedor.VENDAS)}</td>
                <td>{formatCurrency(vendedor.META)}</td>
                <td>{formatCurrency(vendedor.TM)}</td>
              </tr>
            ))}
          </tbody>
        </table>
  
        <h2>Tabela de Vendas - Home Ótica</h2>
        <table className="table">
          <thead>
            <tr>
              <th>Vendedor</th>
              <th>Vendas</th>
              <th>Meta</th>
              <th>Ticket Médio</th>
            </tr>
          </thead>
          <tbody>
            {vendedoresHomeOtica.map((vendedor, index) => (
              <tr key={index}>
                <td>{vendedor.VENDEDOR}</td>
                <td>{formatCurrency(vendedor.VENDAS)}</td>
                <td>{formatCurrency(vendedor.META)}</td>
                <td>{formatCurrency(vendedor.TM)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };
  
  export default TabelaVendedores;
