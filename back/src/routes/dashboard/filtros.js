const express = require('express');
const router = express.Router();
const connectDB = require('../../config/database');

// Função para executar a query utilizando promessas, adaptada ao uso do callback de connectDB
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

// Função para determinar as datas com base no filtro
const calcularDatas = (filtro, dataInicioCustomizada, dataFimCustomizada) => {
    const hoje = new Date();
    let dataInicio, dataFim;

    switch (filtro) {
        case 'day':
            dataFim = new Date(hoje); // Hoje
            dataInicio = new Date(hoje);
            dataInicio.setDate(hoje.getDate() - 1); // Um dia atrás
            break;
        case 'week':
            dataInicio = new Date(hoje);
            dataInicio.setDate(hoje.getDate() - 7);
            dataFim = new Date(hoje);
            break;
        case 'month':
            dataInicio = new Date(hoje);
            dataInicio.setMonth(hoje.getMonth() - 1);
            dataFim = new Date(hoje);
            break;
        case 'year':
            dataInicio = new Date(hoje);
            dataInicio.setFullYear(hoje.getFullYear() - 1);
            dataFim = new Date(hoje);
            break;
        case 'custom':
            dataInicio = dataInicioCustomizada ? new Date(dataInicioCustomizada) : new Date(hoje);
            dataFim = dataFimCustomizada ? new Date(dataFimCustomizada) : new Date(hoje);
            break;
        default:
            dataInicio = new Date(hoje);
            dataInicio.setDate(hoje.getDate() - 7);
            dataFim = new Date(hoje);
    }

    return {
        startDate: dataInicio.toISOString().split('T')[0],
        endDate: dataFim.toISOString().split('T')[0],
    };
};

// Função para obter o sumário das vendas (Total, WhatsApp, Home Ótica)
const getVendasSumario = async (db, startDate, endDate) => {
    // Query para o sumário total
    const queryTotal = `
        SELECT 
            SUM(l.LCTVALOR) AS VENDAS_TOTAIS,
            COUNT(e.PEDSEQUENCIAL) AS NUM_VENDAS_TOTAIS,
            SUM(l.LCTVALOR) / COUNT(e.PEDSEQUENCIAL) AS TICKET_MEDIO_TOTAL
        FROM TB_VND_VENDEDOR a
        INNER JOIN TB_PES_PESSOA b ON b.PESID = a.PESID 
        INNER JOIN TB_DMV_DETALHEMETAVEND c ON c.VNDID = a.VNDID 
        INNER JOIN TB_MTV_METASVENDEDOR d ON d.MTVID = c.MTVID
        INNER JOIN TB_PED_PEDIDO e ON e.VNDID_PRIMEIRO = a.VNDID
        INNER JOIN TB_VPE_VENDAPEDIDOS f ON f.PEDID_PEDIDO = e.PEDID
        INNER JOIN TB_VEN_VENDA g ON g.VENID = f.VENID_VENDA
        INNER JOIN TB_LTV_LANCAMENTOVENDA h ON h.VENID = g.VENID
        INNER JOIN TB_LCT_LANCAMENTOS l ON l.LCTID = h.LCTID
        WHERE l.LCTDATALANCAMENTO >= ? 
        AND l.LCTDATALANCAMENTO <= ?
        AND e.FILID_FILIAL = '5'
        AND e.MCVID IS NULL;
    `;

    // Query para o sumário do WhatsApp
    const queryWhatsApp = `
        SELECT 
            SUM(l.LCTVALOR) AS VENDAS_TOTAIS,
            COUNT(e.PEDSEQUENCIAL) AS NUM_VENDAS_TOTAIS,
            SUM(l.LCTVALOR) / COUNT(e.PEDSEQUENCIAL) AS TICKET_MEDIO_TOTAL
        FROM TB_VND_VENDEDOR a
        INNER JOIN TB_PES_PESSOA b ON b.PESID = a.PESID 
        INNER JOIN TB_DMV_DETALHEMETAVEND c ON c.VNDID = a.VNDID 
        INNER JOIN TB_MTV_METASVENDEDOR d ON d.MTVID = c.MTVID
        INNER JOIN TB_PED_PEDIDO e ON e.VNDID_PRIMEIRO = a.VNDID
        INNER JOIN TB_VPE_VENDAPEDIDOS f ON f.PEDID_PEDIDO = e.PEDID
        INNER JOIN TB_VEN_VENDA g ON g.VENID = f.VENID_VENDA
        INNER JOIN TB_LTV_LANCAMENTOVENDA h ON h.VENID = g.VENID
        INNER JOIN TB_LCT_LANCAMENTOS l ON l.LCTID = h.LCTID
        WHERE l.LCTDATALANCAMENTO >= ? 
        AND l.LCTDATALANCAMENTO <= ?
        AND d.MTVVALORMETA = 30000
        AND e.FILID_FILIAL = '5'
        AND e.MCVID IS NULL;
    `;

    // Query para o sumário do Home Ótica
    const queryHomeOtica = `
        SELECT 
            SUM(l.LCTVALOR) AS VENDAS_TOTAIS,
            COUNT(e.PEDSEQUENCIAL) AS NUM_VENDAS_TOTAIS,
            SUM(l.LCTVALOR) / COUNT(e.PEDSEQUENCIAL) AS TICKET_MEDIO_TOTAL
        FROM TB_VND_VENDEDOR a
        INNER JOIN TB_PES_PESSOA b ON b.PESID = a.PESID 
        INNER JOIN TB_DMV_DETALHEMETAVEND c ON c.VNDID = a.VNDID 
        INNER JOIN TB_MTV_METASVENDEDOR d ON d.MTVID = c.MTVID
        INNER JOIN TB_PED_PEDIDO e ON e.VNDID_PRIMEIRO = a.VNDID
        INNER JOIN TB_VPE_VENDAPEDIDOS f ON f.PEDID_PEDIDO = e.PEDID
        INNER JOIN TB_VEN_VENDA g ON g.VENID = f.VENID_VENDA
        INNER JOIN TB_LTV_LANCAMENTOVENDA h ON h.VENID = g.VENID
        INNER JOIN TB_LCT_LANCAMENTOS l ON l.LCTID = h.LCTID
        WHERE l.LCTDATALANCAMENTO >= ? 
        AND l.LCTDATALANCAMENTO <= ?
        AND d.MTVVALORMETA = 40000
        AND e.FILID_FILIAL = '5'
        AND e.MCVID IS NULL;
    `;

    // Executando as queries
    const total = await executeQuery(db, queryTotal, [startDate, endDate]);
    const whatsapp = await executeQuery(db, queryWhatsApp, [startDate, endDate]);
    const homeOtica = await executeQuery(db, queryHomeOtica, [startDate, endDate]);

    // Obtendo as metas para cada equipe
    const queryMetasWhatsApp = `
        SELECT 
            b.PESNOME AS VENDEDOR, 
            d.MTVVALORMETA
        FROM TB_VND_VENDEDOR a
        INNER JOIN TB_PES_PESSOA b ON b.PESID = a.PESID 
        INNER JOIN TB_DMV_DETALHEMETAVEND c ON c.VNDID = a.VNDID 
        INNER JOIN TB_MTV_METASVENDEDOR d ON d.MTVID = c.MTVID
        INNER JOIN TB_PED_PEDIDO e ON e.VNDID_PRIMEIRO = a.VNDID
        INNER JOIN TB_VPE_VENDAPEDIDOS f ON f.PEDID_PEDIDO = e.PEDID
        INNER JOIN TB_VEN_VENDA g ON g.VENID = f.VENID_VENDA
        INNER JOIN TB_LTV_LANCAMENTOVENDA h ON h.VENID = g.VENID
        INNER JOIN TB_LCT_LANCAMENTOS l ON l.LCTID = h.LCTID
        WHERE l.LCTDATALANCAMENTO >= ?
        AND l.LCTDATALANCAMENTO <= ?
        AND d.MTVVALORMETA = 30000
        AND e.FILID_FILIAL = '5'
        AND e.MCVID IS NULL
        GROUP BY b.PESNOME, d.MTVVALORMETA;
    `;

    const queryMetasHomeOtica = `
        SELECT 
            b.PESNOME AS VENDEDOR, 
            d.MTVVALORMETA
        FROM TB_VND_VENDEDOR a
        INNER JOIN TB_PES_PESSOA b ON b.PESID = a.PESID 
        INNER JOIN TB_DMV_DETALHEMETAVEND c ON c.VNDID = a.VNDID 
        INNER JOIN TB_MTV_METASVENDEDOR d ON d.MTVID = c.MTVID
        INNER JOIN TB_PED_PEDIDO e ON e.VNDID_PRIMEIRO = a.VNDID
        INNER JOIN TB_VPE_VENDAPEDIDOS f ON f.PEDID_PEDIDO = e.PEDID
        INNER JOIN TB_VEN_VENDA g ON g.VENID = f.VENID_VENDA
        INNER JOIN TB_LTV_LANCAMENTOVENDA h ON h.VENID = g.VENID
        INNER JOIN TB_LCT_LANCAMENTOS l ON l.LCTID = h.LCTID
        WHERE l.LCTDATALANCAMENTO >= ?
        AND l.LCTDATALANCAMENTO <= ?
        AND d.MTVVALORMETA = 40000
        AND e.FILID_FILIAL = '5'
        AND e.MCVID IS NULL
        GROUP BY b.PESNOME, d.MTVVALORMETA;
    `;

    const metasWhatsApp = await executeQuery(db, queryMetasWhatsApp, [startDate, endDate]);
    const metasHomeOtica = await executeQuery(db, queryMetasHomeOtica, [startDate, endDate]);

    // Somando as metas para cada equipe
    const somaMetasWhatsApp = metasWhatsApp.reduce((acc, curr) => acc + curr.MTVVALORMETA, 0);
    const somaMetasHomeOtica = metasHomeOtica.reduce((acc, curr) => acc + curr.MTVVALORMETA, 0);
    const metaTotal = somaMetasWhatsApp + somaMetasHomeOtica;

    // Retornando os dados para a rota
    return {
        total: {
            ...total[0],
            META_TOTAL: metaTotal,
        },
        whatsapp: {
            ...whatsapp[0],
            META_WHATSAPP: somaMetasWhatsApp,
        },
        homeOtica: {
            ...homeOtica[0],
            META_HOMEOTICA: somaMetasHomeOtica,
        },
    };
};

// Função para obter o pódio dos três melhores vendedores
const getPodium3Melhores = async (db, startDate, endDate) => {
    const query = `
        SELECT FIRST 3 VENDEDOR, VENDAS, META, TM, NUM_VENDAS
FROM (
    SELECT 
        b.PESNOME AS VENDEDOR, 
        SUM(l.LCTVALOR) AS VENDAS,
        d.MTVVALORMETA AS META,
        SUM(l.LCTVALOR) / COUNT(e.PEDSEQUENCIAL) AS TM,
        COUNT(l.LCTVALOR) AS NUM_VENDAS
    FROM TB_VND_VENDEDOR a
    INNER JOIN TB_PES_PESSOA b ON b.PESID = a.PESID 
    INNER JOIN TB_DMV_DETALHEMETAVEND c ON c.VNDID = a.VNDID 
    INNER JOIN TB_MTV_METASVENDEDOR d ON d.MTVID = c.MTVID
    INNER JOIN TB_PED_PEDIDO e ON e.VNDID_PRIMEIRO = a.VNDID
    INNER JOIN TB_VPE_VENDAPEDIDOS f ON f.PEDID_PEDIDO = e.PEDID
    INNER JOIN TB_VEN_VENDA g ON g.VENID = f.VENID_VENDA
    INNER JOIN TB_LTV_LANCAMENTOVENDA h ON h.VENID = g.VENID
    INNER JOIN TB_LCT_LANCAMENTOS l ON l.LCTID = h.LCTID
    WHERE l.LCTDATALANCAMENTO >= ? 
    AND l.LCTDATALANCAMENTO <= ?
    AND e.FILID_FILIAL = '5'
    AND e.MCVID IS NULL
    GROUP BY b.PESNOME, d.MTVVALORMETA
    ORDER BY VENDAS DESC
        );
    `;
    return executeQuery(db, query, [startDate, endDate]);
};

// Função para obter a tabela de WhatsApp
const getTabelaWhatsApp = async (db, startDate, endDate) => {
    const query = `
        SELECT 
            b.PESNOME AS VENDEDOR, 
            SUM(l.LCTVALOR) AS VENDAS,
            d.MTVVALORMETA AS META, 
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
        WHERE l.LCTDATALANCAMENTO >= ? 
        AND l.LCTDATALANCAMENTO <= ?
        AND d.MTVVALORMETA = 30000
        AND e.FILID_FILIAL = '5'
        AND e.MCVID IS NULL
        GROUP BY b.PESNOME, d.MTVVALORMETA
        ORDER BY VENDAS DESC;
    `;
    return executeQuery(db, query, [startDate, endDate]);
};

// Função para obter a tabela de Home Ótica
const getTabelaHomeOtica = async (db, startDate, endDate) => {
    const query = `
        SELECT 
            b.PESNOME AS VENDEDOR, 
            SUM(l.LCTVALOR) AS VENDAS,
            d.MTVVALORMETA AS META, 
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
        WHERE l.LCTDATALANCAMENTO >= ? 
        AND l.LCTDATALANCAMENTO <= ?
        AND d.MTVVALORMETA = 40000
        AND e.FILID_FILIAL = '5'
        AND e.MCVID IS NULL
        GROUP BY b.PESNOME, d.MTVVALORMETA
        ORDER BY VENDAS DESC;
    `;
    return executeQuery(db, query, [startDate, endDate]);
};
//consolidando a rota para o dashboard
router.get('/', async (req, res) => {
    const { filtro, dataInicioCustomizada, dataFimCustomizada } = req.query;
    const { startDate, endDate } = calcularDatas(filtro, dataInicioCustomizada, dataFimCustomizada);

    try {
        // Conectando ao banco usando o connectDB e aguardando a conexão
        const db = await connectDB();

        // Obtendo os dados
        const sumario = await getVendasSumario(db, startDate, endDate);
        const podium = await getPodium3Melhores(db, startDate, endDate);
        const whatsapp = await getTabelaWhatsApp(db, startDate, endDate);
        const homeOtica = await getTabelaHomeOtica(db, startDate, endDate);

        // Enviando a resposta
        res.status(200).json({
            sumario: sumario,
            podium: podium,
            whatsapp: whatsapp,
            homeOtica: homeOtica
        });

        // Sempre desanexar o banco ao final
        db.detach();

    } catch (error) {
        console.error("Erro ao obter dados do dashboard:", error);
        res.status(500).json({ message: "Erro ao obter dados do dashboard", error });
    }
});

module.exports = router;
