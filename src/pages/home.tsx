import { Box, CircularProgress, Typography } from "@mui/material";
import Header from "../components/Header";
import { useEffect, useState } from "react";
import { itemService } from "../../services/api/endpoints/item";
import {
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(LineElement, PointElement, CategoryScale, LinearScale, Title, Tooltip, Legend);

interface Delivery {
  id: string,
  from: string,
  from_address: string,
  to: string,
  to_address: string,
  product_id: number,
  amount: number,
  driver_name: string,
  driver_second_name: string,
  date: string,
}

export default function Home() {
  const [deliveryHistory, setDeliveryHistory] = useState<Delivery[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [apiError, setApiError] = useState<string>("");

  const [totalDeliveries, setTotalDeliveries] = useState(0)
  const [avgPerDelivery, setAvgPerDelivery] = useState(0)
  const [_, setDriverStats] = useState<Record<string, number>>({});
  const [topRoutes, setTopRoutes] = useState<[string, number][]>([]);
  const [chartData, setChartData] = useState<any>({});
  const [chartOptions, setChartOptions] = useState<any>({});

  const processData = () => {
    const month = new Date().getMonth() + 1;
    console.log(month)

    //все доставки
    const total = deliveryHistory.length;

    //всего товаров
    const totalAmount = deliveryHistory.reduce((acc, d) => acc + d.amount, 0);

    //в среднем товаров за перевозку
    const avgAmount = totalAmount / deliveryHistory.length;
    const driverCount: Record<string, number> = {};
    const routeCount: Record<string, number> = {};
    const deliveriesByDate: Record<string, number> = {};

    deliveryHistory.forEach((d) => {
      const driver = `${d.driver_name} ${d.driver_second_name}`;
      driverCount[driver] = (driverCount[driver] || 0) + 1;

      const route = `${d.from} → ${d.to}`;
      routeCount[route] = (routeCount[route] || 0) + 1;

      const dateKey = new Date((d.date as unknown as { $date: string })["$date"]).toLocaleDateString('ru-RU');
      deliveriesByDate[dateKey] = (deliveriesByDate[dateKey] || 0) + 1;

    });

    const top = Object.entries(routeCount)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5);

    const sortedDates = Object.keys(deliveriesByDate).sort();
    const chart = {
      labels: sortedDates,
      datasets: [
        {
          label: "Количество доставок",
          data: sortedDates.map((date) => deliveriesByDate[date]),
          borderColor: "#3f51b5",
          backgroundColor: "rgba(63, 81, 181, 0.2)",
          tension: 0.3,
          fill: true,
        },
      ],
    };

    const options = {
      responsive: true,
      plugins: {
        legend: {
          position: "top" as const,
        },
        title: {
          display: true,
          text: "Доставки по датам",
        },
      },
    };

    setAvgPerDelivery(avgAmount);
    setTotalDeliveries(total);
    setDriverStats(driverCount);
    setTopRoutes(top);
    setChartData(chart);
    setChartOptions(options);
  }


  const getData = async () => {
    setLoading(true)
    setApiError("")

    await itemService.getDeliveryHistory()
      .then(async res => {
        console.log(res)
        if (!res) {
          console.log(res)
          throw new Error("Ошибка")
        } else {
          console.log(res)
          setDeliveryHistory(res)
        }
      })
      .catch(() => {
        setApiError("Не удалось получить историю перевозок");
      })
      .finally(() => setTimeout(() => setLoading(false), 1000))
  }

  useEffect(() => {
    const fetchData = async () => {
      await getData();
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (deliveryHistory.length > 0) {
      processData();
    }
  }, [deliveryHistory]);

  return (
    <>
      <Box sx={{
        padding: 2,
        display: "flex",
        flexDirection: "column",
      }}>
        <Header title="Статистика" />
        {
          loading ?
            <Box sx={{
              display: "flex",
              justifyContent: "center"
            }}>
              <CircularProgress size={40} sx={{ color: "#1C771C", marginBlock: 2 }} />
            </Box> :
            apiError ?
              <Box>
                {apiError}
              </Box> :

              <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>

                <Box sx={{ display: "flex", gap: 2 }}>

                <Box sx={{
                  boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.25)',
                  borderColor: "lightgrey",
                  borderWidth: 2,
                  borderRadius: 12, 
                  padding: 2,
                  flex: .5
                }}>
                  <Typography variant="h6">Всего перевозок: {totalDeliveries}</Typography>
                </Box>

                <Box sx={{
                  boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.25)',
                  borderColor: "lightgrey",
                  borderWidth: 2,
                  borderRadius: 12,
                  padding: 2,
                  flex: 1
                }}>
                  <Typography variant="h6">Среднее число товаров за перевозку: {avgPerDelivery.toFixed(0)}</Typography>
                </Box>
                </Box>

                <Box>
                  {chartData?.datasets && chartData.datasets.length > 0 && (
                    <Line data={chartData} options={chartOptions} style={{ width: "100%" }} />
                  )}
                </Box>

                
                {/* <Box>
                  <Typography variant="h6">Статистика по водителям</Typography>
                  <List>
                    {Object.entries(driverStats).map(([name, count]) => (
                      <ListItem key={name}>
                        <ListItemText primary={`${name}: ${count}`} />
                      </ListItem>
                    ))}
                  </List>
                </Box> */}
                <Box>
                  <Typography variant="h6">Топ маршруты</Typography>
                  <List>
                    {topRoutes.map(([route, count]) => (
                      <ListItem key={route}>
                        <ListItemText primary={`${route}: ${count}`} />
                      </ListItem>
                    ))}
                  </List>
                </Box>

              </Box>
        }
      </Box>
    </>
  )
}