import { Link } from "react-router-dom";
import { styled } from "styled-components";
import { fetchCoins } from "../api";
import { useQuery } from "react-query";
import { Helmet } from "react-helmet";

const Container = styled.div`
  padding: 0px 10px;
  max-width: 480px;
  margin: 0 auto;
`;

const Header = styled.header`
  height: 10vh;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const CoinList = styled.ul`
  display: flex;
  flex-wrap: wrap;
  list-style: none;
  justify-content: space-between;
  padding: 0;
`;

const Array = styled.span`
  display: none;
`;
const Coin = styled.li`
  width: 30%;
  background-color: ${(props) => props.theme.boxColor};
  color: ${(props) => props.theme.textColor};
  margin-bottom: 10px;
  gap: 10px;
  border-radius: 15px;
  font-weight: bold;
  font-size: 20px;
  a {
    display: flex;
    align-items: center;
    flex-direction: column;
    padding: 20px;
    transition: color 0.2s ease-in;
  }
  &:hover {
    a {
      color: ${(props) => props.theme.accentColor};
    }
    ${Array} {
      display: block;
    }
    background-color: ${(props) => props.theme.textColor};
  }
`;
const Title = styled.h1`
  font-size: 48px;
  font-weight: bold;
  color: ${(props) => props.theme.accentColor};
`;

const Loader = styled.span`
  text-align: center;
  display: block;
`;

const Img = styled.img`
  width: 35px;
  height: 35px;
  margin: 10px;
`;

const CoinTitle = styled.div`
  text-align: center;
`;

interface ICoinsProps {}

interface ICoin {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  is_new: boolean;
  is_active: boolean;
  type: string;
}
function Coins({}: ICoinsProps) {
  const { isLoading, data } = useQuery<ICoin[]>("allCoins", fetchCoins);

  return (
    <Container>
      <Helmet>
        <title>코인</title>
      </Helmet>
      <Header>
        <Title>COIN</Title>
      </Header>
      {isLoading ? (
        <Loader> "Loading..."</Loader>
      ) : (
        <CoinList>
          {data?.slice(0, 100).map((coin) => (
            <Coin key={coin.id}>
              <Link to={`/${coin.id}`} state={coin.name}>
                <Img
                  src={`https://coinicons-api.vercel.app/api/icon/${coin.symbol.toLowerCase()}`}
                />
                <CoinTitle>
                  {coin.name}
                  <br />
                  <Array> &rarr;</Array>
                </CoinTitle>
              </Link>
            </Coin>
          ))}
        </CoinList>
      )}
    </Container>
  );
}
export default Coins;
