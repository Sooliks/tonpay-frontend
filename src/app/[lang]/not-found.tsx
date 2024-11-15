import React from 'react';
import {Badge} from "@/components/ui/badge";

const NotFound = () => {
    return (
        <div className={'overflow-y-hidden w-screen flex justify-center items-center'}>
            <p className={'mt-56 flex items-center'}>Not Found <Badge className={'bg-red-800 ml-2'}>404</Badge></p>
        </div>
    );
};

export default NotFound;