'use client'
import {useAuth} from "@/hooks/useAuth";

export default function Home() {
    const auth = useAuth();
    const user = auth.user

    return (
        <div>
            вавыап
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
                            nickname: { user.nickname }
                        </div>
                    </div>
                )
            }
        </div>
    );
}
