import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
    function middleware(){
        return NextResponse.next()
    }, 
    {
        callbacks: {
            authorized({ req, token }){
                const {pathname} = req.nextUrl
                if (
                    pathname.startsWith("/api/auth") ||
                    pathname === "/login" || 
                    pathname === "/register"
                ) 
                return true

                if(pathname === "/" || pathname.startsWith("/api/videos")) {
                    return true
                };

                // if(token) return true;
                return !!token // Converts token (or any data-type value) into boolean.
            },
        },
    },
);

export const config = {
    matcher: [
        /**
         * Match all request except: 
         * - _next/static (static files)
         * - _next/image (image optimization files)
         * - favicon.ico
         * - public folder
         */
        "/((?!_next/static|_next/image|favicon.ico|public/).*)",
    ]
}
