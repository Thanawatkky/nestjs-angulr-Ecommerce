import { Routes } from '@angular/router';
import { SigninComponent } from './views/signin/signin.component';
import { SignupComponent } from './views/signup/signup.component';
import { AdminComponent } from './layout/Admin/admin.component';
import { DashboardComponent } from './views/admin/dashboard/dashboard.component';
import { UserComponent } from './layout/user/user.component';
import { UserDashboardComponent } from './views/user/dashboard/dashboard.component';
import { ProductComponent } from './views/admin/product/product.component';
import { AddProductComponent } from './views/admin/product/add-product/add-product.component';
import { EditProductComponent } from './views/admin/product/edit-product/edit-product.component';
import { AddCategoryComponent } from './views/admin/category/add-category/add-category.component';
import { CategoryComponent } from './views/admin/category/category.component';
import { EditCategoryComponent } from './views/admin/category/edit-category/edit-category.component';
import { ProductDetailComponent } from './views/user/product-detail/product-detail.component';
import { ProductAllComponent } from './views/user/product-all/product-all.component';
import { ShoppingcartComponent } from './views/user/shoppingcart/shoppingcart.component';
import { ProductCategoryComponent } from './views/user/product-category/product-category.component';
import { HistoryComponent } from './views/user/history/history.component';
import { OrderComponent } from './views/admin/order/order.component';
export const routes: Routes = [
    {
        path: "",
        pathMatch: "full",
        redirectTo: "signIn"
    },
    {
        path: "signIn",
        component: SigninComponent
    },
    {
        path: "signUp",
        component: SignupComponent
    },
    {
        path: "admin",
        component: AdminComponent,
        children: [
            {path: "", component: DashboardComponent},
            {path: "manageProduct", component: ProductComponent},
            {path: "category", component: CategoryComponent},
            {path: "addProduct", component: AddProductComponent},
            {path: "addCategory", component: AddCategoryComponent},
            {path: "editProduct/:id", component: EditProductComponent},
            {path: "editCategory/:id", component: EditCategoryComponent},
            {path: "order", component: OrderComponent}

        ]

    },
    {
        path: "user",
        component: UserComponent,
        children: [
            {path: "", component: UserDashboardComponent},
            {path: "product_details/:id", component: ProductDetailComponent},
            {path: "All", component: ProductAllComponent},
            {path: "All/:page", component: ProductAllComponent},
            {path: "shopping_cart", component: ShoppingcartComponent},
            {path: "category/:id", component: ProductCategoryComponent},
            {path: "category", component: ProductCategoryComponent},
            {path: "history",component: HistoryComponent},
            {path: "history/:status",component: HistoryComponent}
        ]
    }
  
];
