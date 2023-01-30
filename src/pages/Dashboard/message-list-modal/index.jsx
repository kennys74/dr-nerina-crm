/* eslint-disable react/prop-types */
import { useMemo } from "react"
import TableContainer from "/src/components/Common/TableContainer"
import { Card, CardBody, CardTitle, Modal } from "reactstrap"

function MessageListModal({
  showMessageListModal,
  setShowMessageListModal,
  client,
  messages,
}) {
  if (!client || !messages) {
    return <></>
  }

  const columns = useMemo(
    () => [
      {
        Header: "Type",
        accessor: "message_type",
      },
      {
        Header: "Details",
        accessor: "message_details",
      },
      {
        Header: "Date / Time",
        accessor: "updatedAt",
      },
    ],
    []
  )

  const data = messages.map((x, i) => {
    return {
      message_type: x.message_type,
      message_details: x.message_details,
      updatedAt: x.updatedAt,
    }
  })

  return (
    <Modal
      isOpen={showMessageListModal}
      toggle={() => {
        setShowMessageListModal(!showMessageListModal)
      }}
    >
      <Card>
        <CardBody>
          <CardTitle className="mb-4">
            Messages for {client.full_name}
          </CardTitle>
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
    </Modal>
  )
}

export default MessageListModal
