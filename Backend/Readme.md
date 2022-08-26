we have created a main API gateway at port 9000
for prefix '/admin' the gatewaywill direct to admin work
for prefix '/users' the gatewaywill direct to users work

we have made different services on different servers 
-login, logout,register service : port 8080
-Products CRUD : port 8081
-users CRUD : port 8082
-Cart : port 8083 
- wishlist : port 8084
-Discounts or Coupons : port 8085
with the concurrently package we can start all the package at a time with command
npm run dev-both

Under api-gateway folder we have made gateway for admin, user, app

the working of all the functionalities is explained in the attatched 
