// useLogout.ts

import {fetchData} from "@/utils/api";
import {useCookies} from "react-cookie";
import {useRouter} from "next/navigation";
import {useState} from "react";

export function useLogout() {
    const [error, setError] = useState<string | null>(null);
    const [cookies, setCookie] = useCookies(['userId']);
    const router = useRouter();

    const logout = async () => {
        try {
            const data = await fetchData('/authorization/logout', 'POST');

            if (data.message === 'Successfully logged out') {
                if (typeof window !== 'undefined') {
                    localStorage.clear();
                }
                setCookie('userId', '', {path: '/', sameSite: 'strict', maxAge: 0});
                router.push('/');
            }
        } catch (error) {
            if (error instanceof Error) {
                setError(error.message);
            } else {
                setError('An unknown error occurred');
            }
        }
    }

    return {logout, error};
}