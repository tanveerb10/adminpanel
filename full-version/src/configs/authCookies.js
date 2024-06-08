import { cookies } from "next/headers";

export const getTokenFromCookies=()=>{
const cookieStore = cookies()
const accessToken = cookieStore.get('accessToken')?.value
const refreshToken = cookieStore.get('refreshToken')?.value

return {accessToken,refreshToken}
}
