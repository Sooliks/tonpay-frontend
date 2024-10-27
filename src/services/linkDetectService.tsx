import React from 'react';
import Link from 'next/link';


function parseTextWithLinks(text: string) {
    // Регулярное выражение для поиска ссылок
    const urlRegex = /(https?:\/\/[^\s]+)/g;

    // Разбиваем текст на части, где ссылки отдельно
    const parts = text.split(urlRegex);

    return parts.map((part, index) => {
        // Проверяем, соответствует ли часть регулярному выражению ссылки
        if (urlRegex.test(part)) {
            return (
                <Link
                    target="_blank"
                    className={'text-blue-800 underline'}
                    key={index}
                    href={part}
                    passHref
                    rel="noopener noreferrer"
                >
                    {part}
                </Link>
            );
        }

        // Если это не ссылка, просто отображаем текст
        return <span key={index}>{part}</span>;
    });
}
export default parseTextWithLinks;