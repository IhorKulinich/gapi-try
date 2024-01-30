import { Component, OnInit } from '@angular/core';
import { AuthService } from "../shared/services/medium/gapi-auth.service";
import { DocService } from '../shared/services/medium/gapi-doc.service';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {
  apiLoaded!: boolean;
  apiFailed!: boolean;
  apiReady!: boolean;
  authReady!: boolean;
  authFailed!: boolean;

  constructor(
    private serviceDoc: DocService, 
    private serviceAuth: AuthService,
  ){
    
  }

  ngOnInit(): void {

    this.serviceAuth.initOAuth().then(
      (result: any) => {
        console.log("access token");
        console.log(sessionStorage.getItem('accessToken'));

        this.authReady = true;
        return this.serviceDoc.loadClient().then(
          (result: any) => {
            console.log("api loaded");
            this.apiLoaded = true;
            return this.serviceDoc.initClient()
          },
          (err: any) => {
            this.apiFailed = true;
            console.log(err);
          }
        ).then((result: any) => {
          console.log("api ready");
          this.apiReady = true;
          this.serviceDoc.run();
        }, (err: any) => {
          this.apiFailed = true;
          console.log(err);
        });
      },
      (Err: any) => {
          this.authFailed = true;
          console.log(Err);
      }
    )

  }

}