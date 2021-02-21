import {useState, useCallback, useEffect} from 'react'

const storageName = 'userData'

export const useAuth = () => {
    const [token, setToken] = useState(null)
    const [ready, setReady] = useState(false)
    const [userId, setUserId] = useState(null)
    const [userData, setUserData] = useState(null)

    const login = useCallback((jwtToken, id, graphData) => {
        setToken(jwtToken)
        setUserId(id)
        setUserData(graphData)

        localStorage.setItem(storageName, JSON.stringify({
            userId: id, token: jwtToken, userData: graphData
        }))
    }, [])


    const logout = useCallback(() => {
        setToken(null)
        setUserId(null)
        setUserData(null)
        localStorage.removeItem(storageName)
    }, [])

    useEffect(() => {
        const data = JSON.parse(localStorage.getItem(storageName))

        if (data && data.token) {
            login(data.token, data.userId, data.userData)
        }
        setReady(true)
    }, [login])


    return { login, logout, token, userId, userData, ready }
}