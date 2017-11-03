import PieChart from '../src/pie_chart.jsx';
import React from 'react';
import TestUtils from 'react-addons-test-utils';
import ReactDOM from 'react-dom';

let div;

const renderAttached = function(component) {
  div = document.createElement('div');
  document.body.appendChild(div);
  const renderedComponent = ReactDOM.render(component, div);
  return renderedComponent;
};

describe('<PieChart>', function() {
  beforeEach(() => {
    this.props = {
      slices: []
    };
    this.subject = () => renderAttached(<PieChart {...this.props} />);
  });

  it('is an svg', () => {
    expect(ReactDOM.findDOMNode(this.subject()).tagName.toLowerCase())
      .toEqual('svg');
  });

  describe('with two slices with positive values', () => {
    beforeEach(() => {
      this.props.slices = [
        {
          color: '#f00',
          value: 10,
        },
        {
          color: '#0f0',
          value: 20,
        },
      ];
    });

    it('renders zero circles', () => {
      const circles =
        TestUtils.scryRenderedDOMComponentsWithTag(this.subject(), 'circle');
      expect(circles.length).toEqual(0);
    });

    it('renders two paths', () => {
      const paths =
        TestUtils.scryRenderedDOMComponentsWithTag(this.subject(), 'path');
      expect(paths.length).toEqual(2);
    });
  });

  describe('with three slices with positive values', () => {
    beforeEach(() => {
      this.props.slices = [
        {
          color: '#f00',
          value: 10,
        },
        {
          color: '#0f0',
          value: 20,
        },
        {
          color: '#00f',
          value: 30,
        },
      ];
    });

    it('renders zero circles', () => {
      const circles =
        TestUtils.scryRenderedDOMComponentsWithTag(this.subject(), 'circle');
      expect(circles.length).toEqual(0);
    });

    it('renders three paths', () => {
      const paths =
        TestUtils.scryRenderedDOMComponentsWithTag(this.subject(), 'path');
      expect(paths.length).toEqual(3);
    });
  });

  describe('with a slice that is at 100%', () => {
    beforeEach(() => {
      this.props.slices = [
        {
          color: '#f00',
          value: 0,
        },
        {
          color: '#0f0',
          value: 20,
        },
      ];
    });

    it('renders a circle', () => {
      const circle =
        TestUtils.findRenderedDOMComponentWithTag(this.subject(), 'circle');
      expect(circle).toBeTruthy();
    });

    describe('the circle', () => {
      beforeEach(() => {
        this.circle =
          TestUtils.findRenderedDOMComponentWithTag(this.subject(), 'circle');
      });

      it('has the correct color', () => {
        expect(this.circle.getAttribute('fill')).toEqual('#0f0');
      });
    });

    it('renders zero paths', () => {
      const paths =
        TestUtils.scryRenderedDOMComponentsWithTag(this.subject(), 'path');
      expect(paths.length).toEqual(0);
    });
  });

  describe('with a border around the pie', () => {
    const color = '#000000';
    const width = 1;

    beforeEach(() => {
      this.props.slices = [];
      this.props.borderWidth = width;
      this.props.borderColor = color;
    });

    it('renders a black border', () => {
      const circle =
        TestUtils.findRenderedDOMComponentWithTag(this.subject(), 'circle');
      expect(circle.getAttribute('stroke')).toEqual(color);
    });

    it('renders a border of strength 1', () => {
      const circle =
        TestUtils.findRenderedDOMComponentWithTag(this.subject(), 'circle');
      expect(circle.getAttribute('stroke-width')).toEqual(String(width));
    });
  });
});
