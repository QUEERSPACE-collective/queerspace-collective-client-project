import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";



function EventAttendees(){
    const params = useParams();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch({
            type: "FETCH_EVENT_REGISTERED_USERS",
            payload: params.id
        })
    }, [params.id])

    return (
        <>
            <h3>List of event registered attendees</h3>
        </>
    )
}


export default EventAttendees;