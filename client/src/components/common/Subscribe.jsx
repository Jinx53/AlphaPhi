import React, { useRef, useState } from 'react'
import { Button, Box, Input } from '@mui/material';
import '../../styles/Shared.css';
import '../../styles/Footer.css';
import {useDispatch} from 'react-redux';
import { addSubscriber } from '../../actions/SubscriberAction';

const Subscribe = () => {

  const email = useRef();
  const dispatch = useDispatch()
  const [subscribed, setSubscribed] = useState(false);
  const [subscribedError, setSubscribedError] = useState(false);
  const emailpattern = "^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$";
  const checkPattern = (pattern, value) => new RegExp(pattern).test(value)

  const submitSubscriber = () => {
    const subscriber = email.current.value
    const isValid = checkPattern(emailpattern, subscriber);
    if (isValid) {
      setSubscribed(isValid);
      setSubscribedError(!isValid);
      dispatch(addSubscriber({subscriber}));
      email.current.value = null;
    } else {
      setSubscribed(isValid);
      setSubscribedError(!isValid);
    }
  }


  return (
    <div>
      <Box className="d-inline">
        {!subscribed && (
          <>
            <label htmlFor="email-2" className="d-none">Email Address</label>
            <input type="email" className="form-input w-input" maxLength="256" name="email" placeholder="Enter your email" id="email-2" required="" ref={email} />
            <input type="submit" value="Subscribe" onClick={() => submitSubscriber()} className="w-button" />
          </>
        ) }
      </Box>
        <div className={subscribed ? "w-form-done-view" : "w-form-done"}>
          <>Thank you! Your submission has been received!</>
        </div>
        <div className={subscribedError ? "w-form-fail-view" : "w-form-fail"}>
          <>Oops! Something went wrong while submitting the form.</>
        </div>
    </div>
  )
}

export default Subscribe