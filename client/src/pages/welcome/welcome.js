import React from 'react';

const Welcome = (props) =><div className="welcomePageWrapper"> <h1 className="d-block">Welcome {props.location.state.userData.name}</h1>
<button onClick={() => props.history.push('/')}>Back</button></div>

export default Welcome;