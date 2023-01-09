import { SET_USER, SOCKET_CONNECT, FETCH_GROUPS, FETCH_ALL_MESSAGES } from "./actionTypes"

export const setUser = (payload) => {
    return {
        type: SET_USER,
        payload
    }
}

export const setGroups = (payload) => {
    return {
        type: FETCH_GROUPS,
        payload
    }
}

export const setSocket = (payload) => {
    return {
        type: SOCKET_CONNECT,
        payload
    }
}

export const setAllMessages = (payload) => {
    return {
        type: FETCH_ALL_MESSAGES,
        payload
    }
}
