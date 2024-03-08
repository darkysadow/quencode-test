import axios from "axios";

const instance = axios.create({
    withCredentials: true,
    headers: {
        "Content-Type": 'application/json'
    },
    baseURL: 'https://auth-qa.qencode.com/'
})

export const authAPI = {
    accessToken(accessId) {
        return instance.post('v1/auth/access-token', {access_id: toString(accessId)})
    },
    refreshToken(refreshToken) {
        return instance.post('v1/auth/refresh-token', {refresh_token: toString(refreshToken)})
    },
    login(email, password) {
        return instance.post('v1/auth/login', {email, password})
    },
    passwordReset(email) {
        return instance.post('v1/auth/password-reset', {email})
    },
    passwordSet(token, secret, password) {
        return instance.post('v1/auth/password-set', {token, secret, password})
    },
    healthcheck() {
        return instance.get('/healthcheck')
    }
}