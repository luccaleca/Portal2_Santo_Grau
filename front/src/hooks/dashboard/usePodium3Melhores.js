import { useContextoDeDashboard } from '../../hooks/dashboard/useProvedorDeContexto';
import useFormatCurrency from './useFormatCurrency';

function usePodium3Melhores() {
    const { dados } = useContextoDeDashboard();
    const { formatCurrency } = useFormatCurrency(); 
  
    const podiumData = dados.podium || [];
  
    return { podiumData, formatCurrency };
  }
  
  export default usePodium3Melhores;