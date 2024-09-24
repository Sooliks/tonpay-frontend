type ProfileLayoutProps = {
    params: {
        id: string
    }
    children: React.ReactNode
}


import React from 'react';

const ProfileLayout = ({params, children}: ProfileLayoutProps) => {
    return (
        <>
            {'Профиль id - ' + params.id}
            {children}
        </>
    );
};

export default ProfileLayout;