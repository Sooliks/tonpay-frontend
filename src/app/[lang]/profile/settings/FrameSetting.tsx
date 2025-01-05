'use client'
import React from 'react';

const FrameSetting = ({children}:{children: React.ReactNode}) => {
    return (
        <div className={'flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm mb-2'}>
            {children}
        </div>
    );
};

export default FrameSetting;