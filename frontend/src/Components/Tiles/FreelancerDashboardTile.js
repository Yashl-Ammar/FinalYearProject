function FreelancreDashboardTile({serial, since, name, email, orders, ratings}) {
    return ( 
        <tr className="h-20 border-b border-lightGrayWhite dark:border-lightGray">
            <td>{serial}</td>
            <td>{email}</td>
            <td>{name}</td>
            <td className="font-bold">{orders}</td>
            <td className="font-bold">{ratings}</td>
            <td className="font-bold">{since}</td>
            <td>Actions</td>
        </tr>
     );
}

export default FreelancreDashboardTile;