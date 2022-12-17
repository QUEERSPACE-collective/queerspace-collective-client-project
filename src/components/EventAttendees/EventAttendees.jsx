import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";



function EventAttendees(){
    const params = useParams();
    const dispatch = useDispatch();
    const registeredAttendees = useSelector(store => store.eventRegisteredUsers)
    console.log('this events registered attendees are', registeredAttendees)


    useEffect(() => {
        dispatch({
            type: "FETCH_EVENT_REGISTERED_USERS",
            payload: params.id
        })
    }, [params.id])

    return (
        <>
            <h3>List of event registered attendees</h3>
            {registeredAttendees.map(attendee => (
                <>
                <h3>{attendee.name}</h3>
                <h5>{attendee.username}</h5>
                <br/>
                </>            
            ))}
        </>
    )
}


export default EventAttendees;