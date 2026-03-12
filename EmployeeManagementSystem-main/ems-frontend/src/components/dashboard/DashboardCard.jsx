import "./DashboardCard.css";

export default function DashboardCard({title,value,icon}){

return(

<div className="dashboard-card">

<div>

<p className="card-title">{title}</p>

<p className="card-value">{value}</p>

</div>

<div className="card-icon">
{icon}
</div>

</div>

);

}