import {HttpClient, IHttpApiClient} from "./http";
import {Api} from "@mui/icons-material";
import {LiveCategory, LiveStream, LoginData, ShortEpg} from "./api.types";

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
            this._streamUrl = '/live/' + this._username + '/' + this._password + '/';
            //
            this._http = new HttpClient('https://crystals-iptv-vlc-viewer.vercel.app/api');
        }
    }

    private readonly _api: string;
    private readonly _streamUrl: string;

    public readonly valid: boolean;

    private readonly _server: string;
    private readonly _username: string;
    private readonly _password: string;

    private readonly _http: IHttpApiClient;


    private isValid(): boolean {
        return  this._server != null && this._server.length > 0 && this._server.toUpperCase().indexOf('.OTTC.PRO') > 0
        && this._username != null && this._username.length > 0
        && this._password != null && this._password.length > 0;
    }

//gets gzip of json using http get

    public async Login(): Promise<LoginData> {
        return await this._http.get<LoginData>(this._api+'/Login');
    }

    public async GetLiveCategories(): Promise<LiveCategory[]> {
        return await this._http.get<LiveCategory[]>(this._api + '&action=get_live_categories');//39
    }

    public async GetLiveStreamsByCategoryId(categoryId: number = 39): Promise<LiveStream[]> {//39  = israel/hebrew channels
        return await this._http.get<any>(this._api + '&action=get_live_streams&category_id=' + categoryId.toString());
    }

    public async GetLiveStreamsByCategory(category: LiveCategory): Promise<LiveStream[]> {
        return await this._http.get<any>(this._api + '&action=get_live_streams&category_id=' + category.category_id);
    }

    public async GetShortEpgByStream(stream: LiveStream): Promise<ShortEpg> {
        return await this._http.get<ShortEpg>(this._api + '&action=get_short_epg&stream_id=' + stream.stream_id.toString());
    }

    public GetVlcStreamUrl(stream: LiveStream): string {
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