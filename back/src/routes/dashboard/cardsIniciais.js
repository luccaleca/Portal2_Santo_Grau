const express = require("express");
const router = express.Router();
const connectDB = require("../../config/database");

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

// Rota para obter os dados do dashboard
router.get("/", async (req, res) => {
  const { startDate, endDate } = req.query;

  const mainQuery = `
    SELECT DISTINCT
        sum(a.LCTVALOR) AS VENDAS,
        COUNT(a.LCTVALOR) AS NUM_VENDAS,
        sum(a.LCTVALOR)/COUNT(e.PEDSEQUENCIAL) AS TM
    FROM TB_LCT_LANCAMENTOS a
    INNER JOIN TB_LTV_LANCAMENTOVENDA b ON b.LCTID = a.LCTID
    INNER JOIN TB_VEN_VENDA c ON c.VENID = b.VENID
    INNER JOIN TB_VPE_VENDAPEDIDOS d ON d.VENID_VENDA = c.VENID
    INNER JOIN TB_PED_PEDIDO e ON e.PEDID = d.PEDID_PEDIDO
    INNER JOIN TB_CLI_CLIENTE f ON f.CLIID = c.CLIID_PAGADOR
    INNER JOIN TB_PES_PESSOA g ON g.PESID = f.PESID
    INNER JOIN TB_USU_USUARIO h ON h.USUID = a.USUID
    INNER JOIN TB_VND_VENDEDOR i ON i.VNDID = e.VNDID_PRIMEIRO
    WHERE a.LCTDATALANCAMENTO >= ? AND a.LCTDATALANCAMENTO <= ?
    AND e.FILID_FILIAL = '5'
    AND e.MCVID IS NULL
    ORDER BY VENDAS DESC
  `;

  const homeOticaQuery = `
    SELECT DISTINCT
        sum(a.LCTVALOR) AS VENDAS,
        COUNT(a.LCTVALOR) AS NUM_VENDAS,
        sum(a.LCTVALOR)/COUNT(e.PEDSEQUENCIAL) AS TM
    FROM TB_LCT_LANCAMENTOS a
    INNER JOIN TB_LTV_LANCAMENTOVENDA b ON b.LCTID = a.LCTID
    INNER JOIN TB_VEN_VENDA c ON c.VENID = b.VENID
    INNER JOIN TB_VPE_VENDAPEDIDOS d ON d.VENID_VENDA = c.VENID
    INNER JOIN TB_PED_PEDIDO e ON e.PEDID = d.PEDID_PEDIDO
    INNER JOIN TB_CLI_CLIENTE f ON f.CLIID = c.CLIID_PAGADOR
    INNER JOIN TB_PES_PESSOA g ON g.PESID = f.PESID
    INNER JOIN TB_USU_USUARIO h ON h.USUID = a.USUID
    INNER JOIN TB_VND_VENDEDOR i ON i.VNDID = e.VNDID_PRIMEIRO
    INNER JOIN TB_TVN_TIPOVENDA l ON l.TVNID = e.TVNID 
    WHERE a.LCTDATALANCAMENTO >= ? AND a.LCTDATALANCAMENTO <= ?
    AND l.TVNDESCRICAO = 'VIDEO CHAMADA'
    AND e.FILID_FILIAL = '5'
    AND e.MCVID IS NULL
    ORDER BY VENDAS DESC
  `;

  const whatsappQuery = `
    SELECT DISTINCT
        sum(a.LCTVALOR) AS VENDAS,
        COUNT(a.LCTVALOR) AS NUM_VENDAS,
        sum(a.LCTVALOR)/COUNT(e.PEDSEQUENCIAL) AS TM
    FROM TB_LCT_LANCAMENTOS a
    INNER JOIN TB_LTV_LANCAMENTOVENDA b ON b.LCTID = a.LCTID
    INNER JOIN TB_VEN_VENDA c ON c.VENID = b.VENID
    INNER JOIN TB_VPE_VENDAPEDIDOS d ON d.VENID_VENDA = c.VENID
    INNER JOIN TB_PED_PEDIDO e ON e.PEDID = d.PEDID_PEDIDO
    INNER JOIN TB_CLI_CLIENTE f ON f.CLIID = c.CLIID_PAGADOR
    INNER JOIN TB_PES_PESSOA g ON g.PESID = f.PESID
    INNER JOIN TB_USU_USUARIO h ON h.USUID = a.USUID
    INNER JOIN TB_VND_VENDEDOR i ON i.VNDID = e.VNDID_PRIMEIRO
    INNER JOIN TB_TVN_TIPOVENDA l ON l.TVNID = e.TVNID 
    WHERE a.LCTDATALANCAMENTO >= ? AND a.LCTDATALANCAMENTO <= ?
    AND l.TVNDESCRICAO = 'VENDA'
    AND e.FILID_FILIAL = '5'
    AND e.MCVID IS NULL
    ORDER BY VENDAS DESC
  `;

  try {
    connectDB(async (db) => {
      const mainResults = await executeQuery(db, mainQuery, [startDate, endDate]);
      const whatsappResults = await executeQuery(db, whatsappQuery, [startDate, endDate]);
      const homeOticaResults = await executeQuery(db, homeOticaQuery, [startDate, endDate]);

      res.status(200).json({
        main: mainResults,
        whatsapp: whatsappResults,
        homeOtica: homeOticaResults,
      });
      db.detach();
    });
  } catch (err) {
    res.status(500).json({ message: "Erro ao obter dados do dashboard" });
  }
});

module.exports = router;
