import { useParams, useHistory, Link } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    Button,
    Select
} from '@mui/material';


function EditEvents(){
    const dispatch = useDispatch();
    const params = useParams();
    console.log(params.id);
    const history = useHistory();

    useEffect(() => {
        dispatch({
            type: "FETCH_EDIT_EVENT",
            payload: params.id
        });
    }, [params.id]);

    const editEvent = useSelector(store => store.editEvent);

    const onSubmit = (evt) => {
        evt.preventDefault();
        dispatch({
            type: "SAVE_EVENT",
            payload: editEvent
        });
        history.push('/AllEventsList')
    }
    return(
        <>
            <div>
                <h2> Edit Event</h2>
            </div>
            <form onSubmit={onSubmit}>
                 {/* edit event name */}
                <label>
                    Event Name:
                </label>
                <input
                    value={editEvent && editEvent.name}
                    onChange={(evt) => dispatch({
                        type: 'UPDATE_EDIT_EVENT',
                        payload: {name: evt.target.value}
                    })}
                />
                {/* end edit event name */}
                {/* edit event date time */}
                <label>
                    Date and Time:
                </label>
                <input
                    value={editEvent && editEvent.dateTime}
                    onChange={(evt) => dispatch({
                        type: 'UPDATE_EDIT_EVENT',
                        payload: {dateTime: evt.target.value}
                    })}
                />
                {/* end edit event date time */}
                {/* edit description */}
                <label>
                    Edit Description:
                </label>
                <input
                    value={editEvent && editEvent.description}
                    onChange={(evt) => dispatch({
                        type: 'UPDATE_EDIT_EVENT',
                        payload: {description: evt.target.value}
                    })}
                />
                {/* end edit description */}
                {/* edit event location */}
                <label>
                    Edit Location:
                </label>
                <input
                    value={editEvent && editEvent.location}
                    onChange={(evt) => dispatch({
                        type: 'UPDATE_EDIT_EVENT',
                        payload: {location: evt.target.value}
                    })}
                />
                {/* end edit event location */}
                {/* edit event type */}
                <label>
                    Edit Type:
                </label>
                <input
                    value={editEvent && editEvent.type}
                    onChange={(evt) => dispatch({
                        type: 'UPDATE_EDIT_EVENT',
                        payload: {type: evt.target.value}
                    })}
                />
                {/* end edit event type */}
                {/* edit event Program location */}
                <label>
                    Edit Program Location:
                </label>
                <input
                    value={editEvent && editEvent.programLocationID}
                    onChange={(evt) => dispatch({
                        type: 'UPDATE_EDIT_EVENT',
                        payload: {programLocationID: evt.target.value}
                    })}
                />
                {/* end edit event program location */}
                <Button 
                    type="submit"
                    variant="contained"
                >Submit</Button>
            </form>
            <Link to="/AllEventsList">
                <Button>Back To Events List</Button>
            </Link>
        </>
    )
}

export default EditEvents;
