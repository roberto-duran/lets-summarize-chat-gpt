export default function Home() {
    return (
        <main className="flex flex-col justify-center items-center mx-auto max-w-6xl align-middle h-screen mt-[-10%]">
            <img src="wikipedia_svg_logo.svg"
                 className="w-1/4"
                 alt="wikipedia logo"/>
            <div className="text-4xl font-semibold space-y-2">
                <p>Summarize any {" "}
                    <span className="text-6xl font-semibold">Wiki</span>
                    {" "} article with AI</p>
            </div>
            <p className="p-8 text-xl">Copy and paste any {" "}
                <span className="font-semibold">Wikipedia</span>
                {" "}article link below.</p>
            <div className="w-full px-10">
                <input type="text" className="p-5 border border-gray-400 border-2 rounded w-full" />
            </div>
            <button className="p-5 font-semibold bg-[#f8f9fa]
                               border border-gray-400 border-2 rounded w-1/3
                               mt-5 transition-all duration-300 hover:bg-gray-300 hover:border-gray-700">
                {"Let's"} summarize
            </button>
        </main>
    )
}
