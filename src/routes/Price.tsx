import { useParams } from "react-router-dom";
import { styled } from "styled-components";
import { PriceData } from "./Coin";
import { useQuery } from "react-query";
import { fetchCoinTickers } from "../api";

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
    color: ${(props) => props.theme.accentColor};
  }
  display: flex;
  flex: 1;
  justify-content: space-between;
`;

const Row = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 10px;
`;

const PriceTitle = styled.div`
  font-size: 18px;
  font-weight: bold;
`;

const PriceContent = styled.div<{ $percent: boolean | undefined }>`
  font-size: 18px;
  font-weight: bold;
  color: ${(props) =>
    props.$percent === undefined
      ? props.theme.textColor
      : props.$percent
      ? "#f24571"
      : "#0084ce"};
`;

const ItemWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
`;

const Percent = styled.div`
  font-size: 50px;
  height: 100%;
  span {
    vertical-align: middle;
  }
`;

function Price() {
  const { coinId } = useParams();

  const { isLoading: tickersLoading, data: tickersData } = useQuery<PriceData>(
    ["tickers", coinId],
    () => fetchCoinTickers(coinId!)
  );

  const createPriceItem = (title: string, value: string, percent?: boolean) => {
    if (tickersData) {
      return (
        <ItemWrapper key={title}>
          <PriceTitle>{title}</PriceTitle>
          <PriceContent $percent={percent}>{value}</PriceContent>
        </ItemWrapper>
      );
    }
  };

  const usd = tickersData?.quotes.USD as unknown;
  const usd_t = usd as { [key: string]: any };
  return (
    <>
      {!tickersLoading && tickersData && (
        <>
          <PriceList>
            <Row>
              <PriceItem>
                {createPriceItem(
                  "Ath Price",
                  `$${tickersData.quotes?.USD.ath_price.toFixed(0)}`
                )}
              </PriceItem>
              <PriceItem>
                {createPriceItem(
                  "Current Price",
                  `$${tickersData.quotes?.USD.price.toFixed(0)}`
                )}
              </PriceItem>
            </Row>
          </PriceList>

          <PriceList>
            {["15m", "30m", "1h", "6h", "12h", "24h", "7d", "30d", "1y"].map(
              (interval) => {
                const value = usd_t?.[`percent_change_${interval}`];
                const valueComponent = createPriceItem(
                  `Percent Change ${interval}`,
                  `${(value * 100).toFixed(0)}%`,
                  value > 0
                );
                return (
                  <PriceItem key={interval}>
                    {valueComponent}
                    <Percent>
                      <span>{value > 0 ? "📈" : "📉"}</span>
                    </Percent>
                  </PriceItem>
                );
              }
            )}
          </PriceList>
        </>
      )}
    </>
  );
}

export default Price;
