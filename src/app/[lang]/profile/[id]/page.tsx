'use client'
import React, {useLayoutEffect} from 'react';
import {useRouter} from "next/navigation";

type ProfilePageProps = {
    params: {
        id: string
    }
}

const ProfilePage = ({params}: ProfilePageProps) => {
    const {replace} = useRouter();
    useLayoutEffect(()=>{
       replace(`/profile/${params.id}/sales`)
    },[])
    return (
        <div>

        </div>
    );
};

export default ProfilePage;