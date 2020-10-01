import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BasketComponent } from './components/basket/basket.component';
import { HomeComponent } from './components/home/home.component';
import { BasketModule } from './components/basket/basket.module';
import { HomeModule } from './components/home/home.module';
import { ProductService } from './services/product.service';
import { ShoppingEffectsModule, ShoppingReducersModule } from './state/state.module';

const routes: Routes = [
    { path: '', pathMatch: 'full', redirectTo: 'home'  },
    { path: 'home', component: HomeComponent },
    { path: 'basket',  component: BasketComponent},
    { path: '**', redirectTo: 'home' }
];

@NgModule({
    imports: [
        RouterModule.forRoot(routes),
        BasketModule,
        HomeModule,
        ShoppingEffectsModule,
        ShoppingReducersModule,
    ],
    providers: [
        ProductService
    ],
    exports: [RouterModule]
})
export class AppRoutingModule { }
