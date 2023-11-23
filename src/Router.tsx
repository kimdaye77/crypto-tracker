import { BrowserRouter, Route, Routes } from "react-router-dom";
import Coins from "./routes/Coins";
import Coin from "./routes/Coin";
import Chart from "./routes/Chart";
import Price from "./routes/Price";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { isDarkAtom } from "./atoms";
import { styled } from "styled-components";
import { keyframes } from "styled-components";

const slideAnimation = keyframes`
  0% {
    transform: translateX(0);
  }
  50% {
    transform: translateX(-50px);
  }
  100% {
    transform: translateX(0);
  }
`;

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const ToggleWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: end;
`;

const ToggleBtn = styled.button<{ $isDark: boolean }>`
  border: 0px;
  background-color: transparent;
  margin: 20px;
  font-size: 28px;
  cursor: pointer;
  transition: background-color 0.3s ease, color 0.3s ease;
`;
interface IRouterProps {}

function Router({}: IRouterProps) {
  const setDarkAtom = useSetRecoilState(isDarkAtom);
  const toggleDarkAtom = () => setDarkAtom((prev) => !prev);
  const isDark = useRecoilValue(isDarkAtom);

  return (
    <Wrapper>
      <ToggleWrapper onClick={toggleDarkAtom}>
        <ToggleBtn $isDark={isDark}> {isDark ? "🌚" : "🌝"}</ToggleBtn>
      </ToggleWrapper>

      <BrowserRouter basename="/crypto-tracker">
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
