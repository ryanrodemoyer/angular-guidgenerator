import { Injectable } from '@angular/core';
import {HttpClient, HttpResponse} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

@Injectable()
export class UuidService {

  constructor(
    private http: HttpClient
  ) { }

  getUuids(options: UuidOptions): Observable<HttpResponse<UuidResponse>> {
    return this.http.get<UuidResponse>(
      `https://z274p.sse.codesandbox.io/guid?num=${options.amount}&isUppercase=${options.isUppercase}&hasBraces=${options.hasBraces}&hasHyphens=${options.hasHyphens}&b64Encode=${options.b64Encode}&urlEncode=${options.urlEncode}`, {observe: 'response'}
      );
  }
}

export interface UuidResponse {
  uuids: [string]
}

export interface UiidOptions {
  amount: number;
  isUppercase: boolean;
  hasBraces: boolean;
  hasHyphens: boolean;
  b64Encode: boolean;
  urlEncode: boolean;
}