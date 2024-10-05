type ProfileLayoutProps = {
    params: {
        id: string
    }
    children: React.ReactNode
}


import React from 'react';

const ProfileLayout = ({params, children}: ProfileLayoutProps) => {
    return (
        <div className={'p-4'}>
            <h4 className={'text-center scroll-m-20 text-xl font-semibold tracking-tight'}>{params.id}</h4>
            {children}
        </div>
    );
};

export default ProfileLayout;