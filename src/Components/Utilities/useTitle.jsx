import { useEffect } from "react";

const useTitle = (title) => {
    useEffect(() => {
        document.title = title + " | Toto App";
    }, [title]);
    return title;
};

export default useTitle;
