import { Routes } from '@angular/router';
import { Principal } from './components/principal/principal';
import { Home } from './pages/home/home';
import { About } from './pages/about/about';
import { Destiny } from './pages/destiny/destiny';
import { Contact } from './pages/contact/contact';
import { Login } from './pages/login/login';
import { Notfound } from './pages/notfound/notfound';

export const routes: Routes = [

 {path: '', component: Principal},
 {path: 'Ingresar', component: Login},
 {path: 'home', component:Home},
 {path: 'Conocenos', component:About},
 {path: 'Destinos', component:Destiny},
 {path: 'Contactanos', component:Contact},
 {path: '**', component:Notfound}
];