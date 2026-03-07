import { withAuth } from "next-auth/middleware"

export default withAuth(
    function middleware() {
        // You can add custom logic here later if needed
    },
    {
        callbacks: {
            authorized: ({ token }) => !!token,
        },
    }
)

export const config = {
    matcher: ["/dashboard/:path*"],
}