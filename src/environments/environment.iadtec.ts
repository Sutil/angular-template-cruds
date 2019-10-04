import { environment as prod } from './environment.prod';

export const environment = {
    ...prod,
    baseUrl: 'http://iadtec01.brazilsouth.cloudapp.azure.com:8080/easypromoterback/',
}
