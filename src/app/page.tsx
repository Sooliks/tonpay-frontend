'use client'
import {useAuth} from "@/hooks/useAuth";
import {retrieveLaunchParams} from "@telegram-apps/sdk";


export default function Home() {
    const { initDataRaw } = retrieveLaunchParams();
    const auth = useAuth();


    const user = auth.user
    return (
        <div>
            {initDataRaw}
            {
                user && (
                    <div>
                        <div>
                            id: { user.id }
                        </div>
                        <div>
                            telegramId: { user.telegramId }
                        </div>
                        <div>
                            username: { user.nickname }
                        </div>
                    </div>
                )
            }
        </div>
    );
}
