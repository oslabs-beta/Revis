import React, { useState } from 'react';
import Link from 'next/link';

function ServerAdd(props) {
  return (
    <div className="serverAddWrapper">
      <h1> Add Server </h1>
      <form>
        <div>
          <label>Name:</label>
          <input type="text"></input>
        </div>
        <div>
          <label>IP:</label>
          <input type="text"></input>
        </div>
        <div>
          <label>Port:</label>
          <input type="text"></input>
        </div>
        <input type="submit" value="Add Server" />
      </form>
    </div>
  );
}

export default ServerAdd;
