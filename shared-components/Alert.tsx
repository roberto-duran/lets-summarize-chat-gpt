import {InfoIcon} from "@/shared-components/Icons";

type Props = {
    message: string;
}
export default function Alert({ message }: Props) {
    return (
        <div
            className="absolute flex p-4 m-4 text-sm text-red-800 border border-red-300 rounded-lg bg-red-50"
            role="alert">
            <InfoIcon />
            <span className="sr-only">Info</span>
            <div>
                { message }
            </div>
        </div>
    );
};
