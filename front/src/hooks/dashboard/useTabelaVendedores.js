import { useContextoDeDashboard } from "./useProvedorDeContexto";
import useFormatCurrency from './useFormatCurrency';

function useTabelaVendedores() {
    const { dados } = useContextoDeDashboard();
    const { formatCurrency } = useFormatCurrency();
  
    const vendedoresWhatsapp = dados.whatsapp || [];
    const vendedoresHomeOtica = dados.homeOtica || [];
  
    return {
      vendedoresWhatsapp,
      vendedoresHomeOtica,
      formatCurrency,
    };
  }
  
  export default useTabelaVendedores;