import { createGlobalState } from 'react-hooks-global-state';

const initialState = { globalError: '' };
const { useGlobalState } = createGlobalState(initialState);

export default useGlobalState