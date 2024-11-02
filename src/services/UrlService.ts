export class UrlService {
    static parseUrl(url: string): string | null {
        try {
            if (url.startsWith("url")) {
                // Убираем "url" и разбиваем на название страницы и ID
                const pageAndId = url.slice(3); // удаляем "url"

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