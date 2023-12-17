import React, { useEffect, useState } from "react";
import CircularProgress from "@mui/material/CircularProgress";
import { Container, Engine, EngineContent, EngineTitle } from "./styles";

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
      {engines.map((engine) => (
        <Engine>
          <EngineContent>
            <EngineTitle>
              Motor #{engine} - {Math.round(info.motor1FluxoAtual)} KM/L
            </EngineTitle>
          </EngineContent>
          <div>
            <CircularProgress
              radius={35}
              value={`${
                engine === 1 ? info.motor1RpmAtual : info.motor2RpmAtual
              }`}
              textColor="#008159"
              fontSize={12}
              title={"RPM"}
              inActiveStrokeColor={"#008159"}
              inActiveStrokeOpacity={0.4}
            />
          </div>
        </Engine>
      ))}
    </Container>
  );
};

export default Itens;
