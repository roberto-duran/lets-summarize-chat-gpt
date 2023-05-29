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

    const summarizeOpenAI = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>
                                      | React.KeyboardEvent<HTMLInputElement>) => {
        e.preventDefault();
        if (!isValidUrl(searchTerm)) return;

        setSummary("");
        setLoading(true);

        const response = await fetch("/api/summarator", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ searchTerm: cleanSearchTerm(searchTerm) }),
        });

        if (!response.ok) {
            toast.error(response.statusText);
            setLoading(false);
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
            scrollToBottom();
        }
        setLoading(false);
    };

    const scrollToBottom = () => {
        window.scrollTo({
            top: document.documentElement.clientHeight,
            behavior: 'smooth',
        });
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
                       disabled={isLoading}
                       onChange={(e) => setSearchTerm(e.target.value)}
                       onKeyUp={(e) => {
                            if (e.key === "Enter" && !isLoading) {
                                summarizeOpenAI(e);
                            }
                       }}
                       id="summarizeInput"
                       className="p-5 border border-gray-400 border-2 rounded w-full"/>
                <button onClick={summarizeOpenAI}
                        disabled={isLoading}
                        className="p-5 font-semibold bg-[#f8f9fa]
                                   border border-gray-400 border-2 rounded w-full sm:w-1/3
                                   mt-5 transition-all duration-300
                                   duration-[500ms,800ms] hover:bg-gray-300
                                   hover:border-gray-700 disabled:opacity-60">

                    {(isLoading) ? (
                            <div className="flex items-center justify-center m-[10px]">
                                <div className="h-5 w-5 border-t-transparent border-solid animate-spin rounded-full border-black border-4"></div>
                                <div className="ml-2"> Loading... </div>
                            </div>
                    ) : (<span>{"Let's"} summarize</span>)}
                </button>
            </form>
            {summary && <SummaryList summary={summary} />}
            <Toaster />
        </>
    );
};
