import React from 'react';
import 'hammerjs';

import {
  Chart,
  ChartSeries,
  ChartSeriesItem,
  ChartCategoryAxis,
  ChartCategoryAxisItem,
  ChartValueAxis,
  ChartValueAxisItem,
  ChartArea,
  ChartAxisDefaults,
  ChartSeriesLabels
} from '@progress/kendo-react-charts';

import { categories, performancevalues } from '../appData';

const suffix = ' %';
const labelContent = (e) => (e.value + suffix);

export const PerformanceChartContainer = () => (
    <Chart>
        <ChartArea background="black" color='white' />
        <ChartAxisDefaults line={{ color: 'black' }} labels={{ font: '12pt sans-serif', color: 'white' }} />
        <ChartValueAxis>
            <ChartValueAxisItem labels={{ content: labelContent }} min={40} max={100} />
        </ChartValueAxis>
        <ChartCategoryAxis>
            <ChartCategoryAxisItem majorGridLines={{visible: false}} minorGridLines={{visible: false}} categories={categories} />
        </ChartCategoryAxis>
        <ChartSeries>
            <ChartSeriesItem type="area" color= 'rgb(255, 0, 213)' opacity='0.2' data={performancevalues} markers={{ visible: false }} line={{ style: 'smooth' }}>
            </ChartSeriesItem>
        </ChartSeries>
    </Chart>
);