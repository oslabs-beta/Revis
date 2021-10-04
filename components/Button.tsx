import Link from 'next/link';
import Router from 'next/router';

export default function Button() {
  const num: number = 5;
  /*Router.replace vs Router.push: The router history works like a stack of routes. When you use the router.replace, you're overwritting the top of the the stack. When using the router.push, it adds a new route to the top of the stack. 
  The router history allows you to go back to the last page. For example, when the user navigates to a invalid route, you can use the router.replace to prevent the user to navigate back to the invalid route. */
  return <button onClick={() => Router.push('/about')}>{num}</button>;
}
