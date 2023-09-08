import { createContext } from "react";

export const RandomUsersContext = createContext({
    randomUsersData: {},
    setRandomUsersData : () => {}
});