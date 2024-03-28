function ReportDashboardTile({serial, title, type, status, date}) {
    return ( 
        <tr className="h-20 border-b border-lightGrayWhite dark:border-lightGray">
            <td>{serial}</td>
            <td>{title}</td>
            <td>{type}</td>
            <td className="font-bold">{status}</td>
            <td className="font-bold">{date}</td>
            <td>Actions</td>
        </tr>
     );
}

export default ReportDashboardTile;