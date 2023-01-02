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
                <h3>{attendee.username}</h3>
                <h3>Answers:</h3>
                <ul>
                    {attendee.question_answer.map(answer => (
                        <li>{answer[0]} {answer[1]}</li>
                    ))}
                </ul>

                <br/>
                </>            
            ))}
        </>
    )
}


export default EventAttendees;