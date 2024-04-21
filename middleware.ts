import { authMiddleware } from "@clerk/nextjs";

export default authMiddleware({
  publicRoutes:[
    '/',
    '/api/webhooks/clerk',
    '/events/:id',
    '/api/webhooks/stripe',
    '/api/uploadthing'
  ],
  ignoredRoutes:[
    '/api/webhooks/clerk',
    '/api/webhooks/stripe',
    '/api/uploadthing'
  ]
});

export const config = {
  matcher: ["/((?!.+\\\\.[\\\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};