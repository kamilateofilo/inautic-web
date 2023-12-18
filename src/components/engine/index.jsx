import React, { useEffect, useState } from "react";
import CircularProgress from "@mui/material/";
import { Container, Engine, EngineContent, EngineTitle } from "./styles";
import ReactSpeedometer from "react-d3-speedometer";

const Itens = ({ item, info }) => {
  const [engines, setEngines] = useState([]);

  useEffect(() => {
    for (let i = 1; i <= item.qntdMotores; i++) {
      let t = engines;
      t.push(i);
      setEngines(t);
    }
  }, [item.qntdMotores]);

  return (
    <Container>
      <Engine>
        <ReactSpeedometer
          maxValue={7200}
          value={`${info.motor1RpmAtual}`}
          needleColor="red"
          startColor="green"
          segments={10}
          endColor="blue"
          currentValueText={"RPM MOTOR #1"}
          width={300}
          height={200}
        />
      </Engine>

      <Engine>
        <ReactSpeedometer
          maxValue={7200}
          value={`${info.motor2RpmAtual}`}
          needleColor="red"
          startColor="green"
          segments={10}
          endColor="blue"
          currentValueText={"RPM MOTOR #2"}
          width={300}
          height={200}
        />
      </Engine>
    </Container>
  );
};

export default Itens;
