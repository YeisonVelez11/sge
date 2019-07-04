import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Componentes
import { NotFoundComponent,DashboardComponent,FinancieraComponent} from '../pages/index.paginas';


const appRoutes: Routes = [
	{path: '', component: DashboardComponent},
	{path: 'proceso/:categoria', component: FinancieraComponent},
	//{path: 'producto/:id', component: ProductoDetailComponent},
	{path: '**', component: NotFoundComponent}
];

export const appRoutingProviders: any[] = [];
export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);
