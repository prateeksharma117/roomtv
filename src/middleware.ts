import { clerkMiddleware,createRouteMatcher} from "@clerk/nextjs/server";

const protectedRoutes = createRouteMatcher([
  "/",
  "/upcoming",
  "/previous",
  "/recordings",
  "/personal_room",
  "/meeting(.*)",
]);

export default clerkMiddleware((auth,req)=>{
  if(protectedRoutes(req)) auth().protect()
});

export const config = {
  matcher: ["/((?!.+.[w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
