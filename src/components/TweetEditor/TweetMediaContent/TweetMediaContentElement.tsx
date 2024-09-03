interface TweetMediaContentElementProps {
    element: string | null,
    isEnabled: boolean
}

export default function TweetMediaContentElement({ element, isEnabled }: TweetMediaContentElementProps) {

    return (
        <div className="flex border-gray-600 border border-dashed rounded-md h-32 w-full">
            <div className="flex-grow h-full flex justify-center items-center">
            {
                element !== null ?
                <img className="w-full h-full object-cover rounded-md" src={element} alt="" />
                :
                <svg viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" fill="none" className={`size-10 ${isEnabled && "cursor-pointer"}`}>
                    <path fill={getIconColor(isEnabled)} fillRule="evenodd" d="M9 17a1 1 0 102 0v-6h6a1 1 0 100-2h-6V3a1 1 0 10-2 0v6H3a1 1 0 000 2h6v6z" />
                </svg>
            }
            </div>
        </div>
    );
}


function getIconColor(isEnabled: boolean) {
    if (isEnabled) {
        return "white"
    }

    return "gray"
}