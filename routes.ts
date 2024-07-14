// Public routes no authentication required

export const publicRoutes = [
    "/",
    "/Home",
    "/ProductDetails",
    "/ProductSearch",
    "/ProductCategory",
]

// Auth routes require authentication

export const authRoutes = [
    "/auth/Login",
    "/auth/Register",
    "/auth/ForgotPassword",
];


// Auth Protected routes (only logged in user can access these routes)

export const authenticatedRoutes = [
    "/Cart",
    "/Subscribe",
    "/success",
    "/cancel"
]

// Auth Protected routes for Admin (only logged in Admin user can access these routes)

export const adminRoutes = [
   "/admin/AdminPanel",
   "/admin/AllOrders",
   "admin/AllProducts",
   "admin/AllUsers"
]

export const DEFAULT_LOGIN_REDIRECT = "/Home";