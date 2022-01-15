import ApexCharts from "react-apexcharts";
import { useQuery } from "react-query";
import { useRecoilValue } from "recoil";
import { fetchCoinHistory } from "../api";
import { isDarkAtom } from "../atoms";

interface IHistorical {
  time_open: string;
  time_close: string;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
  market_cap: number;
}

interface ChartProps {
  coinId: string;
}

function Chart({ coinId }: ChartProps) {
  const isDark = useRecoilValue(isDarkAtom);
  const { isLoading, data } = useQuery<IHistorical[]>(["ohlcv", coinId], () =>
    fetchCoinHistory(coinId)
  );
  return (
    <>
      {isLoading ?
        "Loading chart . . . "
        : (
          <ApexCharts
            type="line"
            series={[
              {
                name: "Price",
                data: data?.map((price) => price.close),
              },
            ]}
            options={{
              theme: {
                mode: isDark ? "dark" : "light",
              },
              chart: {
                height: 300,
                width: 500,
                toolbar: {
                  show: false,
                },
                background: "tranparent"
              },
              grid: {
                show: false,
              },
              stroke: {
                curve: "smooth",
              },
              yaxis: {
                show: false,
              },
              xaxis: {
                axisBorder: {
                  show: false,
                },
                axisTicks: {
                  show: false,
                },
                labels: {
                  show: false,
                },
                type: "datetime",
                categories: data?.map((price) => price.time_close),
              },
              fill: {
                type: "gradient",
                gradient: {
                  gradientToColors: ["#2ecc71"],
                  stops: [0, 100]
                },
              },
              colors: ["#3498db"],
              tooltip: {
                y: {
                  formatter: (value) => `$ ${value.toFixed(2)}`,
                },
              }
            }}
          />
        )}
    </>
  );
}

export default Chart;