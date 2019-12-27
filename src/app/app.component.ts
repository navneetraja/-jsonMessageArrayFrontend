import { Component } from "@angular/core";
import { HttpClientModule, HttpClient } from "@angular/common/http";
import { throwError } from "rxjs";
import { catchError } from "rxjs/operators";
import { Message } from "./messageModel";
import { Observable } from "rxjs";
import { interval } from "rxjs";
import { environment } from "src/environments/environment.prod";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent {
  title = "testApplication";
  jsonmessage: Array<any> = [];
  jsonmessageArray: Array<any> = [];
  timer;
  intervalInMilliSeconds: number = 10000;
  secCount: number;
  convert: number;

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.getMessage();
    this.setTime();
  }

  refresh() {
    console.log("this.sec", this.secCount);
    // this.sec = time;
    this.convert = 1000;
    console.log("sum :", this.secCount * this.convert);
    this.intervalInMilliSeconds = this.secCount * this.convert;
    console.log("sec ref", this.intervalInMilliSeconds);
    if (this.timer) {
      clearInterval(this.timer);
    }
    this.setTime();
  }
  setTime() {
    this.timer = setInterval(() => {
      console.log("timeout");
      this.getMessage();
    }, this.intervalInMilliSeconds);
    //setInterval
  }

  getMessage() {
    var path = "userinfo/amithget";
    this.http.get(`${environment.api_url}${path}`).subscribe(res => {
      console.log(res);
      for (let m of Object.values(res)) {
        for (let m1 of Object.values(JSON.parse(m.toString()))) {
          console.log("M1", m1);
          this.jsonmessage.push(m1);
        }
        this.jsonmessageArray.push(this.jsonmessage);
        this.jsonmessage = [];
      }
      console.log("message", this.jsonmessageArray);
    });
  }
}
