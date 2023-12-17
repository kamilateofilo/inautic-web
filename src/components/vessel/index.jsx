import React, { useEffect, useState } from "react";
import axios from "axios";
import Engine from "../engine";
import Indicator from "../indicator";
import styles from "./styles";

const Vessel = ({ item }) => {
  const [vesselInfo, setVesselInfo] = useState({
    tanque1VolumeAtual: 0,
    tanque2VolumeAtual: 0,
    tanque3VolumeAtual: null,
    tanque1TemperaturaAtual: 0,
    tanque2TemperaturaAtual: 0,
    tanque3TemperaturaAtual: 0,
    tanque1DensidadeAtual: 0,
    tanque2DensidadeAtual: 0,
    tanque3DensidadeAtual: 0,
    motor1FluxoAtual: 0,
    motor2FluxoAtual: 0,
    motor1RpmAtual: 0,
    motor2RpmAtual: 0,
    tanque1VolumeMax: 0,
    tanque2VolumeMax: 0,
    tanque3VolumeMax: 0,
  });

  useEffect(() => {
    axios
      .get("https://nodered.brenopereira.com.br/api/1/variaveis")
      .then((res) => setVesselInfo(res.data))
      .catch((err) => {
        console.log(err);
      });
  }, []);

  if (item.id !== 1) return null;

  console.log(
    "Vessel Component - Rendered with item and vesselInfo:",
    item,
    vesselInfo
  );

  return (
    <div>
      <div>
        <div>
          <span style={styles.title}>{item.nome}</span>
        </div>
      </div>

      <Engine item={item} info={vesselInfo} />

      <div>
        <Indicator item={item} info={vesselInfo} />
      </div>
    </div>
  );
};

export default Vessel;
