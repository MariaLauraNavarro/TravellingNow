import { adminGuard } from './guards/admin-guard';
import { Routes } from '@angular/router';
import { Principal } from './components/principal/principal';
import { Home } from './pages/home/home';
import { About } from './pages/about/about';
import { Destiny } from './pages/destiny/destiny';
import { Contact } from './pages/contact/contact';
import { Login } from './pages/login/login';
import { Notfound } from './pages/notfound/notfound';
import{ Registro } from './pages/registro/registro';
import { AdminUsuarios } from './pages/admin-usuarios/admin-usuarios';



export const routes: Routes = [

 {path: '', component: Principal},
 {path: 'Ingresar', component: Login},
 {path:'registro', component:Registro},
 {path: 'home', component:Home},
 {path: 'Conocenos', component:About},
 {path: 'Destinos', component:Destiny},
 {path: 'Contactanos', component:Contact},
 {path: 'admin-usuarios',component: AdminUsuarios,
    canActivate: [adminGuard]
},
 {path: '**', component:Notfound},
 
];