import React from "react";
import { Container, Row, Col, Card, CardHeader, CardBody } from "shards-react";
import NavbarSearch from "../components/layout/MainNavbar/NavbarSearch";

import PageTitle from "../components/common/PageTitle";


class CustomerLookup extends React.Component {
  constructor(props) {
    super(props);

    this.state = {

    error: null,
    isLoaded: false,
    Users: []
    };
  }

  componentDidMount() {
    fetch("https://q2k5cu1u5b.execute-api.us-west-2.amazonaws.com/dev/users/getall")
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({
            isLoaded: true,
            Users: result.users
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

  render() {
    const {
      Users
    } = this.state;

    return (
      <Container fluid className="main-content-container px-4">
      {/* Page Header */}
      <Row noGutters className="page-header py-4">
        <PageTitle sm="4" title="Customer Lookup" subtitle="Directory" className="text-sm-left" />
      </Row>
      <NavbarSearch />
      <br></br>
      {/* Default Light Table */}
      <Row>
        <Col>
          <Card small className="mb-4">
            <CardHeader className="border-bottom">
              <h6 className="m-0">Active Users</h6>
            </CardHeader>
            <CardBody className="p-0 pb-3">
              <table className="table mb-0">
                <thead className="bg-light">
                  <tr>
                    <th scope="col" className="border-0">
                      #
                    </th>
                    <th scope="col" className="border-0">
                      First Name
                    </th>
                    <th scope="col" className="border-0">
                      Last Name
                    </th>
                    <th scope="col" className="border-0">
                      State
                    </th>
                    <th scope="col" className="border-0">
                      City
                    </th>
                    <th scope="col" className="border-0">
                      Phone
                    </th>
                    <th scope="col" className="border-0">
                      Email
                    </th>
                  </tr>
                </thead>
                <tbody>
                {Users.map((user, idx) => (
                  <tr>
                    <td>{idx}</td>
                    <td>{user.firstname}</td>
                    <td>{user.lastname}</td>
                    <td>{user.stateCode}</td>
                    <td>{user.city}</td>
                    <td>{user.phone}</td>
                    <td>{user.email}</td>
                  </tr>
                ))}
                </tbody>
              </table>
            </CardBody>
          </Card>
        </Col>
      </Row>
  
    </Container>
    );
  }
}

export default CustomerLookup;

/*
const Tables = () => (
  <Container fluid className="main-content-container px-4">

    <Row noGutters className="page-header py-4">
      <PageTitle sm="4" title="Customer Lookup" subtitle="Directory" className="text-sm-left" />
    </Row>
    <NavbarSearch />
    <br></br>

    <Row>
      <Col>
        <Card small className="mb-4">
          <CardHeader className="border-bottom">
            <h6 className="m-0">Active Users</h6>
          </CardHeader>
          <CardBody className="p-0 pb-3">
            <table className="table mb-0">
              <thead className="bg-light">
                <tr>
                  <th scope="col" className="border-0">
                    #
                  </th>
                  <th scope="col" className="border-0">
                    First Name
                  </th>
                  <th scope="col" className="border-0">
                    Last Name
                  </th>
                  <th scope="col" className="border-0">
                    State
                  </th>
                  <th scope="col" className="border-0">
                    City
                  </th>
                  <th scope="col" className="border-0">
                    Phone
                  </th>
                  <th scope="col" className="border-0">
                    Email
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>1</td>
                  <td>Ali</td>
                  <td>Kerry</td>
                  <td>Utah</td>
                  <td>Ogden</td>
                  <td>1-555-107-0339</td>
                </tr>
                <tr>
                  <td>2</td>
                  <td>Clark</td>
                  <td>Angela</td>
                  <td>Utah</td>
                  <td>Salt Lake City</td>
                  <td>1-555-850-1647</td>
                </tr>
                <tr>
                  <td>3</td>
                  <td>Jerry</td>
                  <td>Nathan</td>
                  <td>Texas</td>
                  <td>Dallas</td>
                  <td>1-555-214-4225</td>
                </tr>
                <tr>
                  <td>4</td>
                  <td>Colt</td>
                  <td>Angela</td>
                  <td>Arizona</td>
                  <td>Phoenix</td>
                  <td>1-555-473-7416</td>
                </tr>
                <tr>
                  <td>5</td>
                  <td>Ali</td>
                  <td>Kerry</td>
                  <td>Utah</td>
                  <td>Ogden</td>
                  <td>1-555-107-0339</td>
                </tr>
                <tr>
                  <td>6</td>
                  <td>Clark</td>
                  <td>Angela</td>
                  <td>Utah</td>
                  <td>Salt Lake City</td>
                  <td>1-555-850-1647</td>
                </tr>
              </tbody>
            </table>
          </CardBody>
        </Card>
      </Col>
    </Row>

  </Container>
);

export default Tables;




<Row>
<Col>
  <Card small className="mb-4 overflow-hidden">
    <CardHeader className="bg-dark">
      <h6 className="m-0 text-white">Active Users</h6>
    </CardHeader>
    <CardBody className="bg-dark p-0 pb-3">
      <table className="table table-dark mb-0">
        <thead className="thead-dark">
          <tr>
            <th scope="col" className="border-0">
              #
            </th>
            <th scope="col" className="border-0">
              First Name
            </th>
            <th scope="col" className="border-0">
              Last Name
            </th>
            <th scope="col" className="border-0">
              State
            </th>
            <th scope="col" className="border-0">
              City
            </th>
            <th scope="col" className="border-0">
              Phone
            </th>
          </tr>
        </thead>
        <tbody>
        <tr>
            <td>1</td>
            <td>Ali</td>
            <td>Kerry</td>
            <td>Utah</td>
            <td>Ogden</td>
            <td>1-555-107-0339</td>
          </tr>
          <tr>
            <td>2</td>
            <td>Clark</td>
            <td>Angela</td>
            <td>Utah</td>
            <td>Salt Lake City</td>
            <td>1-555-850-1647</td>
          </tr>
          <tr>
            <td>3</td>
            <td>Jerry</td>
            <td>Nathan</td>
            <td>Texas</td>
            <td>Dallas</td>
            <td>1-555-214-4225</td>
          </tr>
          <tr>
            <td>4</td>
            <td>Colt</td>
            <td>Angela</td>
            <td>Arizona</td>
            <td>Phoenix</td>
            <td>1-555-473-7416</td>
          </tr>
        </tbody>
      </table>
    </CardBody>
  </Card>
</Col>
</Row>


                  <tr>
                    <td>2</td>
                    <td>Clark</td>
                    <td>Angela</td>
                    <td>Utah</td>
                    <td>Salt Lake City</td>
                    <td>1-555-850-1647</td>
                  </tr>
                  <tr>
                    <td>3</td>
                    <td>Jerry</td>
                    <td>Nathan</td>
                    <td>Texas</td>
                    <td>Dallas</td>
                    <td>1-555-214-4225</td>
                  </tr>
                  <tr>
                    <td>4</td>
                    <td>Colt</td>
                    <td>Angela</td>
                    <td>Arizona</td>
                    <td>Phoenix</td>
                    <td>1-555-473-7416</td>
                  </tr>
                  <tr>
                    <td>5</td>
                    <td>Ali</td>
                    <td>Kerry</td>
                    <td>Utah</td>
                    <td>Ogden</td>
                    <td>1-555-107-0339</td>
                  </tr>
                  <tr>
                    <td>6</td>
                    <td>Clark</td>
                    <td>Angela</td>
                    <td>Utah</td>
                    <td>Salt Lake City</td>
                    <td>1-555-850-1647</td>
                  </tr>


*/
