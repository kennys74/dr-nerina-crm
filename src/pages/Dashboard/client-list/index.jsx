import { useMemo, useState, useEffect } from "react"
import TableContainer from "/src/components/Common/TableContainer"
import { useSelector, useDispatch } from "react-redux"
import { getClients } from "/src/store/clients/actions"
import { Input, Card, CardBody, CardTitle } from "reactstrap"
import { axiosGet } from "/src/helpers/api_helper"
import { GET_CLIENT_MESSAGES } from "/src/helpers/url_helper"

function ClientList() {
  const dispatch = useDispatch()

  const { clients } = useSelector((x) => ({
    clients: x.clients.clients,
  }))
  const [clientId, setClientId] = useState(null)
  const [messages, setMessages] = useState([])
  const [showMessageModal, setShowMessageModal] = useState(false)
  console.warn("clientId", clientId)
  console.warn("messages", messages)
  console.warn("showMessageModal", showMessageModal)

  useEffect(() => {
    if (clients && !clients.length) {
      dispatch(getClients())
    }
  }, [dispatch, clients])

  useEffect(() => {
    if (clientId === null) {
      return
    }
    const url = GET_CLIENT_MESSAGES(clientId)
    axiosGet(url).then((response) => {
      console.warn("response", response)
      setMessages(response.data)
      setShowMessageModal(true)
    })
  }, [clientId])

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
    setClientId(client._id)
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
    <Card>
      <CardBody>
        <CardTitle className="mb-4">Clients</CardTitle>
        <TableContainer
          columns={columns}
          data={data}
          isGlobalFilter={true}
          isAddOptions={false}
          customPageSize={10}
          customPageSizeOptions={true}
          className="custom-header-css"
        />
      </CardBody>
    </Card>
  )
}

export default ClientList
