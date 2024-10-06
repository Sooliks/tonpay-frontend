import Link from "next/link";

export default function Home() {
    return (
        <section className="text-black dark:text-white py-20 px-8 text-center">
            <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl mb-6">Buy and Sell with TON <br className="hidden sm:inline-block"/>Cryptocurrency</h1>
            <p className="text-lg mb-8 text-muted-foreground">
                The safest and fastest way to trade online using TON crypto payments.
            </p>
            <div className="space-x-4">
                <Link href={'/profile/sales'}>
                    <button className="bg-black dark:bg-white text-white dark:text-black py-2 px-6 rounded-full hover:bg-gray-800 dark:hover:bg-gray-300 transition">
                        Start Trading
                    </button>
                </Link>
                <button className="bg-gray-200 dark:bg-gray-800 text-black dark:text-white py-2 px-6 rounded-full hover:bg-gray-300 dark:hover:bg-gray-700 transition">
                    Learn More
                </button>
            </div>
        </section>

    );
}
