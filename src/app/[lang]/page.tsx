import Link from "next/link";
import {
    Drawer, DrawerClose,
    DrawerContent,
    DrawerDescription, DrawerFooter,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger
} from "@/components/ui/drawer";
import {Button} from "@/components/ui/button";
import {getDictionary} from "@/dictionaries";
import {Locale} from "@/i18n-config";

export default async function Home({ params: { lang } }: { params: { lang: Locale } }) {
    const t = await getDictionary(lang);
    return (
        <section className="text-black dark:text-white py-20 px-8 text-center">
            <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl mb-6">{t.home.title} <br className="hidden sm:inline-block"/>{t.home.cryptocurrency}</h1>
            <p className="text-lg mb-8 text-muted-foreground">
                {t.home.description}
            </p>
            <div className="space-x-4">
                <Link href={'/lastsales'}>
                    <Button>
                        {t.home.startButton}
                    </Button>
                </Link>
                <Drawer>
                    <DrawerTrigger asChild>
                        <Button variant={'secondary'}>
                            {t.home.rulesButton}
                        </Button>
                    </DrawerTrigger>
                    <DrawerContent>
                        <div className="mx-auto w-full max-w-sm">
                            <DrawerHeader>
                                <DrawerTitle>{t.home.rulesButton}</DrawerTitle>
                                <DrawerDescription>{t.home.rules.description}</DrawerDescription>
                            </DrawerHeader>
                            <div className="p-4 pb-0 h-96 overflow-y-auto">
                                <div className="text-muted-foreground text-sm space-y-4">
                                    <div>
                                        <h3 className="font-semibold">1. {t.home.rules.points[0].title}</h3>
                                        <p>{t.home.rules.points[0].description}</p>
                                    </div>

                                    <div>
                                        <h3 className="font-semibold">2. {t.home.rules.points[1].title}</h3>
                                        <p>{t.home.rules.points[1].description}</p>
                                    </div>

                                    <div>
                                        <h3 className="font-semibold">3. {t.home.rules.points[2].title}</h3>
                                        <p>{t.home.rules.points[2].description}</p>
                                        <ul className="list-disc list-inside">
                                            {t.home.rules.points[2].list?.map((item, index) => (
                                                <li key={index}>{item}</li>
                                            ))}
                                        </ul>
                                        <p>{t.home.rules.points[2].subDesc}</p>
                                    </div>

                                    <div>
                                        <h3 className="font-semibold">4. {t.home.rules.points[3].title}</h3>
                                        <p>{t.home.rules.points[3].description}</p>
                                    </div>

                                    <div>
                                        <h3 className="font-semibold">5. {t.home.rules.points[4].title}</h3>
                                        <p>{t.home.rules.points[4].description}</p>
                                    </div>

                                    <div>
                                        <h3 className="font-semibold">6. {t.home.rules.points[5].title}</h3>
                                        <p>{t.home.rules.points[5].description}</p>
                                    </div>

                                    <div>
                                        <h3 className="font-semibold">7. {t.home.rules.points[6].title}</h3>
                                        <p>{t.home.rules.points[6].description}</p>
                                    </div>

                                    <div>
                                        <h3 className="font-semibold">8. {t.home.rules.points[7].title}</h3>
                                        <p>{t.home.rules.points[7].description}</p>
                                    </div>

                                    <div className="mt-4 text-gray-400">
                                        <p><strong>{t.home.rules.miniDesc.strong}</strong> {t.home.rules.miniDesc.text}</p>
                                    </div>
                                </div>
                            </div>
                            <DrawerFooter>
                                <DrawerClose asChild>
                                    <Button variant="outline">{t.frequent.close}</Button>
                                </DrawerClose>
                            </DrawerFooter>
                        </div>
                    </DrawerContent>
                </Drawer>
            </div>
        </section>

    );
}
