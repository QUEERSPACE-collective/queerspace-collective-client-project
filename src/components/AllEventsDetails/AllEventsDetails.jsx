import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import EditIcon from '@mui/icons-material/Edit';
import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
} from '@mui/material';
// I'm not going to delete this, but I don't think we're using this component

function AllEventsDetails() {
  const dispatch = useDispatch();
  const params = useParams();
  const currentEvent = useSelector(store => store.currentEvent)
  console.log('current event', currentEvent)
  let count = 0;
  useEffect(() => {
    animater(), // call fade effect
      dispatch({
        type: 'FETCH_EVENT_DETAILS',
        payload: params.id
      }),
      dispatch({ type: "FETCH_ALL_USERS" }),
      dispatch({ type: 'FETCH_USER_EVENTS' }),
      dispatch({
        type: "FETCH_SPECIFIC_EVENT",
        payload: params.id
      });
  }, [params.id])
  //Fade effect
  function animater() {
    document.body.classList.remove("noSalmon");
    document.body.classList.add("salmon");
    setTimeout(() => document.body.classList.remove("salmon"), 100);
    setTimeout(() => document.body.classList.add("noSalmon"), 100);
  }

  return (
    <>
      <h1>{currentEvent.name}</h1>

      <TableContainer>
        <Table stickyHeader>
          <TableBody>
            <TableRow key={currentEvent.id}>
              <TableCell>{currentEvent.id}</TableCell>
              <TableCell>{currentEvent.name}</TableCell>
              <TableCell align="right"> {currentEvent.description}</TableCell>
              <TableCell align="right"> {currentEvent.location}</TableCell>
              <TableCell align="right"> {currentEvent.type} </TableCell>
              <TableCell align="right">{currentEvent.programLocation} </TableCell>
              <TableCell align="right">
                <Link 
                  to={`/allevents/${currentEvent.id}/edit`} 
                  style={{ textDecoration: 'none' }}
                >
                  <Button
                    sx={{
                      bgcolor: '#357590', 
                      fontWeight: 'bold', 
                      wordSpacing: 1, 
                      m: 2, 
                      color: 'white',
                      '&:hover': {
                        backgroundColor: '#357590',
                        boxShadow: '6px 6px 0px #90c5bf'
                      },
                    }}
                  >
                    <EditIcon/>
                  </Button>
                </Link>
              </TableCell>
              <TableCell align="right">
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
      <h1>total attendee count: {count}</h1>
    </>
  );
}

export default AllEventsDetails;