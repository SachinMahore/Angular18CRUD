import { Routes } from '@angular/router';
import { ClubComponent } from './club/club.component';
import { DetailsComponent } from './club/details/details.component';
export const routes: Routes = [
    { path: 'club', component: ClubComponent },
    { path: 'club/:clubId/details', component: DetailsComponent },
];
