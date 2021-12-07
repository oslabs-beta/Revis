import { useContext } from 'react';
import { GlobalContext } from '../Provider';

export default function useStore() {
  return useContext(GlobalContext);
}
