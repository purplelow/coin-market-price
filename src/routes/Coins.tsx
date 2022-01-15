import { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import styled from "styled-components";
import { fetchCoins } from "../api";
import { isDarkAtom } from "../atoms";

const Container = styled.div`
  padding: 0 20px;
  max-width: 480px;
  margin: 0 auto; 
`;

const Header = styled.header`
  display: flex;
  height: 10vh;
  justify-content: center;
  align-items: center;
`;

const CoinList = styled.ul`
  
`;

const Coin = styled.li`
  background-color: ${(props) => props.theme.cardBgColor};
  color: ${(porps) => porps.theme.textColor};
  border-radius: 15px;
  margin-bottom: 10px;
  border: 1px solid #fff;
  transition: all .01s ease-in;
  a {
    display: flex;
    align-items: center;
    padding: 20px;
    transition: color 0.5s ease-in;
  }
  &:hover{
    background-color: #2ecc71;
    a {
      color: ${(props) => props.theme.accentColor};
    }
  }
`;

const Title = styled.h1`
  font-size: 36px;
  color: ${(props) => props.theme.accentColor}; 
`;

const Loader = styled.span`
  display: block;
  text-align: center;
`;

const Img = styled.img`
  width: 35px;
  height: 35px;
  margin-right: 10px;
`;

interface ICoin {
  id: string,
  name: string,
  symbol: string,
  rank: number,
  is_new: boolean,
  is_active: boolean,
  type: string,
}

interface ICoinsProps {

}

function Coins({  }: ICoinsProps) {
  const { isLoading, data } = useQuery<ICoin[]>("allcoins", fetchCoins);
  // const [coins, setCoins] = useState<CoinInterface[]>([]);
  // const [loading, setLoading] = useState(true);
  // useEffect(() => {
  //   (async () => {
  //     const response = await fetch("https://api.coinpaprika.com/v1/coins");
  //     const json = await response.json();
  //     setCoins(json.slice(0, 100));
  //     // setTimeout(() => { setLoading(false) }, 300);
  //     setLoading(false);
  //   })();
  // }, []);

  const setDarkAtom = useSetRecoilState(isDarkAtom);
  const toggleDarkAtom = () => setDarkAtom((prev) => !prev);
  return (
    <Container>
      <Helmet>
        <title>
          All Coins
        </title>
      </Helmet>
      <Header>
        <Title>All Coins</Title>
        <button onClick={toggleDarkAtom} >Toggle Mode</button>
      </Header>
      {isLoading ? (
        <Loader>Loading . . . </Loader>
      ) : (
        <CoinList>
        {data?.slice(0, 100).map((coin) => (
          <Coin key={coin.id}>
            <Link to={{
              pathname: `/${coin.id}`,
              state: {
                name: coin.name
              },
            }}>
              <Img src={`https://cryptoicon-api.vercel.app/api/icon/${coin.symbol.toLowerCase()}`} />
              {coin.name} &rarr;
            </Link>
          </Coin>
        ))}
        </CoinList>
      )}
    </Container>
  )
};

export default Coins;