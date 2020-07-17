import React from 'react';

const Welcome = (props) =><> <h1>Welcome {props.location.state.userData.name}</h1>
<button onClick={() => props.history.push('/')}>Back</button></>

export default Welcome;