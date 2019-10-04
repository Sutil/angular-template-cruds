import { DataSource } from '@angular/cdk/collections';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs';

export class ServersDataSource extends DataSource<any> {
    constructor(private _servers: any[]) {
        super();
    }

    connect(): Observable<any[]> {
        return of(this._servers);
    }

    disconnect() {}
}