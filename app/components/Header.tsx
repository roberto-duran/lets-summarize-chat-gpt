export default function Header() {
    return (
        <div className="flex justify-between px-2">
            <h1 className="flex items-center text-xl sm:text-2xl space-x-1 text-center sm:text-left">
                <span>The</span> {" "}
                <span className="text-2xl sm:text-3xl font-semibold">WIKIPEDIA</span>{" "}
                <span>summarizer</span></h1>
            <img src="other_logo.svg"
                 className="w-12"
                 alt="wikipedia logo"/>
        </div>
    );
};
