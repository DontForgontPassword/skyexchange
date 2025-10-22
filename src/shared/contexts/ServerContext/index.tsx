import { Trading } from "@/shared/constants";
import { createContext, useContext, useState, type FC, type ReactNode } from "react";

type coin = "BTC/USDT" | "ETH/USDT" | "SOL/USDT" | "SMG/USDT";

export interface ITradingPair {
     type: string;
     name: coin;
     price: number;
     change: number;
}

interface IServerContext {
     serverData: ITradingPair[];
     setServerData: React.Dispatch<React.SetStateAction<ITradingPair[]>>;
     currentCoin: ITradingPair;
     setCurrentCoin: React.Dispatch<React.SetStateAction<ITradingPair>>
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

     return (
          <ServerContext.Provider
               value={{
                    serverData, setServerData, currentCoin, setCurrentCoin
               }}>
               {
                    children
               }
          </ServerContext.Provider>
     );
}

export default ServerContextProvider;