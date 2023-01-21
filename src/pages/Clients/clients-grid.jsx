import React, { useEffect } from "react";
import { Link, withRouter } from "react-router-dom";
import { Col, Container, Row } from "reactstrap";
import { map } from "lodash";

//Import Breadcrumb
import Breadcrumbs from "/src/components/Common/Breadcrumb";

//Import Card
import CardClient from "./card-client";

//redux
import { useSelector, useDispatch } from "react-redux";

import { getClients as onGetClients } from "/src/store/clients/actions";

const ClientsGrid = () => {
  //meta title
  document.title = "Client Grid | Dr Nerina Wilkinson & Associates";

  const dispatch = useDispatch();

  const { clients } = useSelector((state) => ({
    clients: state.clients.clients,
  }));

  useEffect(() => {
    if (clients && !clients.length) {
      dispatch(onGetClients());
    }
  }, [dispatch, clients]);

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          {/* Render Breadcrumbs */}
          <Breadcrumbs title="Clients" breadcrumbItem="Client Grid" />

          <Row>
            {map(clients, (client, key) => (
              <CardClient client={client} key={"_client_" + key} />
            ))}
          </Row>

          <Row>
            <Col xs="12">
              <div className="text-center my-3">
                <Link to="#" className="text-success">
                  <i className="bx bx-hourglass bx-spin me-2" />
                  Load more
                </Link>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  );
};

export default withRouter(ClientsGrid);
