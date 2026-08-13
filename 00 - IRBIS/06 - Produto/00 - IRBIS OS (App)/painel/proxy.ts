import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

const OPERATOR_EMAIL = process.env.IRBIS_OPERATOR_EMAIL ?? "nicolas.cunhan@aluno.lsb.com.br";

export async function proxy(request: NextRequest) {
  // portal.irbis.com.br/{slug} é a cara pública do portal — sem "os.", sem login.
  // Reescreve pro /portal/{slug} interno; assets (_next, fonts) passam direto.
  const host = request.headers.get("host") ?? "";
  if (host.startsWith("portal.")) {
    const { pathname } = request.nextUrl;
    const ehAsset =
      pathname.startsWith("/_next") ||
      pathname.startsWith("/fonts") ||
      pathname === "/favicon.ico";
    if (ehAsset) return NextResponse.next({ request });
    if (pathname === "/") {
      return NextResponse.redirect("https://irbis.com.br");
    }
    if (!pathname.startsWith("/portal/")) {
      const url = request.nextUrl.clone();
      url.pathname = `/portal${pathname}`;
      return NextResponse.rewrite(url);
    }
    return NextResponse.next({ request });
  }

  let response = NextResponse.next({ request });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value));
          response = NextResponse.next({ request });
          cookiesToSet.forEach(({ name, value, options }) =>
            response.cookies.set(name, value, options)
          );
        },
      },
    }
  );

  const {
    data: { user },
  } = await supabase.auth.getUser();

  // /portal/{slug} é a única rota pública além do login: é o que o cliente vê
  const isPublicRoute =
    request.nextUrl.pathname.startsWith("/login") ||
    request.nextUrl.pathname.startsWith("/portal");

  if (!user && !isPublicRoute) {
    const url = request.nextUrl.clone();
    url.pathname = "/login";
    return NextResponse.redirect(url);
  }

  // Sistema solo-first: só a conta operacional entra, mesmo que o cadastro de outro
  // e-mail um dia seja criado por engano no Supabase Auth.
  if (user && user.email !== OPERATOR_EMAIL) {
    await supabase.auth.signOut();
    const url = request.nextUrl.clone();
    url.pathname = "/login";
    url.searchParams.set("erro", "conta-nao-autorizada");
    return NextResponse.redirect(url);
  }

  if (user && (request.nextUrl.pathname === "/login" || request.nextUrl.pathname === "/")) {
    const url = request.nextUrl.clone();
    url.pathname = "/visao";
    return NextResponse.redirect(url);
  }

  return response;
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)"],
};
