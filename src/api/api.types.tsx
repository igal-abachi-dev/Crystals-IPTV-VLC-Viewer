export type nullable<T> = (T | null | undefined);

export const guidEmpty = "00000000-0000-0000-0000-000000000000";

export interface LoginData {
    "user_info": UserInfo,
    "server_info": ServerInfo
}

/*
localStorage:{
    LoginData, //as login token
    loginTime// if week past , loginData is expired

        username, //to use crystal api
        password,//website is for functional comfort , not for prod security
        server,
        port,

        LiveStreams //in case connection/server/data is down
}*/

export interface UserInfo {
    username: string;
    password: string;
    message: string;
    auth: number;//0 or 1
    status: string// enum: active
    "exp_date": string;
    "is_trial": string;//"0"
    "active_cons": string;//"0"
    "created_at": string;
    "max_connections": string;//"1"
    "allowed_output_formats": string[]// ["ts"]
}

export interface ServerInfo {
    url: string;
    port: string;//80
    "https_port": string;//443
    "server_protocol": string;//http
    "rtmp_port": string;//number
    timezone: string;//name
    "timestamp_now": number;
    "time_now": string;
    process: boolean;
}

export interface LiveCategory {
    "category_id": string;//number
    "category_name": string;
    "parent_id": string;//0
}

export interface LiveStream {
    num: number;
    name: string;
    "stream_type": string;//enum: live
    "stream_id": number;//important for vlc
    "stream_icon": string;//channel logo png url
    "epg_cannel_id": string;//null or ""
    added: string;//date
    "is_adult": string;//"0" or "1"
    "category_id": string;//number
    "custom_sid": string;
    "tv_archive": number;
    "direct_source": string;
    "tv_archive_duration": number;//0
}

export interface ShortEpg {
    epg_listings: EpgLine[];
}

export interface EpgLine {
    id: string;//number
    "epg_id": string;
    title: string;//base64 string
    lang: string;//en / he
    start: string;
    end: string;
    description: string;//base64 string
    "channel_id": string;//channel nickname
    "start_timestamp": string;
    "stop_timestamp": string;
}