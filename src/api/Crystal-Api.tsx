import {HttpClient, IHttpApiClient} from "./http";
import {Api} from "@mui/icons-material";
import {LiveCategory, LiveStream, LoginData, ShortEpg} from "./api.types";
import {number} from "prop-types";

export class CrystalApi {
    constructor(ApiUrl: string, Username: string, Password: string) {

        this._server = ApiUrl;
        this._username = Username;
        this._password = Password;

        this.valid = this.isValid();

        if (this.valid) {
            // if (this._server.toUpperCase().startsWith('HTTP://') == false) {
            //     this._server = 'http://' + this._server;
            // }

//            this._api = '/player_api.php?username=' + this._username + '&password=' + this._password;

            this._streamUrl = this._server + '/live/' + this._username + '/' + this._password + '/';
            if (this._streamUrl.toUpperCase().startsWith('HTTP://') == false) {
                this._streamUrl = 'http://' + this._streamUrl;
             }
            //
            this._qry = 'server=' + this._server + '&username=' + this._username + '&password=' + this._password;

            this._http = new HttpClient('https://crystals-iptv-vlc-viewer.vercel.app/api');
        }
    }

    private readonly _api: string;
    private readonly _streamUrl: string;
    private readonly _qry: string;

    public readonly valid: boolean;

    private readonly _server: string;
    private readonly _username: string;
    private readonly _password: string;

    private readonly _http: IHttpApiClient;


    private isValid(): boolean {
        return this._server != null && this._server.length > 0 && this._server.toUpperCase().indexOf('.OTTC.PRO') > 0
            && this._username != null && this._username.length > 0
            && this._password != null && this._password.length > 0;
    }

//gets gzip of json using http get

    private millisecondsInHour = (60 * (60 * 1000));
    private expirationHours = 12;

    private GetFromCache<T>(name: string): T {
        const time = localStorage.getItem(name + '_Time');
        if (time != null) {
            const expired = new Date(parseInt(time, 10) + (this.expirationHours * this.millisecondsInHour)).getTime();

            if (expired > 0 && expired < Date.now()) {
                const data = localStorage.getItem(name + '_Data');
                if (data != null) {
                    return JSON.parse(data) as T;
                }
            }
        }
        return null;
    }

    private SetIntoCache(name: string, res: any) {
        localStorage.setItem(name + '_Data', JSON.stringify(res));
        localStorage.setItem(name + '_Time', Date.now().toString(10));
    }

    public async Login(): Promise<LoginData> {
        // const cached = this.GetFromCache<LoginData>('Login');
        // if (cached != null) {
        //     return cached;
        // }
        const res = await this._http.get<LoginData>('/Login', this._qry);
        //this.SetIntoCache('Login', res);

        return res;
    }

    public Logout(): void {
        localStorage.removeItem('LoginData');
        localStorage.removeItem('LoginTime');
        document.location.reload();
    }


    public async GetLiveCategories(): Promise<LiveCategory[]> {

        const cached = this.GetFromCache<LiveCategory[]>('GetLiveCategories');
        if (cached != null) {
            return cached;
        }
        const res = await this._http.get<LiveCategory[]>('/GetLiveCategories', this._qry);//39
        this.SetIntoCache('GetLiveCategories', res);

        return res;
    }

    public async GetLiveStreamsByCategoryId(categoryId: number = 39): Promise<LiveStream[]> {//39  = israel/hebrew channels
        const cached = this.GetFromCache<LiveStream[]>('GetLiveStreamsByCategory');
        if (cached != null) {
            return cached;
        }
        const res = await this._http.get<LiveStream[]>('/GetLiveStreamsByCategory', this._qry + '&category_id=' + categoryId.toString());
        this.SetIntoCache('GetLiveStreamsByCategory', res);

        return res;
    }

    public async GetLiveStreamsByCategory(category: LiveCategory): Promise<LiveStream[]> {
        const cached = this.GetFromCache<LiveStream[]>('GetLiveStreamsByCategory');
        if (cached != null) {
            return cached;
        }
        const res = await this._http.get<LiveStream[]>('/GetLiveStreamsByCategory', this._qry + '&category_id=' + category.category_id);
        this.SetIntoCache('GetLiveStreamsByCategory', res);

        return res;
    }

    public async GetShortEpgByStreamId(streamId: number): Promise<ShortEpg> {
        return await this._http.get<ShortEpg>('/GetShortEpgByStream', this._qry + '&stream_id=' + streamId.toString());
    }

    public async GetShortEpgByStream(stream: LiveStream): Promise<ShortEpg> {
        return await this._http.get<ShortEpg>('/GetShortEpgByStream', this._qry + '&stream_id=' + stream.stream_id.toString());
    }

    public GetVlcStreamUrlById(streamId: number): string {
        return this._streamUrl + streamId.toString() + '.ts';
    }

    public GetVlcStreamUrl(stream: LiveStream): string {
        if (stream == null) {
            return null;
        }
        return this._streamUrl + stream.stream_id.toString() + '.ts';
    }
}


/*
https://shivampandey.hashnode.dev/resolve-cors-with-vercel-serverless-functions

api/[name].ts

import type { VercelRequest, VercelResponse } from '@vercel/node';

export default async (request: VercelRequest, response: VercelResponse) => {
  const { name } = request.query;
    //const { body } = req;
  response.status(200).send(`Hello ${name}!`);
};


//npm i -D @vercel/node

You can also define a tsconfig.json to configure the Vercel TypeScript compiler.

https://vercel.com/docs/concepts/functions/serverless-functions/runtimes/node-js#advanced-node.js-usage

*/