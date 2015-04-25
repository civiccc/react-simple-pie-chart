# React Simple Pie Chart

[![npm version](https://badge.fury.io/js/react-simple-pie-chart.svg)](http://badge.fury.io/js/react-simple-pie-chart)
[![Build Status](https://travis-ci.org/brigade/react-simple-pie-chart.svg?branch=master)](https://travis-ci.org/brigade/react-simple-pie-chart)

A React component to render a simple pie chart.

## Installation

### npm

```bash
npm install react-simple-pie-chart --save
```

## Usage

```javascript
var PieChart = require('react-simple-pie-chart');
```

```javascript
<PieChart
  slices={[
    {
      color: '#f00',
      value: 10,
    },
    {
      color: '#0f0',
      value: 20,
    },
  ]}
/>
```

## License

[MIT][mit-license]

[mit-license]: ./LICENSE
