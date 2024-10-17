'use client'
import React from 'react';


type ProfilePageProps = {
    params: {
        id: string
    }
}
const SalesPage = ({params}: ProfilePageProps) => {
    return (
        <div>
            sales profile page {params.id}
        </div>
    );
};

export default SalesPage;