declare var gapi: any;

import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { Observable } from 'rxjs/internal/Observable';


@Injectable({
    providedIn: 'root'
})
export class DocService {

    private docId!: string;

    private finds: Array<string> = [''];

    public pdf!: any;

    private replaces: Array<string> = [''];

    constructor() {}

    loadClient(): Observable<any> | Promise<any> | any {

        return new Promise<void>( ( resolve, reject ) => {

            gapi.load( 'client', {

                callback: resolve,

                onerror: reject,

                timeout: 1000, // 5 seconds.
                
                ontimeout: reject

            });
            
        });

    }

    initClient(): Observable<any> | Promise<any> | any {

        return new Promise<void>( ( resolve, reject ) => {

            gapi.client.setToken( { access_token: sessionStorage.getItem('accessToken') } );
                 
                gapi.client.init({

                    apiKey: environment.gapiKey,

                    clientId: environment.gapiId,

                    immediate: true,

                    scope: ['https://www.googleapis.com/auth/drive','https://www.googleapis.com/auth/drive.file','https://www.googleapis.com/auth/documents']
                
                }).then( resolve, reject );
        });
    }    
    
    run(): Observable<any> | Promise<any> | any {

        return new Promise<void>( ( resolve, reject ) => {

            gapi.client.load( 'drive', 'v3', () => {

                Promise.all([

                    this.copyDoc()

                ]).then(

                    () => {

                        resolve();

                    },

                    reject

                );

            });

            gapi.client.load( "docs", "v1", () => {

                Promise.all([

                    this.rewriteDoc()

                ]).then(

                    () => {

                        resolve();

                    },

                    reject
                );

            });

            gapi.client.load( 'drive', 'v3', () => {

                Promise.all([

                    this.exportDoc()

                ]).then(
                    
                    () => {

                        resolve();

                    },

                    reject
                );

            });

        });

    }

    copyDoc(): Promise<any> {

        return new Promise(() => {  
            
            var response = gapi.client.drive.files.copy({

                "fileId": environment.fileRozluchenja //, 
                
                // "resource": {

                //   "name": "copy2"

                // }

            }).then(

                function( response: any ) {

                    // Handle the results here (response.result has the parsed body).
                    console.log("Response", response);

                },

                function( err: any ) { console.error("Execute error", err); }

            );

            response.execute( ( resp: any ) => {

                this.docId = resp.id;

            });

            gapi.client.drive.files.update({

                fileId: this.docId,

                resource: {

                    name: "copy2" //// named by client name

                }

            });

        });

    }

    rewriteDoc(): Promise<any> {

        return new Promise(() => {

            let requests = [];

            for ( let i=0; i<this.finds.length; i++ ){

                requests.push({

                    replaceAllText: {

                        containsText: {

                            text: this.finds[i],

                            matchCase: true

                        },

                        replaceText: this.replaces[i]

                    }

                });

            }

            const res = gapi.client.docs.documents.batchUpdate({
                
                documentId: this.docId,

                resource: { requests }

            });

        });

    }

    exportDoc(): Promise<any> {

        return new Promise(() => {

            this.pdf = gapi.client.drive.files.export({

                fileId: this.docId,

                mimeType: 'application/pdf'

            },{

                responseType: 'stream'
            })
            
            console.log("pdf done!");

            window.open( this.pdf );

        });

    }
    
}