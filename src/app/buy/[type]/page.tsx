import React from 'react';



type BuyLayoutProps = {
    params: {
        type: string
    }
}

const BuyPage = ({params}: BuyLayoutProps) => {
    return (
        <div>
            {params.type}
        </div>
    );
};

export default BuyPage;