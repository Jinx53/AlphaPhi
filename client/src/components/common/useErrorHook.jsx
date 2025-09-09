import { useState, useEffect, useRef , useMemo} from "react";
import { useSelector } from "react-redux";


function usePrevious(value) {
    const ref = useRef();
    useEffect(() => {
        ref.current = value;
    });
    return ref.current;
}

export default function useErrorMessage(id = ""){
    const [errorMessage, changeErrorMessage] = useState(null);
    const error = useSelector(state => state.error);
    const prevError = usePrevious(error);

    useEffect(() => {
        if (error !== prevError){
            if (error.id === id) changeErrorMessage(error.message.message);
            else {
                changeErrorMessage(null);
            }
        }

    }, [prevError, error]);

    return errorMessage;
}



