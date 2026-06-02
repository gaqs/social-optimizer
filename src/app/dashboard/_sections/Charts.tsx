import { CartesianGrid, Legend, Line, LineChart, XAxis, YAxis } from 'recharts';

const data = [
  {
    date: "2026-05-01",
    instagram: 120,
    tiktok: 20,
  },
  {
    date: "2026-05-02",
    instagram: 145,
    tiktok: 30,
  },
  {
    date: "2026-05-03",
    instagram: 180,
    tiktok: 123,
  },
  {
    date: "2026-05-04",
    instagram: 210,
    tiktok: 52,
  },
  {
    date: "2026-05-05",
    instagram: 195,
    tiktok: 366,
  },
  {
    date: "2026-05-06",
    instagram: 240,
    tiktok: 410,
  },
  {
    date: "2026-05-07",
    instagram: 225,
    tiktok: 380,
  },
  {
    date: "2026-05-08",
    instagram: 260,
    tiktok: 455,
  },
  {
    date: "2026-05-09",
    instagram: 245,
    tiktok: 430,
  },
  {
    date: "2026-05-10",
    instagram: 290,
    tiktok: 510,
  },
];

export default function Charts() {
    return (
        <>
        <h4 className="mb-5">Análisis de crecimiento de seguidores</h4>
        <LineChart
            style={{ width: '100%', aspectRatio: 1.618}}
            responsive
            data={data}
            margin={{
                top: 20,
                right: 20,
                bottom: 5,
                left: 0,
            }}>
            <CartesianGrid stroke="#aaa" strokeDasharray="5 5" />
            <Line type="monotone" dataKey="instagram" stroke="#405DE6" strokeWidth={2} name="Instagram" />
            <Line type="monotone" dataKey="tiktok" stroke="#EE1D52" strokeWidth={2} name="Tiktok" />
            <XAxis dataKey="date" />
            <YAxis width="auto" label={{ value: 'users', position: 'insideLeft', angle: -90 }} />
            <Legend align="right" />
        </LineChart>
        
        </>
    
  );
}   