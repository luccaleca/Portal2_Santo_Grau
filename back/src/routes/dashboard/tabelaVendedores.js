const express = require('express');
const router = express.Router();
const connectDB = require('../../config/database');

// Função para executar uma consulta e retornar os resultados
const executeQuery = (db, query, params) => {
  return new Promise((resolve, reject) => {
    db.query(query, params, (err, results) => {
      if (err) {
        reject(err);
      } else {
        resolve(results);
      }
    });
  });
};

// Rota para obter os dados dos vendedores para WhatsApp e Home Ótica
router.get('/', async (req, res) => {
  const { startDate, endDate } = req.query;

  if (!startDate || !endDate) {
    return res.status(400).json({ message: "Parâmetros de data ausentes" });
  }

  const vendedoresWhatsAppQuery = `
    SELECT 
      b.PESNOME AS VENDEDOR, 
      SUM(l.LCTVALOR) AS VENDAS,
      d.MTVVALORMETA, 
      SUM(l.LCTVALOR) / COUNT(e.PEDSEQUENCIAL) AS TM
    FROM TB_VND_VENDEDOR a
    INNER JOIN TB_PES_PESSOA b ON b.PESID = a.PESID 
    INNER JOIN TB_DMV_DETALHEMETAVEND c ON c.VNDID = a.VNDID 
    INNER JOIN TB_MTV_METASVENDEDOR d ON d.MTVID = c.MTVID
    INNER JOIN TB_PED_PEDIDO e ON e.VNDID_PRIMEIRO = a.VNDID
    INNER JOIN TB_VPE_VENDAPEDIDOS f ON f.PEDID_PEDIDO = e.PEDID
    INNER JOIN TB_VEN_VENDA g ON g.VENID = f.VENID_VENDA
    INNER JOIN TB_LTV_LANCAMENTOVENDA h ON h.VENID = g.VENID
    INNER JOIN TB_LCT_LANCAMENTOS l ON l.LCTID = h.LCTID
    INNER JOIN TB_TVN_TIPOVENDA t ON t.TVNID = e.TVNID
    WHERE l.LCTDATALANCAMENTO >= ? AND l.LCTDATALANCAMENTO <= ?
      AND t.TVNDESCRICAO = 'VENDA'
      AND e.FILID_FILIAL = '5'
      AND e.MCVID IS NULL
    GROUP BY b.PESNOME, d.MTVVALORMETA
    ORDER BY VENDAS DESC
  `;

  const vendedoresHomeOticaQuery = `
    SELECT 
      b.PESNOME AS VENDEDOR, 
      SUM(l.LCTVALOR) AS VENDAS,
      d.MTVVALORMETA, 
      SUM(l.LCTVALOR) / COUNT(e.PEDSEQUENCIAL) AS TM
    FROM TB_VND_VENDEDOR a
    INNER JOIN TB_PES_PESSOA b ON b.PESID = a.PESID 
    INNER JOIN TB_DMV_DETALHEMETAVEND c ON c.VNDID = a.VNDID 
    INNER JOIN TB_MTV_METASVENDEDOR d ON d.MTVID = c.MTVID
    INNER JOIN TB_PED_PEDIDO e ON e.VNDID_PRIMEIRO = a.VNDID
    INNER JOIN TB_VPE_VENDAPEDIDOS f ON f.PEDID_PEDIDO = e.PEDID
    INNER JOIN TB_VEN_VENDA g ON g.VENID = f.VENID_VENDA
    INNER JOIN TB_LTV_LANCAMENTOVENDA h ON h.VENID = g.VENID
    INNER JOIN TB_LCT_LANCAMENTOS l ON l.LCTID = h.LCTID
    INNER JOIN TB_TVN_TIPOVENDA t ON t.TVNID = e.TVNID
    WHERE l.LCTDATALANCAMENTO >= ? AND l.LCTDATALANCAMENTO <= ?
      AND t.TVNDESCRICAO = 'VIDEO CHAMADA'
      AND e.FILID_FILIAL = '5'
      AND e.MCVID IS NULL
    GROUP BY b.PESNOME, d.MTVVALORMETA
    ORDER BY VENDAS DESC
  `;

  try {
    connectDB(async (db) => {
      const whatsappResults = await executeQuery(db, vendedoresWhatsAppQuery, [startDate, endDate]);
      const homeOticaResults = await executeQuery(db, vendedoresHomeOticaQuery, [startDate, endDate]);

      res.status(200).json({
        whatsapp: whatsappResults,
        homeOtica: homeOticaResults,
      });
      db.detach();
    });
  } catch (err) {
    res.status(500).json({ message: "Erro ao obter dados dos vendedores" });
  }
});

module.exports = router;
