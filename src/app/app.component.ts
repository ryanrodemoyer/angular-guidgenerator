import { Component, OnInit } from "@angular/core";
import { UuidService, UuidResponse, UuidOptions } from "./services/uuid.service";
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: "my-app",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent implements OnInit {
  name = "Angular";

  opts: UuidOptions = {
    amount: 1,
    isUppercase: false,
    hasBraces: false,
    hasHyphens: false,
    b64Encode: false,
    urlEncode: false
  }

  uuidResults: string;
  uuidResponse: UuidResponse;

  params: any;

  constructor(
    private uuidService: UuidService
    , private route: ActivatedRoute
    ) {}

    ngOnInit() {
      this.route.queryParams.subscribe(params => {
        this.params = params;
        const names = ['amount', 'isUppercase', 'hasBraces', 'b64Encode', 'urlEncode'];

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
    this.uuidService.getUuids(this.opts).subscribe(resp => {
      this.uuidResponse = {...resp.body}

      let result = '';
      for (let uuid of this.uuidResponse.uuids) {
        console.log(uuid);
        result += `${uuid}\n`
      }

      this.uuidResults = result;
    });
  }
}
