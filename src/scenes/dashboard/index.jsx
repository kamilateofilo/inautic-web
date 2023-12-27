import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  useTheme,
  Select,
  MenuItem,
  Button,
} from "@mui/material";
import { tokens } from "../../theme";

import axios from "axios";
import Vessel from "../../../src/components/vessel";
import RpmChart from "../../components/RpmChart";
import FuelChart from "../../components/FuelChart";
import FlowChart from "../../components/Flow";
import FuelChartData from "../../components/Fuel";
import DensityChart from "../../components/DensityChart";
import TemperatureChart from "../../components/TemperatureChart";

const Dashboard = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [vessels, setVessels] = useState([]);
  const [fuelData, setFuelData] = useState([]);
  const [temperatureData, setTemperatureData] = useState([]);
  const [densityData, setDensityData] = useState([]);
  const [flowData, setFlowData] = useState([]);
  const [rpmData, setRpmData] = useState([]);
  const [embarcacao, setEmbarcacao] = useState(null);
  const [equipamentos, setEquipamentos] = useState([]);

  const [user, setUser] = useState({
    nome: "",
    clienteID: "",
  });

  const getUser = () => {
    const data = localStorage.getItem("@inautic/user");

    if (data) {
      setUser(JSON.parse(data));
    } else {
      window.location.href = "/login";
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  const groupBy = (array, key) => {
    return array.reduce((result, currentItem) => {
      (result[currentItem[key]] = result[currentItem[key]] || []).push(
        currentItem
      );
      return result;
    }, {});
  };

  const getVessel = async () => {
    await axios
      .post("https://nodered.brenopereira.com.br/api/embarcacoes", {
        clienteID: user.clienteID,
      })
      .then(async (res) => {
        setVessels(res.data);
        if (res.data.length) {
          setEmbarcacao(res.data[0].id);
        }
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

  const getEquipamentos = async () => {
    await axios
      .post("https://nodered.brenopereira.com.br/api/equipamentos", {
        embarcacaoID: embarcacao,
      })
      .then(async (res) => {
        // Agrupar pelo campo "tipo"
        const groupedByTipo = groupBy(res.data, "tipo");

        // Converter o objeto agrupado de volta para um array
        const groupedArray = Object.values(groupedByTipo);

        setEquipamentos(groupedArray);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    if (embarcacao) {
      getEquipamentos();
    }
  }, [embarcacao]);

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
        gridAutoRows="120px"
        gap="20px"
      >
        <Box
          gridColumn="span 12"
          gridRow="span 4"
          backgroundColor={colors.primary[400]}
        >
          <Box height="100%">
            <div
              style={{
                padding: 24,
              }}
            >
              <Select
                style={{ width: 300 }}
                value={embarcacao}
                label="Embarcação"
                onChange={(e) => {
                  setEmbarcacao(e.target.value);
                }}
              >
                {vessels.map((vessel) => (
                  <MenuItem value={vessel.id}>{vessel.nome}</MenuItem>
                ))}
              </Select>
            </div>

            {vessels.map((item) => (
              <Vessel key={item.id.toString()} item={item} />
            ))}
          </Box>
        </Box>

        {equipamentos.map((equipamento) => {
          return equipamento.map((eq) => {
            const nome = eq.nome.charAt(0).toUpperCase() + eq.nome.substring(1);

            return (
              <Box
                gridColumn="span 4"
                gridRow="span 3"
                backgroundColor={colors.primary[400]}
                p={2}
              >
                <Typography
                  variant="h5"
                  fontWeight="600"
                  sx={{ padding: "30px 30px 0 30px" }}
                >
                  {nome}
                </Typography>
                <Box height="100%" mt="-20px">
                  {eq.tipo === 3 ? (
                    <DensityChart isDashboard={true} equipID={eq.id} />
                  ) : null}

                  {eq.tipo === 2 ? (
                    <TemperatureChart isDashboard={true} equipID={eq.id} />
                  ) : null}

                  {eq.tipo === 5 ? (
                    <RpmChart isDashboard={true} equipID={eq.id} />
                  ) : null}

                  {eq.tipo === 4 ? (
                    <FlowChart isDashboard={true} equipID={eq.id} />
                  ) : null}

                  {eq.tipo === 1 ? (
                    <FuelChartData isDashboard={true} equipID={eq.id} />
                  ) : null}
                </Box>
              </Box>
            );
          });
        })}

        {/* <Box
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
        </Box> */}
      </Box>
    </Box>
  );
};

export default Dashboard;
