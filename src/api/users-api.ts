import {GetItemsType, instance, APIResponseType} from "./api";
import {profileAPI} from "./profile-api";
import {AxiosResponse} from "axios";
import {FilterType} from "../redux/users-reducer";

export const usersAPI = {
    getUsers(currentPage = 1, pageSize = 10, term: string = '', friend: null | boolean = null) {
        return instance.get<GetItemsType>(`users?page=${currentPage}&count=${pageSize}&term=${term}` + (friend === null ?'':`&friend=${friend}`)).then(response => response.data);
    },
    follow(userId: number) {
        return instance.post<APIResponseType>(`follow/${userId}`).then(response => response.data);
    },
    unfollow(userId: number) {
        return instance.delete<APIResponseType>(`follow/${userId}`).then(response => response.data);
    },
}