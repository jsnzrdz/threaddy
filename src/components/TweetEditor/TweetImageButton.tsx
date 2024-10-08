import { useRef } from "react";

interface TweetImageButtonProps {
    onFileUpdated: (objectUrl: string) => void
}

export function TweetImageButton({onFileUpdated} : TweetImageButtonProps) {

    const fileInputRef = useRef<HTMLInputElement>(null);

    function openFileLoader() {
        fileInputRef.current?.click();
    }

    function handleFileChange(event: React.ChangeEvent<HTMLInputElement>) {
        const file = event.target.files?.[0];

        if (file) {
            const previewUrl = URL.createObjectURL(file);
            onFileUpdated(previewUrl);
        }
    }

    return (
        <div onClick={openFileLoader} className="cursor-pointer">
            <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className="size-6">
                <rect x="0" fill="none" width="24" height="24" />
                <g>
                    <path fill="white" d="M23 4v2h-3v3h-2V6h-3V4h3V1h2v3h3zm-8.5 7c.828 0 1.5-.672 1.5-1.5S15.328 8 14.5 8 13 8.672 13 9.5s.672 1.5 1.5 1.5zm3.5 3.234l-.513-.57c-.794-.885-2.18-.885-2.976 0l-.655.73L9 9l-3 3.333V6h7V4H6c-1.105 0-2 .895-2 2v12c0 1.105.895 2 2 2h12c1.105 0 2-.895 2-2v-7h-2v3.234z" />
                </g>
            </svg>

            <input ref={fileInputRef} onChange={handleFileChange} type="file" accept="image/*" hidden />
        </div>
    )
}