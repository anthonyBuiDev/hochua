"use client"

import {
  Area,
  AreaChart,
  CartesianGrid,
  ReferenceLine,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const data = [
  {
    "name": "1/IX",
    "uv": 20.2,
    "pv": 20.2,
  },
  {
    "name": "1/X",
    "uv": 20.2,
    "pv": 20.2
  },
  {
    "name": "31/X",
    "uv": 20.45,
    "pv": 22.04

  },
  {
    "name": "30/XI",
    "uv": 23.04,
    "pv": 24.2

  },
  {
    "name": "31/XII",
    "uv": 23.56,
    "pv": 24.2

  },
  {
    "name": "31/I",
    "uv": 22.57,
    "pv": 24.2

  },
  {
    "name": "28/II",
    "uv": 22.05,
    "pv": 23.87,

  },
  {
    "name": "31/III",
    "uv": 20.85,
    "pv": 23.18

  },
  {
    "name": "30/IV",
    "uv": 20.2,
    "pv": 22.74

  },
  {
    "name": "31/V",
    "uv": 20.2,
    "pv": 22.34,

  },
  {
    "name": "30/VI",
    "uv": 20.2,
    "pv": 21.79

  },
  {
    "name": "31/VII",
    "uv": 20.2,
    "pv": 21.09

  },
  {
    "name": "31/VIII",
    "uv": 20.2,
    "pv": 20.2
  }
]






export default function BieuDo() {
  return <AreaChart width={730} height={250} data={data}
    margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
    <defs>
      <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
        <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
        <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
      </linearGradient>
      <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
        <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8} />
        <stop offset="95%" stopColor="#82ca9d" stopOpacity={0} />
      </linearGradient>
    </defs>
    <CartesianGrid strokeDasharray="5 5" />

    <XAxis dataKey="name" />
    <YAxis domain={[20, 28]} />
    <ReferenceLine y="24.20" stroke="green" label="MNDBT: +24.20m" />
    <ReferenceLine y="27.29" stroke="black" label="MNLKT: +27.29m" />
    <ReferenceLine y="27.70" stroke="blue" label="MNLKT: +27.70m" />
    <ReferenceLine y="20.20" stroke="yellow" label="MNC: +20.20m" />
    <ReferenceLine stroke="#8884d8" segment={[{ x: '31/XII', y: 24.20 }, { x: '31/I', y: 27.29 }]} />
    <Tooltip />
    <Area type="monotone" dataKey="uv" stroke="#8884d8" fillOpacity={1} fill="url(#colorUv)" />
    <Area type="monotone" dataKey="pv" stroke="#82ca9d" fillOpacity={1} fill="url(#colorPv)" />
  </AreaChart>
}
