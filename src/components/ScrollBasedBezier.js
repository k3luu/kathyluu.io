import React from 'react';
import styled from 'styled-components';

const BezierHeader = styled.div`
  position: absolute;
  width: 100%;
  box-sizing: border-box;
  left: 0;
  right: 0;
  bottom: -18px;
  margin: 0 auto;

  &.bezier + .bezier {
    bottom: -22px;
    left: -2px;
    right: -2px;
    width: calc(100% + 4px);
  }
`;

const clamp = (val, min, max) => Math.max(min, Math.min(max, val));

/**
 * `getInterpolatedValue` provides a midpoint value
 * between y1 and y2, based on the ratio provided.
 *
 * @param {number} y1 - the value when our curve is
 *                      totally curvy
 * @param {number} y2 - the value when our curve is
 *                      totally flat
 * @param {number} x  - a value from 0 to 1 that
 *                      represents the ratio of curvy
 *                      to flat (0 = totally curvy,
 *                      1 = totally flat).
 */
const getInterpolatedValue = (y1, y2, x) => {
  // The slope of a line can be calculated as Δy / Δx.
  //
  // In this case, the domain of our function (AKA the
  // possible X values) are from 0 (x1) to 1 (x2).
  // Δx is therefore just equal to 1 (since 1 - 0 = 1).
  //
  // Because dividing by 1 has no effect, our slope in
  // this case can just be Δy.
  const a = y2 - y1;

  // Next, we know that y = ax + b.
  //
  // `b` is the Y-axis intercept, which we know is `y1`,
  // since `y1` is the `y` value when `x` is 0.
  return a * x + y1;
};

/**
 * Our first component, `ScrollArea`, tracks its children
 * as they're scrolled through the scrollable area (a
 * specific subset of the viewport).
 */
// const scrollAreaPropTypes = {
//   // The number of pixels between the top of the viewport,
//   // and the top of the scrollable area:
//   topBuffer: PropTypes.number.isRequired,
//   // The height, in pixels, of the scrollable area:
//   areaHeight: PropTypes.number.isRequired,
//   // We'll make the `scrollRatio` data available to its
//   // children with a `children` render prop:
//   children: PropTypes.func.isRequired
// };

class ScrollArea extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      scrollRatio: 0,
    };

    this.handleScroll = this.handleScroll.bind(this);
  }

  componentDidMount() {
    window.addEventListener('scroll', this.handleScroll);
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
  }

  handleScroll(ev) {
    const { topBuffer, areaHeight } = this.props;

    // const windowHeight = window.innerHeight;
    const boundingBox = this.node.getBoundingClientRect();

    const distanceToTop = boundingBox.top - topBuffer;
    const pixelsScrolled = areaHeight - distanceToTop;

    let scrollRatio = pixelsScrolled / areaHeight;
    scrollRatio = clamp(scrollRatio, 0, 1);

    if (this.state.scrollRatio !== scrollRatio) {
      this.setState({ scrollRatio });
    }
  }

  render() {
    return (
      <BezierHeader className="bezier" ref={(node) => (this.node = node)}>
        {this.props.children(this.state)}
      </BezierHeader>
    );
  }
}

// ScrollArea.propTypes = scrollAreaPropTypes;

/**
 * This is a simple Bézier curve presentational component.
 */
const BezierCurve = ({
  viewBoxWidth,
  viewBoxHeight,
  startPoint,
  firstControlPoint,
  secondControlPoint,
  endPoint,
  fill,
}) => {
  return (
    <svg viewBox={`0 0 ${viewBoxWidth} ${viewBoxHeight}`}>
      <path
        d={`
          M ${startPoint}
          C ${firstControlPoint}
            ${secondControlPoint}
            ${endPoint}
          L ${viewBoxWidth},${viewBoxHeight}
          L 0,${viewBoxHeight}
        `}
        fill={fill}
      />
    </svg>
  );
};

/**
 * The two components above are the building blocks
 * for the effect we want to build. This last component
 * assembles them.
 *
 * It takes the `headerHeight` as a prop, so that we
 * can flatten it at the right moment.
 */
const ScrollBasedBezier = ({
  headerHeight = 10,
  viewBoxWidth = 1200,
  viewBoxHeight = 250,
  startInterpolateY = 200,
  firstControlPointX = 500,
  firstInterpolateY = 0,
  secondControlPointX = 700,
  secondInterpolateY = 500,
  endPointX = 1250,
  endPointY = 0,
  fill = 'white',
}) => (
  <ScrollArea
    topBuffer={headerHeight}
    areaHeight={
      // By setting a relatively small ScrollArea height,
      // we get to see the fully-curved version for a bit
      // before the flattening starts :D
      90
    }
  >
    {({ scrollRatio }) => {
      // console.log('scroll area', scrollRatio);

      const startPointY = getInterpolatedValue(
        startInterpolateY,
        0,
        scrollRatio
      );

      const firstControlPointY = getInterpolatedValue(
        firstInterpolateY,
        0,
        scrollRatio
      );

      const secondControlPointY = getInterpolatedValue(
        secondInterpolateY,
        0,
        scrollRatio
      );

      return (
        <BezierCurve
          viewBoxWidth={viewBoxWidth}
          viewBoxHeight={viewBoxHeight}
          startPoint={[0, startPointY]}
          firstControlPoint={[firstControlPointX, firstControlPointY]}
          secondControlPoint={[secondControlPointX, secondControlPointY]}
          endPoint={[endPointX, endPointY]}
          fill={fill}
        />
      );
    }}
  </ScrollArea>
);

export default ScrollBasedBezier;
