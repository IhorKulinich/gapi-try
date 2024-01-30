declare var gapi: any;

import { Injectable, NgZone } from '@angular/core';
import { environment } from '../../../../environments/environment';


@Injectable({
    providedIn: 'root'
})
export class AuthService {
    gAuth: any;
    constructor() {
    }

    initOAuth(): Promise<any>{
        return gapi.load('auth2', () => {
            gapi.auth2.init({
                client_id: environment.gapiId,
                scope: environment.gapiEmail // note "client_id", not "apiKey"
            }).then((auth2: any) => {
                if (!auth2.isSignedIn.get()) { // check if already signed in
                    this.signInAuth(auth2);
                }
            });
        });
    }

    signInAuth(auth2: any){
        auth2.signIn().then((response: any) => {
            console.log("sign in progress")
            
            const authResponse = response.currentUser.get().getAuthResponse();
            sessionStorage.setItem('accessToken', authResponse.access_token);
            
            console.log("access token:");
            console.log(authResponse.access_token);
        })
        .catch(function(err: any) {
          console.log(err);
        })
    }
        // return new Promise((resolve, reject) => {
        //     gapi.load('auth2', async () => {
        //         //gapi.auth2.getAuthInstance()
        //         this.gAuth = await gapi.auth2.init({
        //             client_id: environment.gapiId,
        //             fetch_basic_profile: true,
        //             scope: environment.gapiEmail
        //         });
        //         resolve(this.gAuth);
        //     }, reject);
        // });

    // fetchGoogleUser(): Promise<any> {
    //     return new Promise(async (resolve, reject) => {
    //         try {
    //             const gAuth = await this.initGoogleOAuth();
    //             const oAuthUser = await gAuth.signIn().then((response: any) => {
    //                 console.log("sign in success")
    //                 // Do stuff
    //             })
    //             .catch(function(err: any) {
    //               console.log(err);
    //             });
    //             const authResponse = gAuth.currentUser.get().getAuthResponse();

    //             sessionStorage.setItem('accessToken', authResponse.access_token);
    //             console.log("access token");
    //             console.log(authResponse.access_token);
    //         } catch (e) {
    //             reject(e);
    //         }
    //     });
    // }
}