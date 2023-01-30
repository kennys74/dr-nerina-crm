import { useMemo, useState, useEffect } from "react"
import TableContainer from "/src/components/Common/TableContainer"
import { useSelector, useDispatch } from "react-redux"
import { getClients } from "/src/store/clients/actions"
import { Input, Card, CardBody, CardTitle } from "reactstrap"
import { axiosGet } from "/src/helpers/api_helper"
import { GET_CLIENT_MESSAGES } from "/src/helpers/url_helper"
import MessageListModal from "../message-list-modal"

function ClientList() {
  const dispatch = useDispatch()

  const { clients } = useSelector((x) => ({
    clients: x.clients.clients,
  }))
  const [client, setClient] = useState(null)
  const [messages, setMessages] = useState([])
  const [showMessageListModal, setShowMessageListModal] = useState(false)

  useEffect(() => {
    if (clients && !clients.length) {
      dispatch(getClients())
    }
  }, [dispatch, clients])

  useEffect(() => {
    if (client === null) {
      return
    }
    const url = GET_CLIENT_MESSAGES(client._id)
    axiosGet(url).then((response) => {
      setMessages(response.data)
      setShowMessageListModal(true)
    })
  }, [client])

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
    setClient(client)
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
      <MessageListModal
        showMessageListModal={showMessageListModal}
        setShowMessageListModal={setShowMessageListModal}
        client={client}
        messages={messages}
      />
    </Card>
  )
}

export default ClientList
