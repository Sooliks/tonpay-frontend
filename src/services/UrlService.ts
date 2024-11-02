export class UrlService {
    static parseUrl(url: string): string | null {
        try {
            const parsedUrl = new URL(url);

            // Проверка, что в URL присутствует параметр `startapp` и начинается с `url`
            const startapp = parsedUrl.searchParams.get("startapp");
            if (startapp && startapp.startsWith("url")) {
                // Убираем "url" и разбиваем на название страницы и ID
                const pageAndId = startapp.slice(3); // удаляем "url"

                // Извлекаем название страницы (например, 'sale') и ID
                const page = pageAndId.match(/^[a-zA-Z]+/)?.[0]; // находит название страницы
                const id = pageAndId.slice(page?.length); // оставшаяся часть - ID

                // Формируем URL в формате "page/id", если название страницы и ID найдены
                if (page && id) {
                    return `${page}/${id}`;
                }
            }
            return null;
        } catch (error) {
            console.error("Invalid URL format", error);
            return null;
        }
    }
}