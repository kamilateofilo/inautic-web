import axios from "axios";
import React, { useEffect, useState } from "react";

const Indicator = ({ item, info }) => {
  const [tanques, setTanques] = useState(0);
  const [equipamentos, setEquipamentos] = useState([]);

  const porcentIndicator =
    (info.tanque1VolumeAtual / info.tanque1VolumeMax) * 100;
  const porcentIndicator2 =
    (info.tanque2VolumeAtual / info.tanque2VolumeMax) * 100;
  const porcentIndicator3 =
    (info.tanque3VolumeAtual / info.tanque3VolumeMax) * 100;
  const porcentIndicator4 =
    (info.tanque4VolumeAtual / info.tanque4VolumeMax) * 100;

  const tankWidth = 40;
  const tankHeight = 100;
  const temperatureBarWidth = 40;
  const borderWidth = 1;
  const containerWidth = tankWidth + temperatureBarWidth + 40;

  const groupBy = (array, key) => {
    return array.reduce((result, currentItem) => {
      (result[currentItem[key]] = result[currentItem[key]] || []).push(
        currentItem
      );
      return result;
    }, {});
  };

  const getEquips = async () => {
    console.log(item);
    await axios
      .post("https://nodered.brenopereira.com.br/api/equipamentos", {
        embarcacaoID: item.id,
      })
      .then(async (res) => {
        // Agrupar pelo campo "tipo"
        const groupedByTipo = groupBy(res.data, "tipo");

        // Converter o objeto agrupado de volta para um array
        const groupedArray = Object.values(groupedByTipo);

        if (groupedArray.length && typeof groupedArray[0] !== "undefined") {
          setTanques(groupedArray[0].length);
        }

        setEquipamentos(groupedArray);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    getEquips();
  }, []);

  return (
    <div
      className="fuel-indicator-container"
      style={{ display: "flex", justifyContent: "center" }}
    >
      {tanques === 1 ? (
        <div>
          <svg height={tankHeight + 20} width={containerWidth}>
            {/* Tanque de combustível */}
            <rect
              x={0}
              y={5}
              width={tankWidth}
              height={tankHeight + 5}
              fill="#fff"
              strokeWidth={borderWidth}
              stroke="#8f8f8f"
              rx="4"
            />

            {/* Barra de combustível */}
            <rect
              x={5}
              y={5 + (1 - porcentIndicator / 100) * tankHeight}
              width={tankWidth - 10}
              height={Math.round(porcentIndicator)}
              fill="#28AFB0"
              strokeWidth={borderWidth}
              rx="4"
            />

            {typeof info.tanque1TemperaturaAtual !== "undefined" ? (
              <text x={50} y={30} textAnchor="start" fontSize="15" fill="#fff">
                {`${info.tanque1TemperaturaAtual}°C`}
              </text>
            ) : null}

            <text x={50} y={65} textAnchor="start" fontSize="15" fill="#fff">
              {`${Math.round(info.tanque1VolumeAtual)}L`}
            </text>

            <text x={50} y={100} textAnchor="start" fontSize="15" fill="#fff">
              {`${Math.round(info.tanque1DensidadeAtual)}G/L`}
            </text>
          </svg>
          <p>Tanque 1</p>
        </div>
      ) : (
        <></>
      )}
      {tanques === 2 ? (
        <>
          <div>
            <svg height={tankHeight + 20} width={containerWidth}>
              {/* Tanque de combustível */}
              <rect
                x={0}
                y={5}
                width={tankWidth}
                height={tankHeight + 5}
                fill="#fff"
                strokeWidth={borderWidth}
                stroke="#8f8f8f"
                rx="4"
              />

              {/* Barra de combustível */}
              <rect
                x={5}
                y={5 + (1 - porcentIndicator / 100) * tankHeight}
                width={tankWidth - 10}
                height={Math.round(porcentIndicator)}
                fill="#28AFB0"
                strokeWidth={borderWidth}
                rx="4"
              />

              <text x={50} y={30} textAnchor="start" fontSize="15" fill="#fff">
                {`${info.tanque1TemperaturaAtual}°C`}
              </text>

              <text x={50} y={65} textAnchor="start" fontSize="15" fill="#fff">
                {`${Math.round(info.tanque1VolumeAtual)}L`}
              </text>

              <text x={50} y={100} textAnchor="start" fontSize="15" fill="#fff">
                {`${Math.round(info.tanque1DensidadeAtual)}G/L`}
              </text>
            </svg>
            <p>Tanque 1</p>
          </div>
          <div>
            <svg height={tankHeight + 20} width={containerWidth}>
              {/* Tanque de combustível */}
              <rect
                x={10}
                y={5}
                width={tankWidth}
                height={tankHeight + 10}
                fill="#fff"
                strokeWidth={borderWidth}
                stroke="#8f8f8f"
                rx="4"
              />

              {/* Barra de combustível */}
              <rect
                x={15}
                y={10 + (1 - porcentIndicator2 / 100) * tankHeight}
                width={tankWidth - 10}
                height={Math.round(porcentIndicator2)}
                fill="#28AFB0"
                strokeWidth={borderWidth}
                rx="4"
              />

              {/* Texto de temperatura */}
              <text x={60} y={30} textAnchor="start" fontSize="15" fill="#fff">
                {`${info.tanque2TemperaturaAtual}°C`}
              </text>

              <text x={60} y={65} textAnchor="start" fontSize="15" fill="#fff">
                {`${Math.round(info.tanque2VolumeAtual)}L`}
              </text>

              <text x={60} y={100} textAnchor="start" fontSize="15" fill="#fff">
                {`${Math.round(info.tanque2DensidadeAtual)}G/L`}
              </text>
            </svg>
            <p>Tanque 2</p>
          </div>
        </>
      ) : (
        <></>
      )}
      {tanques === 3 ? (
        <>
          <div>
            <svg height={tankHeight + 20} width={containerWidth}>
              {/* Tanque de combustível */}
              <rect
                x={0}
                y={5}
                width={tankWidth}
                height={tankHeight + 5}
                fill="#fff"
                strokeWidth={borderWidth}
                stroke="#8f8f8f"
                rx="4"
              />

              {/* Barra de combustível */}
              <rect
                x={5}
                y={5 + (1 - porcentIndicator / 100) * tankHeight}
                width={tankWidth - 10}
                height={Math.round(porcentIndicator)}
                fill="#28AFB0"
                strokeWidth={borderWidth}
                rx="4"
              />

              <text x={50} y={30} textAnchor="start" fontSize="15" fill="#fff">
                {`${info.tanque1TemperaturaAtual}°C`}
              </text>

              <text x={50} y={65} textAnchor="start" fontSize="15" fill="#fff">
                {`${Math.round(info.tanque1VolumeAtual)}L`}
              </text>

              <text x={50} y={100} textAnchor="start" fontSize="15" fill="#fff">
                {`${Math.round(info.tanque1DensidadeAtual)}G/L`}
              </text>
            </svg>
            <p>Tanque 1</p>
          </div>
          <div>
            <svg height={tankHeight + 20} width={containerWidth}>
              {/* Tanque de combustível */}
              <rect
                x={10}
                y={5}
                width={tankWidth}
                height={tankHeight + 10}
                fill="#fff"
                strokeWidth={borderWidth}
                stroke="#8f8f8f"
                rx="4"
              />

              {/* Barra de combustível */}
              <rect
                x={15}
                y={10 + (1 - porcentIndicator2 / 100) * tankHeight}
                width={tankWidth - 10}
                height={Math.round(porcentIndicator2)}
                fill="#28AFB0"
                strokeWidth={borderWidth}
                rx="4"
              />

              {/* Texto de temperatura */}
              <text x={60} y={30} textAnchor="start" fontSize="15" fill="#fff">
                {`${info.tanque2TemperaturaAtual}°C`}
              </text>

              <text x={60} y={65} textAnchor="start" fontSize="15" fill="#fff">
                {`${Math.round(info.tanque2VolumeAtual)}L`}
              </text>

              <text x={60} y={100} textAnchor="start" fontSize="15" fill="#fff">
                {`${Math.round(info.tanque2DensidadeAtual)}G/L`}
              </text>
            </svg>
            <p>Tanque 2</p>
          </div>
          <div>
            <svg height={tankHeight + 20} width={containerWidth}>
              {/* Tanque de combustível */}
              <rect
                x={10}
                y={5}
                width={tankWidth}
                height={tankHeight + 10}
                fill="#fff"
                strokeWidth={borderWidth}
                stroke="#8f8f8f"
                rx="4"
              />

              {/* Barra de combustível */}
              <rect
                x={15}
                y={10 + (1 - porcentIndicator3 / 100) * tankHeight}
                width={tankWidth - 10}
                height={Math.round(porcentIndicator3)}
                fill="#28AFB0"
                strokeWidth={borderWidth}
                rx="4"
              />

              {/* Texto de temperatura */}
              <text x={60} y={30} textAnchor="start" fontSize="14" fill="#fff">
                {`${info.tanque3TemperaturaAtual}°C`}
              </text>

              <text x={60} y={65} textAnchor="start" fontSize="14" fill="#fff">
                {`${Math.round(info.tanque3VolumeAtual)}L`}
              </text>

              <text x={60} y={100} textAnchor="start" fontSize="14" fill="#fff">
                {`${Math.round(info.tanque3DensidadeAtual)}G/L`}
              </text>
            </svg>
            <p>Tanque 3</p>
          </div>
        </>
      ) : (
        <></>
      )}

      {tanques === 4 ? (
        <>
          <div>
            <svg height={tankHeight + 20} width={containerWidth}>
              {/* Tanque de combustível */}
              <rect
                x={0}
                y={5}
                width={tankWidth}
                height={tankHeight + 5}
                fill="#fff"
                strokeWidth={borderWidth}
                stroke="#8f8f8f"
                rx="4"
              />

              {/* Barra de combustível */}
              <rect
                x={5}
                y={5 + (1 - porcentIndicator / 100) * tankHeight}
                width={tankWidth - 10}
                height={Math.round(porcentIndicator)}
                fill="#28AFB0"
                strokeWidth={borderWidth}
                rx="4"
              />

              {typeof info.tanque1TemperaturaAtual !== "undefined" ? (
                <text
                  x={50}
                  y={30}
                  textAnchor="start"
                  fontSize="15"
                  fill="#fff"
                >
                  {`${info.tanque1TemperaturaAtual}°C`}
                </text>
              ) : null}

              <text x={50} y={65} textAnchor="start" fontSize="15" fill="#fff">
                {`${Math.round(info.tanque1VolumeAtual)}L`}
              </text>

              {typeof info.tanque1DensidadeAtual !== "undefined" ? (
                <text
                  x={50}
                  y={100}
                  textAnchor="start"
                  fontSize="15"
                  fill="#fff"
                >
                  {`${Math.round(info.tanque1DensidadeAtual)}G/L`}
                </text>
              ) : null}
            </svg>
            <p>Tanque 1</p>
          </div>
          <div>
            <svg height={tankHeight + 20} width={containerWidth}>
              {/* Tanque de combustível */}
              <rect
                x={10}
                y={5}
                width={tankWidth}
                height={tankHeight + 10}
                fill="#fff"
                strokeWidth={borderWidth}
                stroke="#8f8f8f"
                rx="4"
              />

              {/* Barra de combustível */}
              <rect
                x={15}
                y={10 + (1 - porcentIndicator2 / 100) * tankHeight}
                width={tankWidth - 10}
                height={Math.round(porcentIndicator2)}
                fill="#28AFB0"
                strokeWidth={borderWidth}
                rx="4"
              />

              {typeof info.tanque2TemperaturaAtual !== "undefined" ? (
                <text
                  x={60}
                  y={30}
                  textAnchor="start"
                  fontSize="15"
                  fill="#fff"
                >
                  {`${info.tanque2TemperaturaAtual}°C`}
                </text>
              ) : null}

              <text x={60} y={65} textAnchor="start" fontSize="15" fill="#fff">
                {`${Math.round(info.tanque2VolumeAtual)}L`}
              </text>

              {typeof info.tanque2DensidadeAtual !== "undefined" ? (
                <text
                  x={60}
                  y={100}
                  textAnchor="start"
                  fontSize="15"
                  fill="#fff"
                >
                  {`${Math.round(info.tanque2DensidadeAtual)}G/L`}
                </text>
              ) : null}
            </svg>
            <p>Tanque 2</p>
          </div>
          <div>
            <svg height={tankHeight + 20} width={containerWidth}>
              {/* Tanque de combustível */}
              <rect
                x={10}
                y={5}
                width={tankWidth}
                height={tankHeight + 10}
                fill="#fff"
                strokeWidth={borderWidth}
                stroke="#8f8f8f"
                rx="4"
              />

              {/* Barra de combustível */}
              <rect
                x={15}
                y={10 + (1 - porcentIndicator3 / 100) * tankHeight}
                width={tankWidth - 10}
                height={Math.round(porcentIndicator3)}
                fill="#28AFB0"
                strokeWidth={borderWidth}
                rx="4"
              />

              {/* Texto de temperatura */}
              {typeof info.tanque3TemperaturaAtual !== "undefined" ? (
                <text
                  x={60}
                  y={30}
                  textAnchor="start"
                  fontSize="14"
                  fill="#fff"
                >
                  {`${info.tanque3TemperaturaAtual}°C`}
                </text>
              ) : null}

              <text x={60} y={65} textAnchor="start" fontSize="14" fill="#fff">
                {`${Math.round(info.tanque3VolumeAtual)}L`}
              </text>

              {typeof info.tanque3DensidadeAtual !== "undefined" ? (
                <text
                  x={60}
                  y={100}
                  textAnchor="start"
                  fontSize="14"
                  fill="#fff"
                >
                  {`${Math.round(info.tanque3DensidadeAtual)}G/L`}
                </text>
              ) : null}
            </svg>
            <p>Tanque 3</p>
          </div>
          <div>
            <svg height={tankHeight + 20} width={containerWidth}>
              {/* Tanque de combustível */}
              <rect
                x={10}
                y={5}
                width={tankWidth}
                height={tankHeight + 10}
                fill="#fff"
                strokeWidth={borderWidth}
                stroke="#8f8f8f"
                rx="4"
              />

              {/* Barra de combustível */}
              <rect
                x={15}
                y={10 + (1 - porcentIndicator4 / 100) * tankHeight}
                width={tankWidth - 10}
                height={Math.round(porcentIndicator4)}
                fill="#28AFB0"
                strokeWidth={borderWidth}
                rx="4"
              />

              {/* Texto de temperatura */}
              {typeof info.tanque4TemperaturaAtual !== "undefined" ? (
                <text
                  x={50}
                  y={30}
                  textAnchor="start"
                  fontSize="15"
                  fill="#fff"
                >
                  {`${info.tanque4TemperaturaAtual}°C`}
                </text>
              ) : null}

              <text x={60} y={65} textAnchor="start" fontSize="14" fill="#fff">
                {`${Math.round(info.tanque4VolumeAtual)}L`}
              </text>

              {typeof info.tanque4DensidadeAtual !== "undefined" ? (
                <text
                  x={60}
                  y={100}
                  textAnchor="start"
                  fontSize="14"
                  fill="#fff"
                >
                  {`${Math.round(info.tanque4DensidadeAtual)}G/L`}
                </text>
              ) : null}
            </svg>
            <p>Tanque 4</p>
          </div>
        </>
      ) : null}
    </div>
  );
};

export default Indicator;
