//hook para formatar o dado para moeda real

function useFormatCurrency() {
    const formatCurrency = (value) => {
      if (isNaN(value)) return "Dado não disponível";
      return new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL',
      }).format(value);
    };
  
    return { formatCurrency };
  }
  
  export default useFormatCurrency;