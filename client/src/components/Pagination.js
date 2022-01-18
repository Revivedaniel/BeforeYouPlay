// Import useEffect from React.
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import PaginationStyles from './styles/PaginationStyles';
import { perPage } from '../config';

export default function Pagination({ page, count, route }) {
    useEffect(() => {
        document.title = `Games Page ${page}`;
    });
    const pageCount = Math.ceil(count / perPage);

    return (
        <PaginationStyles>
            <Link to={`${route || ""}/${page - 1}`} aria-disabled={page <= 1 } shallow >🠔 Prev</Link>
            <p>Page {page} of {pageCount}</p>
            <p>{count} Items Total</p>
            <Link to={`${route || ""}/${page + 1}`} aria-disabled={page * perPage >= count} shallow >Next 🠖</Link>
        </PaginationStyles>
    )
}
{/* <Link to={route ? `${route}/${page + 1}` : `/${page + 1}`} aria-disabled={page * perPage >= count} shallow >Next 🠖</Link> */}
