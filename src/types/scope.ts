import {SubScope} from "@/types/subScope";

export type Scope = {
    id: string
    name: string
    type: ScopeType
    subScopes: SubScope[]
}

export type CreateScope = {
    name: string
    type: ScopeType
}

export type ScopeType = 'pc_games' | 'mobile_games' | 'tg_mini_app_game' | 'social_network'
