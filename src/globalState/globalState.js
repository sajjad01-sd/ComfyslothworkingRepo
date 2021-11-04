import React from 'react';
import { createGlobalState } from 'react-hooks-global-state';

const initialState = { globalError: 'I am error' };
const { useGlobalState } = createGlobalState(initialState);

export default useGlobalState