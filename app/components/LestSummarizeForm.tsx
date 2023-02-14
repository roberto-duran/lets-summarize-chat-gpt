'use client';
import React, {useState} from "react";
import {SpinnerIcon} from "@/shared-components/Icons";
import {ValidationMessages} from "@/lib/baseConst";
import toast, {Toaster} from "react-hot-toast";
import SummaryList from "@/app/components/SummaryList";

export default function LestSummarizeForm() {
    const [isLoading, setLoading] = useState(false);
    const [searchTerm, setSearchTerm] = useState<string>("");
    const [summary, setSummary] = useState<string>("");

    const summarizeOpenAI = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault();
        if (!isValidUrl(searchTerm)) return;
        setSummary("");
        const response = await fetch("/api/summarator", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ searchTerm: cleanSearchTerm(searchTerm) }),
        });

        if (!response.ok) {
            toast.error(response.statusText);
            return;
        }

        const data = response.body;
        if (!data) {
            return;
        }

        const reader = data.getReader();
        const decoder = new TextDecoder();
        let done = false;

        while (!done) {
            const { value, done: doneReading } = await reader.read();
            done = doneReading;
            const chunkValue = decoder.decode(value);
            setSummary((prev) => prev + chunkValue);
        }
        setLoading(false);
    };

    const cleanSearchTerm = (term: string) => {
        return term.replace(/ /g, "_");
    }

    const isValidUrl = (searchTerm: string) => {
        let isValid = true;
        if (searchTerm.length === 0) {
            alertUser(ValidationMessages.errors.EMPTY_SEARCH_TERM);
            isValid = false;
        }

        return isValid;
    }

    const alertUser = (message: string) => {
        toast.error(message);
    }

    return (
        <>
            <form className="flex flex-col items-center w-full px-10">
                <input type="text"
                       onChange={(e) => setSearchTerm(e.target.value)}
                       id="summarizeInput"
                       className="p-5 border border-gray-400 border-2 rounded w-full"/>
                <button onClick={summarizeOpenAI}
                        className="p-5 font-semibold bg-[#f8f9fa]
                                       border border-gray-400 border-2 rounded w-1/3
                                       mt-5 transition-all duration-300 hover:bg-gray-300 hover:border-gray-700">

                    {(isLoading) ? (<div className="text-center">
                        <div role="status w-8 h-8 mr-2">
                            <SpinnerIcon/>
                        </div>
                    </div>) : (<span>{"Let's"} summarize</span>)}
                </button>
            </form>
            {summary && <SummaryList summary={summary} />}
            <Toaster />
        </>
    );
};
