import { useOutletContext } from "react-router-dom";
import { styled } from "styled-components";
import { PriceData } from "./Coin";

const PriceList = styled.ul``;

const PriceItem = styled.li`
  height: 100px;
  vertical-align: middle;
  padding: 10px 20px;
  background-color: ${(props) => props.theme.boxColor};
  color: ${(props) => props.theme.textColor};
  margin-bottom: 10px;
  border-radius: 15px;
  cursor: pointer;
  &:hover {
    color: ${(props) => props.theme.bgColor};
  }
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const PriceTitle = styled.div`
  font-size: 18px;
  font-weight: bold;
`;

const PriceContent = styled.div`
  font-size: 14px;
`;
function Price() {
  const tickersData = useOutletContext<PriceData>();
  const createPriceItem = (title: string, value: number | undefined) => (
    <PriceItem key={title}>
      <PriceTitle>{title}</PriceTitle>
      <PriceContent>{value?.toFixed(3)}</PriceContent>
    </PriceItem>
  );
  const usd = tickersData.quotes?.USD as unknown;
  const usd_t = usd as { [key: string]: number };
  return (
    <>
      {tickersData && (
        <>
          <PriceList>
            {[
              createPriceItem("Ath Price", tickersData.quotes?.USD.ath_price),
              createPriceItem("Current Price", tickersData.quotes?.USD.price),
            ]}
          </PriceList>

          <PriceList>
            {["15m", "30m", "1h", "6h", "12h", "24h", "7d", "30d", "1y"].map(
              (interval) =>
                createPriceItem(
                  `Percent Change ${interval}`,
                  usd_t[`percent_change_${interval}`]
                )
            )}
          </PriceList>
        </>
      )}
    </>
  );
}

export default Price;
