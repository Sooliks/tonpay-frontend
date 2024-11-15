'use client'
import React from 'react';
import {Card} from "@/components/ui/card";
import UserAvatar from "@/components/my-ui/UserAvatar";
import {UserType} from "@/types/user-type";
import SpinLoading from "@/components/my-ui/SpinLoading";
import useSWR from "swr";
import {Separator} from "@/components/ui/separator";
import {Star} from "lucide-react";
import FirstSendMessageDialog from "@/components/my-ui/FirstSendMessageDialog";
import CountryList from "country-list-with-dial-code-and-flag";
import CopyButton from "@/components/my-ui/CopyButton";
import NotFound from "@/app/[lang]/not-found";
import ProfileMenu from "@/app/[lang]/profile/[id]/ProfileMenu";
import {useTranslation} from "@/hooks/useTranslation";

type ProfileLayoutProps = {
    params: {
        id: string
    }
    children: React.ReactNode
}


const ProfileLayout = ({params, children}: ProfileLayoutProps) => {
    const { data, error, isLoading } = useSWR<UserType>(`/profile/${params.id}`)
    const {translations} = useTranslation();
    const country = CountryList.findOneByCountryCode(data?.languageCode || "")|| undefined
    if(isLoading){
        return <SpinLoading/>
    }
    if(!data){
        return <NotFound/>
    }
    return (
        <div className={'p-4'}>
            <Card className={'p-4'}>
                <div className={'flex justify-between'}>
                    <h1>{translations.frequent.user}</h1>
                    <p className={'text-sm text-muted-foreground'}>{country?.flag}</p>
                </div>
                <Separator className={'mt-2 mb-4'}/>
                <div className={'flex items-center justify-between'}>
                    <div>
                        <UserAvatar photoUrl={data?.photoUrl || ''} nickname={data!.nickname} id={params.id} link={false}/>
                        {data?.isOnline ?
                            <p className={'text-muted-foreground text-sm'}>{translations.frequent.onlineNow}</p>
                            :
                            data && <p className={'text-muted-foreground text-sm'}>{translations.profile.lastOnline}: {new Date(data.lastOnline).toLocaleDateString() + ' ' + new Date(data.lastOnline).toLocaleTimeString()}</p>
                        }
                    </div>
                    {data && data.averageRating && <p className={'flex items-center'}>{translations.frequent.rate}: <Star className={'w-4 h-4 ml-1'}/> {data.averageRating}</p>}
                </div>
                <Separator className={'my-2'}/>
                <div className={'flex items-center justify-between'}>
                    <FirstSendMessageDialog recipientId={data.id}/>
                    <CopyButton refTelegram copyText={`profile${data.id}`} textButton={translations.frequent.share}/>
                </div>
            </Card>
            <ProfileMenu
                tabs={[
                    /*{title: 'View', key: '/'},*/
                    {title: translations.menu.profileId.sales, key: `/sales`},
                    {title: translations.menu.profileId.feedbacks, key: `/feedbacks`}
                ]}
                idProfile={params.id}
                defaultKey={'/sales'}
            />
            {children}
        </div>
    );
};

export default ProfileLayout;