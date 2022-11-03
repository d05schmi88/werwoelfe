import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable()
export class AppService {

    private url = '/api';

    constructor(
        private http: HttpClient
    ) { }

    public getDaten(): Observable<any> {

        return this.http.get<any>(`${this.url}/daten`);
    }

    public setSpieler(players: any) {

        return this.http.post(`${this.url}/spieler`, players);
    }

    public setSpielerRolle(name: string, rolle: string) {

        return this.http.post(`${this.url}/spielerrolle`, { name, rolle });
    }

    public fressen(name: string): Observable<boolean> {

        return this.http.post<boolean>(`${this.url}/fressen`, name);
    }

    public heilen() {

        return this.http.get(`${this.url}/heilen`);
    }

    public nichtHeilen() {

        return this.http.get(`${this.url}/nichtHeilen`);
    }

    public toeten(name: string) {

        return this.http.post(`${this.url}/toeten`, name);
    }

    public nichtToeten() {

        return this.http.get(`${this.url}/nichtToeten`);
    }

    public pruefen(name: string) {

        return this.http.get(`${this.url}/pruefen/${name}`, { responseType: 'text' });
    }

    public weiter() {

        return this.http.get(`${this.url}/weiter`);
    }

    public weiterMagenVerdorben() {

        return this.http.get(`${this.url}/weiterMagenVerdorben`);
    }

    public lynchen(name: string) {

        return this.http.post(`${this.url}/lynchen`, name);
    }

    public verlieben(name: string) {

        return this.http.post(`${this.url}/verlieben`, name);
    }

    public neustart() {

        return this.http.get(`${this.url}/neustart`);
    }
}