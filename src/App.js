import { useState } from "react";
import Header from "./components/Header";
import TradeCard from "./components/TradeCard";
import {BrowserRouter , Route, Routes} from "react-router-dom"
import Account from "./components/Account";

function App() {
    // useEffect(() => {
    //   localStorage.setItem("trades",JSON.stringify(trades));
    //   if (trades) {
    //     setTrades(trades);
    //   }
    // }, []);
    const [add, setAdd] = useState(false);

    return (
        <BrowserRouter>
            <Header setAdd={setAdd} />
            <Routes>
                <Route path="/" element={<TradeCard add={add} />} />
                <Route index path="/account" element={<Account setAdd={setAdd} />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
