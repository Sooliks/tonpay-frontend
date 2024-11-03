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
import {BarChart} from "lucide-react";

export default function Home() {
    return (
        <section className="text-black dark:text-white py-20 px-8 text-center">
            <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl mb-6">Buy and Sell with TON <br className="hidden sm:inline-block"/>Cryptocurrency</h1>
            <p className="text-lg mb-8 text-muted-foreground">
                The safest and fastest way to trade online using TON crypto payments.
            </p>
            <div className="space-x-4">
                <Link href={'/profile/sales'}>
                    <Button>
                        Start Trading
                    </Button>
                </Link>
                <Drawer>
                    <DrawerTrigger asChild>
                        <Button variant={'secondary'}>
                            Rules
                        </Button>
                    </DrawerTrigger>
                    <DrawerContent>
                        <div className="mx-auto w-full max-w-sm">
                            <DrawerHeader>
                                <DrawerTitle>Rules</DrawerTitle>
                                <DrawerDescription>Description</DrawerDescription>
                            </DrawerHeader>
                            <div className="p-4 pb-0">
                                <div className="flex items-center justify-center space-x-2">

                                </div>
                                <div className="mt-3 h-[120px]">

                                </div>
                            </div>
                            <DrawerFooter>
                                <DrawerClose asChild>
                                    <Button variant="outline">Close</Button>
                                </DrawerClose>
                            </DrawerFooter>
                        </div>
                    </DrawerContent>
                </Drawer>
            </div>
        </section>

    );
}
