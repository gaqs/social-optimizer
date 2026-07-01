import { BarChart, Bar, CartesianGrid, Legend, Tooltip, XAxis, YAxis } from 'recharts';

const data = [
  { date: "2026-06-01", users: 120 },
  { date: "2026-06-02", users: 145 },
  { date: "2026-06-03", users: 132 },
  { date: "2026-06-04", users: 178 },
  { date: "2026-06-05", users: 201 },
  { date: "2026-06-06", users: 189 },
  { date: "2026-06-07", users: 220 }
];

export default function Charts() {
    return (
        <>
        <h4 className="mb-5">Desempeño de la campaña</h4>
        <BarChart
            style={{ width: '100%', maxWidth: '700px', maxHeight: '200px', aspectRatio: 1.618 }}
            responsive
            data={data}
            margin={{
                top: 5,
                right: 0,
                left: 0,
                bottom: 5,
            }}
            >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis width="auto" dataKey="users" />
            <Tooltip />
            <Bar dataKey="users" fill="#9895d8" activeBar={{ fill: '#8281d3' }} radius={[10, 10, 0, 0]} />
        </BarChart>
 
        
        </>
    
  );
}   