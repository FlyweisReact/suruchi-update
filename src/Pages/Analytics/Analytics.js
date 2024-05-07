/** @format */

import React from "react";
import HOC from "../../Layout/HOC";
import Chart from "react-apexcharts";
import { Col, Row } from "react-bootstrap";

const areaSeries = [
  {
    name: "series1",
    data: [31, 40, 28, 51, 42, 109, 100],
  },
  {
    name: "series2",
    data: [11, 32, 45, 32, 34, 52, 41],
  },
];

const areaOptions = {
  chart: {
    height: 350,
    type: "area",
  },
  dataLabels: {
    enabled: false,
  },
  stroke: {
    curve: "smooth",
  },
  xaxis: {
    type: "datetime",
    categories: [
      "2018-09-19T00:00:00.000Z",
      "2018-09-19T01:30:00.000Z",
      "2018-09-19T02:30:00.000Z",
      "2018-09-19T03:30:00.000Z",
      "2018-09-19T04:30:00.000Z",
      "2018-09-19T05:30:00.000Z",
      "2018-09-19T06:30:00.000Z",
    ],
  },
  tooltip: {
    x: {
      format: "dd/MM/yy HH:mm",
    },
  },
};

const polarSeries = [14, 23, 21, 17, 15, 10, 12, 17, 21];

const polaroOtions = {
  chart: {
    type: "polarArea",
  },
  stroke: {
    colors: ["#fff"],
  },
  fill: {
    opacity: 0.8,
  },
  responsive: [
    {
      breakpoint: 480,
      options: {
        chart: {
          width: 200,
        },
        legend: {
          position: "bottom",
        },
      },
    },
  ],
};

const Analytics = () => {
  return (
    <section className="sectionCont">
      <div className="pb-4  w-full flex justify-between items-center">
        <span
          className="tracking-widest text-slate-900 font-semibold"
          style={{ fontSize: "1.5rem" }}
        >
          Analytics
        </span>
        <button className="md:py-2 px-3 md:px-4 py-1 rounded-sm bg-[#0c0c0c] text-white tracking-wider">
          Export data
        </button>
      </div>
      {/* ApexCharts area chart */}
      <Row>
        <Col xs={12} md={6}>
          <Chart
            options={areaOptions}
            series={areaSeries}
            type="area"
            height={350}
          />
        </Col>
        <Col xs={12} md={6} className="d-flex justify-center">
          <Chart
            options={polaroOtions}
            series={polarSeries}
            type="polarArea"
            width={"500"}
          />
        </Col>
        <Col xs={12} md={6} className="d-flex justify-center">
          <Chart
            options={polaroOtions}
            series={polarSeries}
            type="polarArea"
            width={"500"}
          />
        </Col>
        <Col xs={12} md={6}>
          <Chart
            options={areaOptions}
            series={areaSeries}
            type="area"
            height={350}
          />
        </Col>
      </Row>
    </section>
  );
};

export default HOC(Analytics);
