'use client';

import React from "react";
type Props = {
    summary: string;
}

export default function SummaryList({ summary }: Props) {
    return (
        <div className="mb-10 px-4">
            <h2 className="mx-auto mt-16 max-w-3xl border-t border-gray-400 pt-8 text-center text-3xl font-bold sm:text-5xl">
                Summary
            </h2>
            <div className="mx-auto mt-6 max-w-3xl text-lg leading-7">
                {summary.split(". ").map((sentence, index) => (
                    <div key={index}>
                        {sentence.length > 0 && (
                            <li className="mb-2 list-disc">{sentence}</li>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};
