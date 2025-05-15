import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

import { Button } from '../ui/button';

type CropData = {
  name: string;
  tons: number;
  fill: string;
  percent: number;
};

const rawData = [
  { name: 'Maize', tons: 60, fill: '#36C360' },
  { name: 'Moong', tons: 80, fill: '#766F7F' },
  { name: 'Gram', tons: 100, fill: '#005B24' },
  { name: 'Wheat', tons: 50, fill: '#FFEA00' },
];

const maxTons = 100;

const data: CropData[] = rawData.map((item) => ({
  ...item,
  percent: Math.round((item.tons / maxTons) * 100),
}));

const CropCharts = () => {
  return (
    <div
      className="relative mx-4 mt-4 bg-white rounded-[10px] shadow-md"
      style={{
        height: '397px',
      }}
    >
      {/* Header */}
      <div className="flex justify-between items-center px-4 pt-4 mb-2">
        <h2 className="font-semibold text-base text-black">Village wise Crop Distribution</h2>
        <Button
          className="absolute top-0 right-0 text-sm h-7   text-white"
          style={{
            backgroundColor: '#005B24',
            borderTopRightRadius: '0px',
            borderTopLeftRadius: '0px',
          }}
        >
          <p className="font-normal text-xs">More Details</p>
        </Button>
      </div>

      {/* Chart with arrow */}
      <div className="relative px-2">
        <ResponsiveContainer width="100%" height={200}>
          <BarChart data={data} margin={{ top: 20, right: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} />
            <XAxis
              dataKey="name"
              axisLine={{ stroke: '#000', strokeWidth: 2 }}
              tick={{ fill: '#000', fontSize: 12 }}
            />
            <YAxis
              axisLine={{ stroke: '#000', strokeWidth: 2 }}
              tick={{ fill: '#000', fontSize: 12 }}
              domain={[0, 100]}
              tickCount={11}
              tickFormatter={(tick) => `${tick}%`}
            />
            <Tooltip />
            <Bar dataKey="percent" barSize={32} isAnimationActive={false}>
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.fill} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Legend */}
      <div className="grid grid-cols-2 gap-2 mt-4 text-sm px-4">
        {rawData.map((item, index) => (
          <div key={index} className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.fill }}></div>
            {item.name} {item.tons} Tons
          </div>
        ))}
      </div>

      {/* Total Section */}
      <div className="mt-3 mx-4 mb-3 bg-green-100 rounded-lg text-center py-2">
        <span className="text-green-800 font-bold text-lg">5,200 Tons</span>
      </div>
    </div>
  );
};

export default CropCharts;
