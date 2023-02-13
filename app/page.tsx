import LestSummarizeForm from "@/app/components/LestSummarizeForm";

export default function Home() {
    return (
        <main className="flex flex-col justify-center items-center mx-auto max-w-6xl align-middle">
            <img src="wikipedia_svg_logo.svg"
                 className="w-1/4"
                 alt="wikipedia logo"/>
            <div className="text-4xl font-semibold space-y-2">
                <p>Summarize any {" "}
                    <span className="text-6xl font-semibold">Wiki</span>
                    {" "} article with AI</p>
            </div>
            <p className="p-8 text-xl">Type any term to be search in {" "}
                <span className="font-semibold">Wikipedia</span>
                {" "}Page below.</p>
            <LestSummarizeForm />
        </main>
    )
}
