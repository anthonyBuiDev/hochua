"use client"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import React from 'react';

import {
  CartesianGrid,
  Line,
  LineChart,
  ReferenceLine,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

type waterLevel = {
  date: string | null;
  limitLevel: string | null;
  emergencyLevel: string | null;
}
export default function Chart({ data }: { data: waterLevel[] }) {

  const customDateOrder = [
    "1/IX", "1/X", "31/X", "30/XI", "31/XII", "31/I", "28/II",
    "31/III", "30/IV", "31/V", "30/VI", "31/VII", "31/VIII"
  ];

  // Sort data based on the custom date order
  const sortedData = data.sort((a, b) => {
    const aIndex = customDateOrder.indexOf(a.date || "");
    const bIndex = customDateOrder.indexOf(b.date || "");
    return aIndex - bIndex;
  });

  return (
    <Card>
      <CardContent className="w-full h-72">
        <ResponsiveContainer width={"100%"} height={"100%"}>
          <LineChart width={48} height={48} data={sortedData}>
            <defs>
              <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="red" stopOpacity={0.8} />
                <stop offset="95%" stopColor="red" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="blue" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#82ca9d" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="4 4" />
            <XAxis dataKey="date" />
            <YAxis domain={[20, 28]} />
            <ReferenceLine y="24.20" stroke="green" label="MNDBT: +24.20m" />
            <ReferenceLine y="27.29" stroke="gray" label="MNLKT: +27.29m" />
            <ReferenceLine y="27.70" stroke="blue" label="MNLKT: +27.70m" />
            <ReferenceLine y="20.20" stroke="yellow" label="MNC: +20.20m" />
            <Tooltip />
            <Line type="monotone" dataKey="limitLevel" stroke="red" activeDot={{ r: 8 }} />
            <Line type="monotone" dataKey="emergencyLevel" stroke="blue" />
            {/* <Line type="monotone" dataKey="value" data={customLineData} stroke="purple" /> */}
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}
