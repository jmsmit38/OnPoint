import React from "react";
import PropTypes from "prop-types";
import {
  Card,
  CardHeader,
  Button,
  ListGroup,
  ListGroupItem,
  Progress
} from "shards-react";


class UserDetails extends React.Component {
  constructor(props) {
    super(props);

    this.state = {

    error: null,
    isLoaded: false,
    userDetails: {},
    };
  }

  componentDidMount() {
    fetch("https://uwv1ywfwqe.execute-api.us-west-2.amazonaws.com/dev/users/getdetails/cf5bfa80-3b31-11eb-8991-f381fa75653e")
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({
            isLoaded: true,
            userDetails: {
              name: result.firstname,
              avatar: require("./../../images/avatars/stock.png"),
              jobTitle: "Project Manager",
              performanceReportTitle: "Workload",
              performanceReportValue: 74,
              metaTitle: "About Me",
              metaValue: result.profileDesc
            }
          });
        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        (error) => {
          this.setState({
            isLoaded: true,
            error
          });
        }
      )
  }

  onChangeAvatar() {
    console.log(this.state)
  }

  render() {
    const {
      userDetails
    } = this.state;

    return (
  <Card small className="mb-4 pt-3">
    <CardHeader className="border-bottom text-center">
      <div className="mb-3 mx-auto">
        <img
          className="rounded-circle"
          src={userDetails.avatar}
          alt={userDetails.name}
          width="110"
        />
      </div>
      <h4 className="mb-0">{userDetails.name}</h4>
      <span className="text-muted d-block mb-2">{userDetails.jobTitle}</span>
      <Button pill outline size="sm" className="mb-2">
        <i className="material-icons mr-1">person_add</i> Edit
      </Button>
    </CardHeader>
    <ListGroup flush>
      <ListGroupItem className="px-4">
        <div className="progress-wrapper">
          <strong className="text-muted d-block mb-2">
            {userDetails.performanceReportTitle}
          </strong>
          <Progress
            className="progress-sm"
            value={userDetails.performanceReportValue}
          >
            <span className="progress-value">
              {userDetails.performanceReportValue}%
            </span>
          </Progress>
        </div>
      </ListGroupItem>
      <ListGroupItem className="p-4">
        <strong className="text-muted d-block mb-2">
          {userDetails.metaTitle}
        </strong>
        <span>{userDetails.metaValue}</span>
      </ListGroupItem>
    </ListGroup>
  </Card>
);
}
}



export default UserDetails;
