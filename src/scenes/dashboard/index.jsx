import React, { useEffect, useState } from "react";
import { Box, Button, Typography, useTheme } from "@mui/material";
import { tokens } from "../../theme";
import { mockTransactions } from "../../data/mockData";
import DownloadOutlinedIcon from "@mui/icons-material/DownloadOutlined";

import GeographyChart from "../../components/GeographyChart";
import BarChart from "../../components/BarChart";
import axios from "axios";
import Vessel from "../../../src/components/vessel";
import RpmChart from "../../components/RpmChart";
import FuelChart from "../../components/FuelChart";

const Dashboard = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [user, setUser] = useState({
    nome: "",
    clienteID: "",
  });

  const [vessels, setVessels] = useState([]);

  const [fuelData, setFuelData] = useState([]);

  const [temperatureData, setTemperatureData] = useState([]);

  const [densityData, setDensityData] = useState([]);

  const [flowData, setFlowData] = useState([]);

  const [rpmData, setRpmData] = useState([]);

  const getUser = () => {
    const data = localStorage.getItem("@inautic/user");

    if (data) {
      setUser(JSON.parse(data));
    } else {
      window.location.href = "/login";
    }
  };

  const getVessel = async () => {
    await axios
      .post("https://nodered.brenopereira.com.br/api/embarcacoes", {
        clienteID: user.clienteID,
      })
      .then(async (res) => {
        setVessels(res.data);
      })
      .catch((err) => console.log(err));
  };

  const getAlerts = async () => {
    await axios.post(
      "https://nodered.brenopereira.com.br/api/alertasCombustivel",
      {
        embarcacaoID: "1",
      }
    );
  };

  const getFuelDensity = async () => {
    await axios.post(
      "https://nodered.brenopereira.com.br/api/historicoTanqueDensidadeAgrupado",
      {
        equipID: "1",
      }
    );
  };

  useEffect(() => {
    getUser();
  }, []);

  const getFuelGrouped = async () => {
    await axios
      .post(
        "https://nodered.brenopereira.com.br/api/historicoTanqueVolumeAgrupado",
        {
          equipID: 1,
        }
      )
      .then(async (res) => {
        const fuel = res.data.reduce((acc, item) => {
          const data = item.hora.split("T")[0]; // Extrai a parte da data da hora
          const existente = acc.find((el) => el.dia === data);

          if (existente) {
            existente.total += item.valorMedio;
          } else {
            acc.push({
              dia: data,
              total: item.valorMedio,
            });
          }

          return acc;
        }, []);

        setFuelData(fuel);
      })
      .catch((err) => console.log(err));
  };

  const getTemperatureGrouped = async () => {
    await axios
      .post(
        "https://nodered.brenopereira.com.br/api/historicoTanqueTemperaturaAgrupado",
        {
          equipID: 4,
        }
      )
      .then(async (res) => {
        const temperature = res.data.reduce((acc, item) => {
          const data = item.hora.split(" ")[0]; // Extrai a parte da data da hora
          const existente = acc.find((el) => el.dia === data);

          if (existente) {
            existente.total += item.valorMedio;
          } else {
            acc.push({
              dia: data,
              total: item.valorMedio,
            });
          }

          return acc;
        }, []);

        setTemperatureData(temperature);
      })
      .catch((err) => console.log(err));
  };

  const getDensityGrouped = async () => {
    await axios
      .post(
        "https://nodered.brenopereira.com.br/api/historicoTanqueDensidadeAgrupado",
        {
          equipID: 7,
        }
      )
      .then(async (res) => {
        const density = res.data.reduce((acc, item) => {
          const data = item.hora.split(" ")[0]; // Extrai a parte da data da hora
          const existente = acc.find((el) => el.dia === data);

          if (existente) {
            existente.total += item.valorMedio;
          } else {
            acc.push({
              dia: data,
              total: item.valorMedio,
            });
          }

          return acc;
        }, []);

        setDensityData(density);
      })
      .catch((err) => console.log(err));
  };

  const getFlowGrouped = async () => {
    await axios
      .post(
        "https://nodered.brenopereira.com.br/api/historicoMotorFluxoAgrupado",
        {
          equipID: 10,
        }
      )
      .then(async (res) => {
        const flow = res.data.reduce((acc, item) => {
          const data = item.hora.split(" ")[0]; // Extrai a parte da data da hora
          const existente = acc.find((el) => el.dia === data);

          if (existente) {
            existente.total += item.valorMedio;
          } else {
            acc.push({
              dia: data,
              total: item.valorMedio,
            });
          }

          return acc;
        }, []);

        setFlowData(flow);
      })
      .catch((err) => console.log(err));
  };

  const getRPMGrouped = async () => {
    await axios
      .post(
        "https://nodered.brenopereira.com.br/api/historicoMotorRpmAgrupado",
        {
          equipID: 12,
        }
      )
      .then(async (res) => {
        const rpm = res.data.reduce((acc, item) => {
          const data = item.hora.split(" ")[0]; // Extrai a parte da data da hora
          const existente = acc.find((el) => el.dia === data);

          if (existente) {
            existente.total += item.valorMedio;
          } else {
            acc.push({
              dia: data,
              total: item.valorMedio,
            });
          }

          return acc;
        }, []);

        setRpmData(rpm);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    if (user.nome.length) {
      getVessel();
      getFuelGrouped();
      getTemperatureGrouped();
      getDensityGrouped();
      getFlowGrouped();
      getRPMGrouped();

      setInterval(() => {
        getVessel();
        getAlerts();
        getFuelDensity();
      }, 10000);
    }
  }, [user]);

  return (
    <Box m="20px">
      {/* GRID & CHARTS */}
      <Box
        display="grid"
        gridTemplateColumns="repeat(12, 1fr)"
        gridAutoRows="140px"
        gap="20px"
      >
        {/* ROW 1 */}

        <Box
          gridColumn="span 12"
          gridRow="span 3"
          backgroundColor={colors.primary[400]}
        >
          <Box height="100%" mt="-20px">
            {vessels.map((item) => (
              <Vessel key={item.id.toString()} item={item} />
            ))}
          </Box>
        </Box>
        <Box
          gridColumn="span 4"
          gridRow="span 3"
          backgroundColor={colors.primary[400]}
        >
          <Typography
            variant="h5"
            fontWeight="600"
            sx={{ padding: "30px 30px 0 30px" }}
          >
            Histórico RPM
          </Typography>
          <Box height="100%" mt="-20px">
            <RpmChart isDashboard={true} rpm={rpmData} />
          </Box>
        </Box>

        <Box
          gridColumn="span 4"
          gridRow="span 3"
          backgroundColor={colors.primary[400]}
        >
          <Typography
            variant="h5"
            fontWeight="600"
            sx={{ padding: "30px 30px 0 30px" }}
          >
            Densidade do tanque
          </Typography>
          <Box height="100%" mt="-20px">
            <FuelChart isDashboard={true} fuel={densityData} />
          </Box>
        </Box>

        <Box
          gridColumn="span 4"
          gridRow="span 3"
          backgroundColor={colors.primary[400]}
        >
          <Typography
            variant="h5"
            fontWeight="600"
            sx={{ padding: "30px 30px 0 30px" }}
          >
            Volume do tanque
          </Typography>
          <Box height="100%" mt="-20px">
            <FuelChart isDashboard={true} fuel={fuelData} />
          </Box>
        </Box>

        <Box
          gridColumn="span 6"
          gridRow="span 3"
          backgroundColor={colors.primary[400]}
        >
          <Typography
            variant="h5"
            fontWeight="600"
            sx={{ padding: "30px 30px 0 30px" }}
          >
            Fluxo do motor
          </Typography>
          <Box height="100%" mt="-20px">
            <FuelChart isDashboard={true} fuel={flowData} />
          </Box>
        </Box>

        <Box
          gridColumn="span 6"
          gridRow="span 3"
          backgroundColor={colors.primary[400]}
        >
          <Typography
            variant="h5"
            fontWeight="600"
            sx={{ padding: "30px 30px 0 30px" }}
          >
            Temperatura do tanque
          </Typography>
          <Box height="100%" mt="-20px">
            <FuelChart isDashboard={true} fuel={temperatureData} />
          </Box>
        </Box>

        {/* <Box
          gridColumn="span 4"
          gridRow="span 2"
          backgroundColor={colors.primary[400]}
          overflow="auto"
        >
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            borderBottom={`4px solid ${colors.primary[500]}`}
            colors={colors.grey[100]}
            p="15px"
          >
            <Typography color={colors.grey[100]} variant="h5" fontWeight="600">
              Ultimos Alertas
            </Typography>
          </Box>
          {mockTransactions.map((transaction, i) => (
            <Box
              key={`${transaction.txId}-${i}`}
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              borderBottom={`4px solid ${colors.primary[500]}`}
              p="15px"
            >
              <Box>
                <Typography
                  color={colors.greenAccent[500]}
                  variant="h5"
                  fontWeight="600"
                >
                  {transaction.txId}
                </Typography>
                <Typography color={colors.grey[100]}>
                  {transaction.user}
                </Typography>
              </Box>
              <Box color={colors.grey[100]}>{transaction.date}</Box>
              <Box
                backgroundColor={colors.greenAccent[500]}
                p="5px 10px"
                borderRadius="4px"
              >
                {transaction.cost}
              </Box>
            </Box>
          ))}
        </Box> */}

        {/* <Box
          gridColumn="span 4"
          gridRow="span 2"
          backgroundColor={colors.primary[400]}
          overflow="auto"
        >
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            borderBottom={`4px solid ${colors.primary[500]}`}
            colors={colors.grey[100]}
            p="15px"
          >
            <Typography color={colors.grey[100]} variant="h5" fontWeight="600">
              Abastecimentos Recentes
            </Typography>
          </Box>
          {mockTransactions.map((transaction, i) => (
            <Box
              key={`${transaction.txId}-${i}`}
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              borderBottom={`4px solid ${colors.primary[500]}`}
              p="15px"
            >
              <Box>
                <Typography
                  color={colors.greenAccent[500]}
                  variant="h5"
                  fontWeight="600"
                >
                  {transaction.txId}
                </Typography>
                <Typography color={colors.grey[100]}>
                  {transaction.user}
                </Typography>
              </Box>
              <Box color={colors.grey[100]}>{transaction.date}</Box>
              <Box
                backgroundColor={colors.greenAccent[500]}
                p="5px 10px"
                borderRadius="4px"
              >
                {transaction.cost}
              </Box>
            </Box>
          ))}
        </Box> */}
      </Box>
    </Box>
  );
};

export default Dashboard;
