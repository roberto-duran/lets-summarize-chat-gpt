import { OpenAIStream } from "../../lib/OpenAIStream";
import {ValidationMessages} from "@/lib/baseConst";

export const config = {
    runtime: "edge",
};

if (!process.env.OPENAI_API_KEY) {
    throw new Error("Missing env var from OpenAI");
}

export default async function handler(req: Request) {

    const { searchTerm } = (await req.json()) as {
        searchTerm?: string;
    };
    if (!searchTerm) {
        return new Response("No prompt in the request", { status: 500 });
    }

    const url = `http://en.wikipedia.org/w/api.php?format=json&action=query&prop=extracts&exlimit=max&explaintext&exintro&titles=${searchTerm}`
    try {

        const response = await fetch(url, {
            method: "GET",
        });

        const result = await response.json();
        if(result) new Response("No prompt in the request", { status: 500 });

        const key = Object.keys(result.query.pages)[0];
        const extract = result.query.pages[key].extract;

        if(key === '-1' || !extract) {
            throw new Error(ValidationMessages.errors.NONE_ARTICLE_FOUND);
        }

        const prompt = `I want you to act like a news article summarizer. 
        I will input text from a news article and your job is to convert it into a useful summary of a few sentences. 
        Do not repeat sentences and make sure all sentences are clear and show it as points: "${extract}"`;

        const payload = {
            model: "text-davinci-003",
            prompt,
            temperature: 0.5,
            top_p: 1,
            frequency_penalty: 0,
            presence_penalty: 0,
            max_tokens: 200,
            stream: true,
            n: 1,
        };

        const stream = await OpenAIStream(payload);
        return new Response(stream);
    } catch (e: any) {
        console.log({ e });
        return new Response(e, { status: 500, statusText: e.message });
    }
}
