import React from 'react';
import { Link } from 'gatsby';

const Voltar = () => {
    return (
        <Link to="/home" style={{ textDecoration: 'none', color: 'black' }}>
            <button>
                Voltar
            </button>
        </Link>
    );
};

export default Voltar;
