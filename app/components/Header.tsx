export default function Header() {
    return (
        <div className="flex justify-between ">
            <h1 className="flex items-center text-2xl space-x-1">
                <span>The</span> {" "}
                <span className="text-3xl font-semibold">WIKIPEDIA</span>{" "}
                <span>summarizer</span></h1>
            <img src="other_logo.svg"
                 className="w-12"
                 alt="wikipedia logo"/>
        </div>
    );
};
