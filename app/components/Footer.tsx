import Link from "next/link";
import {SocialIcon} from "react-social-icons";

export default function Footer() {
    return (
        <div className="flex flex-col md:flex-row items-center justify-between fixed bottom-0 py-5 text-xl max-w-6xl w-full">
            <h1 className="font-semibold text-lg">
                Powered by {" "}
                <Link href="https://openai.com/"
                      target={"_blank"}
                      className="font-bold hover:underline hover:opacity-80"
                >
                    OpenAI
                </Link>
                {" "}
                and{" "}
                <Link href="https://vercel.com/"
                      target={"_blank"}
                      className="font-bold hover:underline hover:opacity-80"
                >
                    Vercel Edge Functions.
                </Link>
            </h1>
            {/* icons */}
            <div>
                <SocialIcon url="https://twitter.com/robertoduranb"
                            fgColor="black"
                            bgColor="transparent"
                            target="_blank"
                            className="transition-transform duration-500 hover:scale-110"
                />
                <SocialIcon url="https://github.com/roberto-duran/lets-summarize-chat-gpt"
                            fgColor="black"
                            bgColor="transparent"
                            target="_blank"
                            className="transition-transform duration-500 hover:scale-110"
                />
            </div>
        </div>
    );
};
