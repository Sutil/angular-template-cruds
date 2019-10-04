import { environment as prod } from './environment.prod'

export const environment = { ...prod, baseUrl: 'http://localhost:8080/' }

