import {req} from "@/until/req"

export const banner = ()=>req("/banner",{type:0})

export const tjpersonalized = ()=>req("/personalized",{limit:10})

export const tjmv = ()=>req("/personalized/mv")

export const tjnewsong = ()=>req("/personalized/newsong",{limit:10})

