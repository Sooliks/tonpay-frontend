import React from 'react';


type BuyLayoutProps = {
    params: {
        subScopeId: string
    }
}
const Page = ({params}: BuyLayoutProps) => {
    return (
        <div>
            {params.subScopeId}
        </div>
    );
};

export default Page;