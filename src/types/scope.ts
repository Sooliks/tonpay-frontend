import {SubScope} from "@/types/subScope";

export type Scope = {
    id: string
    name: string
    type: 'pc_games' | 'mobile_games' | 'tg_mini_app_game' | 'social_network'
    subScopes: SubScope[]
}

export type CreateScope = {
    name: string
    type: 'pc_games' | 'mobile_games' | 'tg_mini_app_game' | 'social_network'
}