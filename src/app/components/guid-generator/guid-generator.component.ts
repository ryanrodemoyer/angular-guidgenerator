import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";

import { finalize } from "rxjs/operators";

import {
  UuidService,
  UuidResponse,
  UuidOptions
} from "../../services/uuid.service";

@Component({
  selector: "guid-generator",
  templateUrl: "./guid-generator.component.html",
  styleUrls: ["./guid-generator.component.css"]
})
export class GuidGeneratorComponent implements OnInit {
  name = "Angular";

  opts: UuidOptions = {
    amount: 1,
    isUppercase: false,
    hasBraces: false,
    hasHyphens: false,
    b64Encode: false,
    rfc7515: false,
    urlEncode: false
  }

  uuidResults: string;
  uuidResponse: UuidResponse;
  errorMessageResponse: any;
  
  params: any;

  httpInFlight: boolean = false;

  isDebugMode: boolean = false;

  constructor(
    private uuidService: UuidService
    , private route: ActivatedRoute
    ) {}

    ngOnInit() {
      this.route.queryParams.subscribe(params => {
        this.params = params;
        const names = ['amount', 'isUppercase', 'hasBraces', 'b64Encode', 'rfc7515', 'urlEncode'];

        for (let name of names) {
          const value = params[name];

          if (value) {
            this.opts[name] = value;
          }
        }

        // we want `hasHyphens` to default to true
        // in other words, set to false only if explicity set to false in the route
        this.opts['hasHyphens'] = params['hasHyphens'] === "false" ? false : true;
      });
    }

  getUuids() {
    this.httpInFlight = true;

    // https://github.com/angular/angular/issues/7865#issuecomment-409105458
    // using the `finalize` operator from rxjs to control when the http request is complete
    this.uuidService
      .getUuids(this.opts)
      .pipe(finalize(() => (this.httpInFlight = false)))
      .subscribe(
        resp => {
          this.uuidResponse = { ...resp.body };

          let result = "";
          for (let uuid of this.uuidResponse.uuids) {
            result += `${uuid}\n`;
          }

          this.uuidResults = result;
        },
        err => {
          this.errorMessageResponse = `${err.message}\n${err.error.message}`;

          // this.errorMessageResponse = JSON.stringify(error, null, 2);
        }
      );
  }
}
