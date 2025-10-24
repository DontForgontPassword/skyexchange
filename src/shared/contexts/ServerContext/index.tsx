import { Trading } from "@/shared/constants";
import { createContext, useContext, useState, type FC, type ReactNode } from "react";

export interface ITradingPair {
     type: string;
     name: coin;
     price: number;
     change: number;
}

interface IUserData {
     currency: number;
     setCurrency: React.Dispatch<React.SetStateAction<number>>;
     nfts: Array<any>;
}

interface IServerContext {
     server: {
          serverData: ITradingPair[];
          setServerData: React.Dispatch<React.SetStateAction<ITradingPair[]>>;
          currentCoin: ITradingPair;
          setCurrentCoin: React.Dispatch<React.SetStateAction<ITradingPair>>
     },
     user: IUserData;
}

interface ServerContextProviderProps {
     children: ReactNode
}

const ServerContext = createContext<IServerContext | null>(null);

export const useServerContext = () => {
     const context = useContext(ServerContext);
     if (!context) {
          throw new Error("Can't use server context");
     }

     return context;
}

const ServerContextProvider: FC<ServerContextProviderProps> = ({
     children
}) => {
     const [serverData, setServerData] = useState<ITradingPair[]>(Trading);
     const [currentCoin, setCurrentCoin] = useState(serverData[0]);

     const [currency, setCurrency] = useState(0);

     return (
          <ServerContext.Provider
               value={{
                    server: {
                         serverData, setServerData, currentCoin, setCurrentCoin
                    },
                    user: {
                         currency,
                         setCurrency,
                         nfts: []
                    }
               }}>
               {
                    children
               }
          </ServerContext.Provider>
     );
}

export default ServerContextProvider;