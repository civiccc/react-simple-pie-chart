const React = require('react/addons');

const { PropTypes } = React;

/**
 * Generates an SVG pie chart.
 * @see {http://wiki.scribus.net/canvas/Making_a_Pie_Chart}
 */
const PieChart = React.createClass({
  propTypes: {
    className: PropTypes.string,
    size: PropTypes.number,
    slices: PropTypes.arrayOf(PropTypes.shape({
      color: PropTypes.string.isRequired, // hex color
      value: PropTypes.number.isRequired,
    })).isRequired,
  },

  /**
   * @return {Object}
   */
  getDefaultProps: function() {
    return {
      size: 200,
    };
  },

  /**
   * @param {Number} degrees
   * @return {Number} radians
   */
  _degreesToRadians: function(degrees) {
    return degrees * (Math.PI / 180);
  },

  /**
   * @return {Object[]}
   */
  _renderPaths: function() {
    const center = this.props.size / 2;
    const radius = center - 1; // padding to prevent clipping
    const total = this.props.slices.reduce(
      (totalValue, slice) => totalValue + slice.value, 0);

    let segment = 0;
    let lastX = radius;
    let lastY = 0;

    return this.props.slices.map((slice, index) => {
      const { color, value } = slice;
      // Should we just draw a circle?
      if (value === total) {
        return (
          <circle
            r={radius}
            cx={radius}
            cy={radius}
            fill={color}
            key={index}
          />
        );
      }

      if (value === 0) {
        return;
      }

      const valuePercentage = value / total;

      // Should the arc go the long way round?
      const longArc = (valuePercentage <= 0.5) ? 0 : 1;

      segment += valuePercentage * 360;

      // We need to convert to radians for cosine and sine functions.
      const radSegment = this._degreesToRadians(segment);
      const nextX = Math.round(Math.cos(radSegment) * radius);
      const nextY = Math.round(Math.sin(radSegment) * radius);

      // d is a string that describes the path of the slice.
      // The weirdly placed minus signs [eg, (-(lastY))] are due to the fact
      // that our calculations are for a graph with positive Y values going up,
      // but on the screen positive Y values go down.
      const d = [
        `M ${center},${center}`,
        `l ${lastX},${-lastY}`,
        `a${radius},${radius}`,
        '0',
        `${longArc},0`,
        `${nextX - lastX},${-(nextY - lastY)}`,
        'z',
      ].join(' ');

      lastX = nextX;
      lastY = nextY;

      return <path d={d} fill={color} key={index} />;
    });
  },

  /**
   * @return {Object}
   */
  render: function() {
    const { size } = this.props;
    const center = size / 2;

    return (
      <svg viewBox={`0 0 ${size} ${size}`}>
        <g transform={`rotate(-90 ${center} ${center})`}>
          {this._renderPaths()}
        </g>
      </svg>
    );
  }
});

module.exports = PieChart;
