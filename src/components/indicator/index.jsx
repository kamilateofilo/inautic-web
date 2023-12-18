import React from "react";

const Indicator = ({ item, info }) => {
  const porcentIndicator =
    (info.tanque1VolumeAtual / info.tanque1VolumeMax) * 100;
  const porcentIndicator2 =
    (info.tanque2VolumeAtual / info.tanque2VolumeMax) * 100;
  const porcentIndicator3 =
    (info.tanque3VolumeAtual / info.tanque3VolumeMax) * 100;

  const tankWidth = 40;
  const tankHeight = 100;
  const temperatureBarWidth = 40;
  const borderWidth = 1;
  const containerWidth = tankWidth + temperatureBarWidth + 40;

  return (
    <div
      className="fuel-indicator-container"
      style={{ display: "flex", justifyContent: "center" }}
    >
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
    </div>
  );
};

export default Indicator;
