import React, { useState } from 'react';
import Link from 'next/link';

function ForgotPassword(props) {
  const [userEmail, setUserEmail] = useState<any>('');

  const onSubmitHandler = (e) => {
    e.preventDefault();
    //fetch here
    console.log(userEmail);
  };
  return (
    <div>
      <h1>Password Reset Page</h1>
      <form onSubmit={onSubmitHandler}>
        <div>
          <label>email:</label>
          <input
            type='email'
            onChange={(e) => setUserEmail(e.target.value)}
            value={userEmail}
            required
          ></input>
        </div>
        <input type='submit' value='SUBMIT' />
        <Link href='/'>Previous Page</Link>
      </form>
    </div>
  );
}

export default ForgotPassword;
