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

export const apiAuthPrefix = "/api/auth";

export const DEFAULT_LOGIN_REDIRECT = "/Home";