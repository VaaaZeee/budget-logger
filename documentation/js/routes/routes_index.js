var ROUTES_INDEX = {"name":"<root>","kind":"module","className":"AppModule","children":[{"name":"routes","filename":"src/app/app-routing.module.ts","module":"AppRoutingModule","children":[{"path":"","redirectTo":"home","pathMatch":"full"},{"path":"home","loadChildren":"./pages/home/home.module#HomePageModule","canLoad":["AuthGuard"],"children":[{"kind":"module","children":[{"name":"routes","filename":"src/app/pages/home/home-routing.module.ts","module":"HomePageRoutingModule","children":[{"path":"","component":"HomePage","children":[{"path":"categories","loadChildren":"./categories/categories.module#CategoriesPageModule","children":[{"kind":"module","children":[{"name":"routes","filename":"src/app/pages/home/categories/categories-routing.module.ts","module":"CategoriesPageRoutingModule","children":[{"path":"","component":"CategoriesPage"}],"kind":"module"}],"module":"CategoriesPageModule"}]},{"path":"transactions","loadChildren":"./transactions/transactions.module#TransactionsPageModule","children":[{"kind":"module","children":[{"name":"routes","filename":"src/app/pages/home/transactions/transactions-routing.module.ts","module":"TransactionPageRoutingModule","children":[{"path":"","component":"TransactionsPage"}],"kind":"module"}],"module":"TransactionsPageModule"}]},{"path":"overview","loadChildren":"./overview/overview.module#OverviewPageModule","children":[{"kind":"module","children":[{"name":"routes","filename":"src/app/pages/home/overview/overview-routing.module.ts","module":"OverviewPageRoutingModule","children":[{"path":"","component":"OverviewPage"}],"kind":"module"}],"module":"OverviewPageModule"}]},{"path":"","redirectTo":"categories","pathMatch":"full"}]},{"path":"","redirectTo":"categories","pathMatch":"full"}],"kind":"module"}],"module":"HomePageModule"}]},{"path":"login","loadChildren":"./pages/auth/login/login.module#LoginPageModule","canActivate":["UnAuthGuard"],"canLoad":["UnAuthGuard"],"children":[{"kind":"module","children":[{"name":"routes","filename":"src/app/pages/auth/login/login-routing.module.ts","module":"LoginPageRoutingModule","children":[{"path":"","component":"LoginPage"}],"kind":"module"}],"module":"LoginPageModule"}]},{"path":"signup","loadChildren":"./pages/auth/signup/signup.module#SignupPageModule","canActivate":["UnAuthGuard"],"canLoad":["UnAuthGuard"],"children":[{"kind":"module","children":[{"name":"routes","filename":"src/app/pages/auth/signup/signup-routing.module.ts","module":"SignupPageRoutingModule","children":[{"path":"","component":"SignupPage"}],"kind":"module"}],"module":"SignupPageModule"}]}],"kind":"module"}]}