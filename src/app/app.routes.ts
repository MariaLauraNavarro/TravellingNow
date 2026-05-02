import { Routes } from '@angular/router';

import { Home } from './pages/home/home';
import { About } from './pages/about/about';
import { Destiny } from './pages/destiny/destiny';
import { Contact } from './pages/contact/contact';
import { Notfound } from './pages/notfound/notfound';

export const routes: Routes = [
 {path: '', component:Home},
 {path: 'Conocenos', component:About},
 {path: 'Destinos', component:Destiny},
 {path: 'Contactanos', component:Contact},
 {path: '**', component:Notfound}

 

];
