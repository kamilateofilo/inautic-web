import React, { useEffect, useState } from "react";
import CircularProgress from "@mui/material/";
import { Container, Engine, EngineContent, EngineTitle } from "./styles";
import ReactSpeedometer from "react-d3-speedometer";

const Itens = ({ item, info }) => {
  const [engines, setEngines] = useState([]);

  useEffect(() => {
    console.log(item.qntdMotores);

    for (let i = 1; i <= item.qntdMotores; i++) {
      let t = [];
      t.push(i);
      setEngines(t);
    }
  }, [item.qntdMotores]);

  return (
    <Container>
      {engines.map((engine) => (
        <Engine>
          <ReactSpeedometer
            maxValue={7200}
            value={`${info.motor1RpmAtual}`}
            needleColor="red"
            startColor="green"
            segments={10}
            endColor="blue"
            currentValueText={`${info.motor1RpmAtual}`}
            width={300}
            height={200}
          />
        </Engine>
      ))}
    </Container>
  );
};

export default Itens;
