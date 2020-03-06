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
  ChartAxisDefaults
} from '@progress/kendo-react-charts';

import { categories, performancevalues } from '../appData';

export const PerformanceChartContainer = () => (
    <Chart>
        <ChartArea background="black" color='white' />
        <ChartAxisDefaults line={{ color: 'black' }} labels={{ font: '12pt sans-serif', color: 'white' }} />
        <ChartValueAxis>
            <ChartValueAxisItem min={40} max={100} />
        </ChartValueAxis>
        <ChartCategoryAxis>
            <ChartCategoryAxisItem majorGridLines={{visible: false}} minorGridLines={{visible: false}} categories={categories} />
        </ChartCategoryAxis>
        <ChartSeries>
            <ChartSeriesItem color= 'rgba(255, 0, 213, 0.6)' data={performancevalues} markers={{ visible: false }} type="line" style='smooth' />
        </ChartSeries>
    </Chart>
);