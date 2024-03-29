import {nullable} from './api.types';
import React, {useEffect, useState} from 'react';
import axios, {AxiosInstance, AxiosResponse} from 'axios';
import _ from 'lodash';
import {GetCurrentQueryString} from "../services/string.services";

//import 'isomorphic-unfetch'; //global pollyfill
import fetchAdapter from '@vespaiach/axios-fetch-adapter'; //error: https://github.com/square/square-nodejs-sdk/issues/111#issuecomment-1328522809
//alternative: https://github.com/haverstack/axios-fetch-adapter

const isSSR = typeof window === 'undefined';// || (
//   typeof navigator === 'undefined' || typeof window.navigator === 'undefined' ||
//   typeof navigator.onLine === 'undefined'
// ) || (window.document == null ||
//   window.document.createElement == null);


//awesome axios to api example by square sdk:
// https://github.com/square/square-nodejs-sdk/blob/master/src/client.ts
//they used: https://www.apimatic.io/
//https://www.npmjs.com/package/@apimatic/core?activeTab=explore   /* /@apimatic/core/src/http/httpClient.ts */


export interface IHttpApiClient {
    setToken(token: nullable<string>): void;

    get<T>(url: string, queryString: any): Promise<T>;

    get<T>(url: string): Promise<T>;

    get<T>(): Promise<T>;

    post<T>(url: string, data: any): Promise<T>;

    postFormData<T>(url: string, data: URLSearchParams): Promise<T>

    patch<T>(url: string, data: any): Promise<T>;

    put<T>(url: string, data: any): Promise<T>;

    delete<T>(url: string): Promise<T>;

    queryParams: any;
}

//
// export const sanitize = (data: string): string => {
//   // @ts-ignore
//   return _.unescape(DOMPurify.sanitize(data ?? '', { SAFE_FOR_JQUERY: true }));
// };

/*
const http2 = require("http2-wrapper"); // both fetch api and http2 support will be default on axios code rewrite
//var http2 = require('http2');//only for node , for client fetch should support , for now there is node-fetch


const http2Transport = {
  request: function request(options, handleResponse) {
    const req = http2.request(options, handleResponse);


    setImmediate(() => {
      // Remove the axios action `socket.setKeepAlive` because the HTTP/2 sockets should not be directly manipulated
      const listeners = req.listeners("socket");
      if (listeners.length) req.removeListener("socket", listeners[0]);
    });

    //need fixes: https://github.com/axios/axios/issues/1175#issuecomment-1353230862
    //https://github.com/szmarczak/http2-wrapper/

    return req;
  },
};


axios
  .get("https://httpbin.org/", {
    transport: http2Transport,
  })
}*/


export class HttpClient implements IHttpApiClient {
    constructor(baseApiUrl: string = '', loginPage: string = '') {
        this.baseApiUrl = baseApiUrl;
        this.loginPageUrl = loginPage;
        this.axClient = axios.create();// vs ky / ky-universal / Wretch / bent
        //https://github.com/sindresorhus/got
        //You can use ky/ky-universal in the server for SSR (node-fetch), it's just that got is more full-featured and tailored for Node.
        //fetch polyfill: https://github.com/developit/unfetch , /  isomorphic-unfetch


        if (baseApiUrl != null && baseApiUrl.length > 0)
            this.axClient.defaults.baseURL = this.baseApiUrl;

        this.axClient.defaults.headers.common['Content-Type'] = 'application/json;charset=UTF-8';
        this.axClient.defaults.headers.common['Accept'] = 'application/json, text/plain, */*';
        this.axClient.defaults.timeout = 20 * 1000;//1000-2500 , default=0(no timeout)
        //c# default: 100 seconds ,  as DNS query may take up to 15 seconds, so ip url is faster
        // login takes up to 5 sec

        //       export const DEFAULT_TIMEOUT = 30 * 1000;//apimatic core


        this.axClient.defaults.withCredentials = false; //res.header('Access-Control-Allow-Credentials', true);

        this.axClient.defaults.adapter = fetchAdapter;

        try {
            const qry = GetCurrentQueryString();
        } catch (e) {
        }


        this.axClient.interceptors.response.use(function (res) {
            // if(res.headers['custom-Header'] == 'qwerty123'){
            //     //do action...
            // }


            return res;//this.ToFetchApiResponse(res);//used with fetchAdapter
        }, (err) => {

            if (err != null) {
                if (err.response != null) {
                    const errCode = err.response.status;
                    if (errCode == 401) {//no token on store/local storage/api is not anonymous
                        console.log(401, 'UnAuthorized!');
                        this.logout();
                    } else if (errCode == 403) {//token expired / token data was changed from original / server key changed on server restart
                        console.log(403, 'Forbidden!');
                        this.logout();
                    } else if (errCode == 407) {
                        console.log(407, 'Proxy Authentication Required!');
                        /*
                        This code is similar to 401 (Unauthorized), but indicates that the client must first authenticate itself with the proxy.
                         The proxy MUST return a Proxy-Authenticate header field (section 14.33) containing a challenge applicable to the proxy
                          for the requested resource. The client MAY repeat the request with a suitable Proxy-Authorization header field
                           (section 14.34). HTTP access authentication is explained in "HTTP Authentication: Basic and Digest Access Authentication"
                        */
                    } else if (errCode == 402) {
                        console.log(402, 'Payment Required!');//reserved for future use in browsers
                    }
                    //404 Not Found
                    //405 Method Not Allowed

                    //do:
                    //logout or
                    //Redirect to login page , or
                    //Request refresh token
                } else {
                    console.log(err);
                }
            }
            return Promise.reject(err);
        });

    }

    //convert axios back to fetch api:
    ToFetchApiResponse(res: AxiosResponse): Response {
        return new Response(res.data, //BufferSource(ArrayBuffer XMLHttpRequest.response)  | string(text/json XMLHttpRequest.responseText): )
            {
                status: res.status,
                statusText: res.statusText,
                headers: res.headers //Headers(fetch-api) | Record<string, string>(axios);
            });

    }

    logout(): void {
        console.log('http logout()');

        //localStorage.removeItem('_token');
        this.setToken(null);

        //window.location.reload();
        //will then call to authenticator.loadAccessToken(); on refresh and redir to login page
    }

    private readonly baseApiUrl: string;
    private readonly loginPageUrl: string;
    readonly queryParams: any;
    private readonly axClient: AxiosInstance;

    //jwt
    setToken(token: nullable<string>): void {
        if (this.axClient != null)
            if (token == null || token.length == 0) {
                // this.axClient.defaults.withCredentials = false; //?
                this.axClient.defaults.headers.common['Authorization'] = '';
            } else {
                // this.axClient.defaults.withCredentials = true; //?
                this.axClient.defaults.headers.common['Authorization'] = 'Bearer ' + token;
            }
    }


    async get<T>(url: string = '', queryString: any = null): Promise<T> { //RequestInfo = Request | string; , RequestInit(BodyInit,HeadersInit)
        //       'X-XSRF-TOKEN': (_xsrfToken || "")
        if (isSSR || this.axClient == null) {
            // @ts-ignore
            return Promise.resolve(null);
        }
        let qry: string = '';
        if (queryString != null) {
            const str = queryString as string;
            if (str != null && str.length > 0) {
//              const prefixed = qs.parse('?a=b&c=d', { ignoreQueryPrefix: true });
                qry = '?' + queryString;
            } else {
                qry = '?' + new URLSearchParams(queryString).toString(); // , { encode: false , strictNullHandling: true ,  skipNulls: true }
            }
        }
        //let cancelToken = axios.CancelToken.source();
        return await this.axClient.get(`${url}${qry}`)//  {cancelToken: cancelToken.token} //{maxRedirects: 0 //5 is default}
            .then(res => {
                console.log('GET: ', url, res.data,this.ToFetchApiResponse(res));
                return res;
            })
            .then(res => res.data as T)
            .catch(err => {
                console.error('GET: ', url, err);
                return err?.response?.data; // throw err; ?
            });
    }

    async post<T>(url: string, data: any): Promise<T> {
        if (isSSR || this.axClient == null) {
            // @ts-ignore
            return Promise.resolve(null);
        }
        //transformRequest() -> stringifySafely() -> does JSON.stringify(data);
        return await this.axClient.post(`${url}`, data)
            .then(res => {
                console.log('POST: ', url, res.data,this.ToFetchApiResponse(res));
                return res;
                })
            .then(res => res.data as T)
            .catch(err => {
                console.error('POST: ', url, err);
                return err?.response?.data;
            });

    }

    async postFormData<T>(url: string, data: URLSearchParams): Promise<T> {
        if (isSSR || this.axClient == null) {
            // @ts-ignore
            return Promise.resolve(null);
        }

        //transformRequest() -> stringifySafely() -> does JSON.stringify(data);
        return await this.axClient.post(`${url}`, data, {
            headers: {
                'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,application/json, text/plain,*/*;q=0.8',
                'Content-Type': 'application/x-www-form-urlencoded',//(URLSearchParams) or //'multipart/form-data'(FormData)
            },
            maxRedirects: 0,
            //    withCredentials: true

        })
            .then(res => {
                console.log('POST: ', url, res.headers);
                //window.document.cookie
                return res;
            })
            .then(res => res.data as T)
            .catch(err => {
                console.error('POST: ', url, err?.response?.headers, err);
                return err?.response?.data;
            });
    }

    async patch<T>(url: string, data: any): Promise<T> {
        if (isSSR || this.axClient == null) {
            // @ts-ignore
            return Promise.resolve(null);
        }
        return await this.axClient.patch(`${url}`, data)
            .then(res => {
                console.log('PATCH: ', url, res.data);
                return res;
            })
            .then(res => res.data as T)
            .catch(err => {
                console.error('PATCH: ', url, err);
                return err?.response?.data;
            });
    }

    async put<T>(url: string, data: any): Promise<T> {
        if (isSSR || this.axClient == null) {
            // @ts-ignore
            return Promise.resolve(null);
        }
        return await this.axClient.put(`${url}`, data)
            .then(res => {
                console.log('PUT: ', url, res.data);
                return res;
            })
            .then(res => res.data as T)
            .catch(err => {
                console.error('PUT: ', url, err);
                return err?.response?.data;
            });
    }

    async delete<T>(url: string): Promise<T> {
        if (isSSR || this.axClient == null) {
            // @ts-ignore
            return Promise.resolve(null);
        }
        return await this.axClient.delete(`${url}`)
            .then(res => {//AxiosResponse
                console.log('DELETE: ', url, res.data);
                return res;
            })
            .then(res => res.data as T)
            .catch(err => {//AxiosError
                console.error('DELETE: ', url, err);
                return err?.response?.data;
            });
    }
}
