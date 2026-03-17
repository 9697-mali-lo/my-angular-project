import { HttpInterceptorFn } from "@angular/common/http";

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const token = localStorage.getItem('token');

  // רשימת כתובות שלא צריכות טוקן
  const publicUrls = ['/api/auth/login', '/api/auth/register', '/health'];
  const isPublic = publicUrls.some(url => req.url.includes(url));

  if (token && !isPublic) {
    const authReq = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });
    return next(authReq);
  }

  return next(req);
};