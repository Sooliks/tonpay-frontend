import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

import { i18n } from "./i18n-config";
import Negotiator from "negotiator";
import { match as matchLocale } from "@formatjs/intl-localematcher";

function getLocale(request: NextRequest): string | undefined {
    const negotiatorHeaders: Record<string, string> = {};
    request.headers.forEach((value, key) => (negotiatorHeaders[key] = value));
    const locales = [...i18n.locales];
    const languages = new Negotiator({ headers: negotiatorHeaders }).languages(
        locales
    );
    const locale = matchLocale(languages, locales, i18n.defaultLocale);
    return locale;
}

export function middleware(request: NextRequest) {
    const pathname = request.nextUrl.pathname;
    if (pathname.endsWith(".html") || pathname.endsWith(".ico") || pathname.endsWith(".xml")) {
        return NextResponse.next();
    }
    const pathnameIsMissingLocale = i18n.locales.every(
        (locale) =>
            !pathname.startsWith(`/${locale}/`) && pathname !== `/${locale}`,
    );
    if (pathnameIsMissingLocale) {
        const locale = getLocale(request);
        const url = new URL(request.url);
        const searchParams = url.search;
        const redirectUrl = new URL(
            `/${locale}${pathname.startsWith("/") ? "" : "/"}${pathname}${searchParams}`,
            request.url,
        );
        return NextResponse.redirect(redirectUrl);
    }
    return NextResponse.next();
}
export const config = {
    matcher: [
        "/((?!api|_next/static|_next/image|favicon.ico).*)"
    ]
};