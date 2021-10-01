import Link from 'next/link';
import Router from 'next/router';

export default function Button() {
  const num: number = 5;
  return <button onClick={() => Router.replace('/about')}>{num}</button>;
}
