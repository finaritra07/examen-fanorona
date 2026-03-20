import { Routes } from '@angular/router';
import { Fanorona } from './test/fanorona/fanorona';

export const routes: Routes = [
    {
        pathMatch:'full',
        redirectTo:'fanorona',
    },
    {
        path:'fanorona',
        component:Fanorona
    }
];
