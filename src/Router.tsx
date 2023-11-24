import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import Coins from "./routes/Coins";
import Coin from "./routes/Coin";
import Chart from "./routes/Chart";
import Price from "./routes/Price";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { isDarkAtom } from "./atoms";
import { styled } from "styled-components";

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const Menu = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-around;
  margin: 20px 0px 0px 0px;
  button {
    border: 0px;
    background-color: transparent;
    font-size: 28px;
    cursor: pointer;
  }
`;

const HomeBtn = styled.button`
  margin: 4px 0;
  font-size: 15px;
  padding: 4px 0px;
`;

const ToggleBtn = styled.button``;
interface IRouterProps {}

function Router({}: IRouterProps) {
  const setDarkAtom = useSetRecoilState(isDarkAtom);
  const toggleDarkAtom = () => setDarkAtom((prev) => !prev);
  const isDark = useRecoilValue(isDarkAtom);

  return (
    <Wrapper>
      <BrowserRouter basename="/crypto-tracker">
        <Menu>
          <HomeBtn>
            <Link to="/">🏠</Link>
          </HomeBtn>
          <ToggleBtn onClick={toggleDarkAtom}>{isDark ? "🌚" : "🌝"}</ToggleBtn>
        </Menu>
        <Routes>
          <Route path="/" element={<Coins />} />
          <Route path="/:coinId" element={<Coin />}>
            <Route path="chart" element={<Chart />} />
            <Route path="price" element={<Price />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </Wrapper>
  );
}
export default Router;
