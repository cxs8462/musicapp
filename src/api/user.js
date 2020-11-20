import {req} from '@/until/req'

export const getUserInfo = uid=>req('/user/detail',{uid})
