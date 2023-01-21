import PropTypes from "prop-types";
import React from "react";
import { Link } from "react-router-dom";
import {
  Card,
  CardBody,
  CardFooter,
  Col,
  UncontrolledTooltip,
} from "reactstrap";
import { isEmpty, size, map } from "lodash";

const CardClient = (props) => {
  const { client } = props;

  return (
    <React.Fragment>
      <Col xl="3" sm="6">
        <Card className="text-center">
          <CardBody>
            {!client.img ? (
              <div className="avatar-sm mx-auto mb-4">
                <span
                  className={
                    "avatar-title rounded-circle bg-soft bg-" +
                    client.color +
                    " text-" +
                    client.color +
                    " font-size-16"
                  }
                >
                  {client.full_name.charAt(0)}
                </span>
              </div>
            ) : (
              <div className="mb-4">
                <img
                  className="rounded-circle avatar-sm"
                  src={client.img}
                  alt=""
                />
              </div>
            )}

            <h5 className="font-size-15 mb-1">
              <Link to="#" className="text-dark">
                {client.full_name}
              </Link>
            </h5>
            <p className="text-muted">{client.designation}</p>

            <div>
              {map(
                client.tags,
                (tag, index) =>
                  index < 2 && (
                    <Link
                      to="#"
                      className="badge bg-primary font-size-11 m-1"
                      key={"_skill_" + client._id + index}
                    >
                      {tag}
                    </Link>
                  )
              )}
              {size(client.tags) > 2 && (
                <Link
                  to="#"
                  className="badge bg-primary font-size-11 m-1"
                  key={"_skill_" + client._id}
                >
                  {size(client.tags) - 1} + more
                </Link>
              )}
            </div>
          </CardBody>
          <CardFooter className="bg-transparent border-top">
            <div className="contact-links d-flex font-size-20">
              <div className="flex-fill">
                <Link to="#" id={"message" + client._id}>
                  <i className="bx bx-message-square-dots" />
                  <UncontrolledTooltip
                    placement="top"
                    target={"message" + client._id}
                  >
                    Message
                  </UncontrolledTooltip>
                </Link>
              </div>
              <div className="flex-fill">
                <Link to="#" id={"project" + client._id}>
                  <i className="bx bx-pie-chart-alt" />
                  <UncontrolledTooltip
                    placement="top"
                    target={"project" + client._id}
                  >
                    Projects
                  </UncontrolledTooltip>
                </Link>
              </div>
              <div className="flex-fill">
                <Link to="#" id={"profile" + client._id}>
                  <i className="bx bx-client-circle" />
                  <UncontrolledTooltip
                    placement="top"
                    target={"profile" + client._id}
                  >
                    Profile
                  </UncontrolledTooltip>
                </Link>
              </div>
            </div>
          </CardFooter>
        </Card>
      </Col>
    </React.Fragment>
  );
};

CardClient.propTypes = {
  client: PropTypes.object,
};

export default CardClient;
