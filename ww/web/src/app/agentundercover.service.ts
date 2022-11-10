import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";


@Injectable()
export class AgentUndercoverService {

    private url = '/api/agentundercover';

    constructor(
        private http: HttpClient
    ) { }

    public getDaten(): Observable<any> {

        return this.http.get<any>(`${this.url}/daten`);
    }

    public setSpieler(spieler: any) {

        return this.http.post(`${this.url}/spieler`, spieler);
    }

    public registriere(name: string) {

        return this.http.post(`${this.url}/registriere`, name);
    }

    public bestaetigeOrt(name: string) {

        return this.http.post(`${this.url}/bestaetigeOrt`, name);
    }

    public neustart() {

        return this.http.get(`${this.url}/neustart`);
    }
}