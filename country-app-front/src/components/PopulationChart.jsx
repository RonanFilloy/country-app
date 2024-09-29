import { VictoryLine, VictoryChart, VictoryAxis } from "victory";
import PropTypes from "prop-types";
import "../styles/PopulationChart.scss";

function PopulationChart({ data }) {
  if (!data) {
    return (
      <div>
        <h2 className="loading">Loading data...</h2>
      </div>
    );
  }

  const transformedData = data.map((entry) => ({
    x: entry.year,
    y: entry.value,
  }));

  return (
    <div className="pop__chart">
      <VictoryChart>
        <VictoryAxis label="Year" style={{ tickLabels: { fontSize: 8 } }} />
        <VictoryAxis
          dependentAxis
          label="Inhabitants"
          tickCount={4}
          style={{ tickLabels: { angle: -90, fontSize: 8 } }}
        />
        <VictoryLine data={transformedData} />
      </VictoryChart>
    </div>
  );
}

PopulationChart.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      year: PropTypes.number.isRequired,
      value: PropTypes.number.isRequired,
    })
  ),
};

export default PopulationChart;
