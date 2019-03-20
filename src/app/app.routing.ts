import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Componentes
import { NotFoundComponent,DashboardComponent,FinancieraComponent} from '../pages/index.paginas';


const appRoutes: Routes = [
	{path: '', component: DashboardComponent},
	{path: 'dashboard', component: DashboardComponent},
	{path: 'financiera', component: FinancieraComponent},

	//{path: 'producto/:id', component: ProductoDetailComponent},
	{path: '**', component: NotFoundComponent}
];

export const appRoutingProviders: any[] = [];
export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);
