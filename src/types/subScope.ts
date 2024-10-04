import {Scope} from "@/types/scope";

export type SubScope = {
    id: string
    scopeId: string
    name: string
    scope: Scope
}

export type CreateSubScope = {
    name: string
}