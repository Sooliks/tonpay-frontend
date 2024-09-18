import { createContext } from "react"
import {UserType} from "@/types/user-type";


export type AuthContextType = {
    user: UserType | undefined
} | undefined

export const AuthContext = createContext<AuthContextType>(undefined)