import { useEffect,useState } from "react";
import Sidebar from "../components/Sidebar";
import DashboardCard from "../components/dashboard/DashboardCard";
import RecentEmployees from "../components/dashboard/RecentEmployees";

import { FaUsers,FaBuilding,FaUserCheck,FaMoneyBill } from "react-icons/fa";

import {
BarChart,
Bar,
XAxis,
YAxis,
Tooltip,
ResponsiveContainer,
PieChart,
Pie,
Cell
} from "recharts";

import {
getEmployees,
getDepartments
} from "../services/dashboardService";

import "./Dashboard.css";

export default function Dashboard(){

const [employeeCount,setEmployeeCount] = useState(0);
const [departmentCount,setDepartmentCount] = useState(0);
const [recentEmployees,setRecentEmployees] = useState([]);

const [departmentChart,setDepartmentChart] = useState([]);
const [salaryChart,setSalaryChart] = useState([]);
const [genderChart,setGenderChart] = useState([]);

useEffect(()=>{
loadData();
},[]);

const loadData = async ()=>{

const empRes = await getEmployees(200);
const depRes = await getDepartments();

const employees = empRes?.data?.data || [];
console.log(employees[0]);
setEmployeeCount(employees.length);
setDepartmentCount(depRes.data.data.length);

setRecentEmployees(employees.slice(0,5));

/* Example chart data */

// Department Distribution
const deptMap = {};

employees.forEach(emp => {
  const dep = emp.department?.name || "Unknown";
  deptMap[dep] = (deptMap[dep] || 0) + 1;
});

setDepartmentChart(
  Object.keys(deptMap).map(dep => ({
    name: dep,
    employees: deptMap[dep]
  }))
);


// Salary Range Distribution
const salaryRanges = {
  "0-30k":0,
  "30k-60k":0,
  "60k-100k":0,
  "100k+":0
};

employees.forEach(emp => {

  const sal = emp.salary;

  if(sal <= 30000) salaryRanges["0-30k"]++;
  else if(sal <= 60000) salaryRanges["30k-60k"]++;
  else if(sal <= 100000) salaryRanges["60k-100k"]++;
  else salaryRanges["100k+"]++;

});

setSalaryChart(
  Object.keys(salaryRanges).map(range => ({
    name: range,
    value: salaryRanges[range]
  }))
);


// Gender Distribution
const genderMap = { Male:0, Female:0 };

employees.forEach(emp => {

  if(emp.gender === "Male") genderMap.Male++;
  if(emp.gender === "Female") genderMap.Female++;

});

setGenderChart([
  { name:"Male", value:genderMap.Male },
  { name:"Female", value:genderMap.Female }
]);

};

const COLORS=[
"#6366f1",
"#22c55e",
"#f59e0b",
"#ef4444",
"#3b82f6",
"#a855f7",
"#14b8a6"
];

return(

<div className="dashboard-page">

<Sidebar/>

<div className="dashboard-content">

<h1 className="dashboard-title">
Dashboard
</h1>

{/* Cards */}

<div className="dashboard-cards">

<DashboardCard
title="Employees"
value={employeeCount}
icon={<FaUsers/>}
/>

<DashboardCard
title="Departments"
value={departmentCount}
icon={<FaBuilding/>}
/>

<DashboardCard
title="Active Users"
value={employeeCount}
icon={<FaUserCheck/>}
/>

<DashboardCard
title="Budget"
value="$120k"
icon={<FaMoneyBill/>}
/>

</div>

{/* Charts */}

<div className="charts-section">

{/* Department Chart */}

<div className="chart-box full-width">

<h3>Employees by Department</h3>

<ResponsiveContainer width="100%" height={300}>

<BarChart data={departmentChart}>

<XAxis dataKey="name"/>
<YAxis/>
<Tooltip/>

<Bar dataKey="employees" radius={[6,6,0,0]}>

{departmentChart.map((entry,index)=>(
<Cell key={index} fill={COLORS[index % COLORS.length]} />
))}

</Bar>

</BarChart>

</ResponsiveContainer>

</div>

{/* Bottom Charts */}

<div className="chart-row">

<div className="chart-box">

<h3>Salary Distribution</h3>

<ResponsiveContainer width="100%" height={250}>

<PieChart>

<Pie
data={salaryChart}
dataKey="value"
nameKey="name"
outerRadius={90}
label
>

{salaryChart.map((entry,index)=>(
<Cell key={index} fill={COLORS[index % COLORS.length]} />
))}

</Pie>

<Tooltip/>

</PieChart>

</ResponsiveContainer>

</div>


<div className="chart-box">

<h3>Gender Distribution</h3>

<ResponsiveContainer width="100%" height={250}>

<PieChart>

<Pie
data={genderChart}
dataKey="value"
nameKey="name"
cx="50%"
cy="100%"
innerRadius={70}
outerRadius={100}
startAngle={180}
endAngle={0}
paddingAngle={5}
label
>

{genderChart.map((entry,index)=>(
<Cell key={index} fill={COLORS[index % COLORS.length]} />
))}

</Pie>

<Tooltip/>

</PieChart>

</ResponsiveContainer>



</div>

</div>

</div>

<RecentEmployees employees={recentEmployees}/>

</div>

</div>

);

}