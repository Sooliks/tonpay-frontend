'use client'
import React from 'react';

type ProfileLayoutProps = {
    params: {
        id: string
    }
}

const SalePage = ({params}: ProfileLayoutProps) => {
    return (
        <div>
            sale id {params.id}
        </div>
    );
};

export default SalePage;