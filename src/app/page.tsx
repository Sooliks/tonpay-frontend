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
                <Link href={'/lastsales'}>
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
                                <DrawerDescription>Terms of use of the PayOnTon trading platform</DrawerDescription>
                            </DrawerHeader>
                            <div className="p-4 pb-0 h-96 overflow-y-auto">
                                <div className="text-muted-foreground text-sm space-y-4">
                                    <div>
                                        <h3 className="font-semibold">1. Honesty and respect for other users</h3>
                                        <p>Be polite and respectful when communicating with other users. Offensive
                                            language, threats, aggressive or disrespectful behavior is prohibited.</p>
                                    </div>

                                    <div>
                                        <h3 className="font-semibold">2. Prohibition of fraudulent manipulations</h3>
                                        <p>Any form of fraud (including deception, withholding information, misleading
                                            other users) is strictly prohibited. Creating multiple accounts to gain
                                            benefits, artificially boosting ratings, or reviews is forbidden.</p>
                                    </div>

                                    <div>
                                        <h3 className="font-semibold">3. Prohibition of review manipulation</h3>
                                        <p>The platform strictly monitors the authenticity of reviews and ratings.
                                            Prohibited:</p>
                                        <ul className="list-disc list-inside">
                                            <li>Collusion for artificially increasing or decreasing ratings.</li>
                                            <li>Use of fake accounts or external services for review manipulation.</li>
                                        </ul>
                                        <p>Any attempt to manipulate reviews will lead to account blocking.</p>
                                    </div>

                                    <div>
                                        <h3 className="font-semibold">4. Authenticity of goods and services</h3>
                                        <p>Sellers must provide complete and accurate information about the goods and
                                            services they offer. It is prohibited to list non-existent, stolen, or
                                            inactive items. If you are selling in-game items, they must be obtained
                                            fairly and not violate game rules.</p>
                                    </div>

                                    <div>
                                        <h3 className="font-semibold">5. Secure transactions</h3>
                                        <p>All transactions should be conducted within the platform. This protects you
                                            from fraud. Avoid external platforms or payment methods not supported by our
                                            service.</p>
                                    </div>

                                    <div>
                                        <h3 className="font-semibold">6. No spam and advertising</h3>
                                        <p>Advertising of goods and services outside this platform, spam, or mass
                                            messaging to attract buyers is prohibited.</p>
                                    </div>

                                    <div>
                                        <h3 className="font-semibold">7. Responsibility for your actions</h3>
                                        <p>Each user is responsible for their actions on the platform. In case of rule
                                            violations, the administration reserves the right to impose temporary or
                                            permanent account blocking.</p>
                                    </div>

                                    <div>
                                        <h3 className="font-semibold">8. Feedback</h3>
                                        <p>If you encounter rule violations or suspected fraud, please report it to the
                                            administration. We will carefully review each case and take necessary
                                            actions.</p>
                                    </div>

                                    <div className="mt-4 text-gray-400">
                                        <p><strong>Consequences of rule violations:</strong> We strive to maintain a
                                            high level of safety and honesty. Any violation, especially related to
                                            fraud, review manipulation, or other dishonest activities, may result in a
                                            permanent ban from the platform without the possibility of reinstatement.
                                        </p>
                                    </div>
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
