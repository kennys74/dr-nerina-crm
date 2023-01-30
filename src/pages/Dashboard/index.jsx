import React, { useMemo, useEffect } from "react"
import TableContainer from "../../components/Common/TableContainer"
import { useSelector, useDispatch } from "react-redux"
import { getClients } from "/src/store/clients/actions"
import { Input } from "reactstrap"
import Breadcrumbs from "/src/components/Common/Breadcrumb"

function Dashboard() {
  document.title = "Clients | Dr Nerina Wilkinson & Associates"

  const dispatch = useDispatch()

  const { clients } = useSelector((x) => ({
    clients: x.clients.clients,
  }))

  useEffect(() => {
    if (clients && !clients.length) {
      dispatch(getClients())
    }
  }, [dispatch, clients])

  console.warn("client list", clients)

  const columns = useMemo(
    () => [
      {
        Header: "Name",
        accessor: "name",
      },
      {
        Header: "Cellphone",
        accessor: "cellphone",
      },
      {
        Header: "",
        accessor: "buttons",
      },
    ],
    []
  )

  const onMessagesClick = (client) => {
    console.warn("client", client)
  }

  const data = clients.map((x, i) => {
    return {
      name: x.full_name,
      cellphone: x.cell_no,
      buttons: (
        <Input
          type="button"
          value="View Messages"
          key={"client" + i}
          onClick={() => onMessagesClick(x)}
        />
      ),
    }
  })

  return (
    <div className="page-content">
      <div className="container-fluid">
        <Breadcrumbs title="Dashboard" breadcrumbItem="Dashboard" />
        <TableContainer
          columns={columns}
          data={data}
          isGlobalFilter={true}
          isAddOptions={false}
          customPageSize={10}
          customPageSizeOptions={true}
          className="custom-header-css"
        />
      </div>
    </div>
  )
}

export default Dashboard
