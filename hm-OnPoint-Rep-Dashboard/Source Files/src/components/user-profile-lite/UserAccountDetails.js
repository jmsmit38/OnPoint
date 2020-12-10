import React from "react";
import PropTypes from "prop-types";
import {
  Card,
  CardHeader,
  ListGroup,
  ListGroupItem,
  Row,
  Col,
  Form,
  FormGroup,
  FormInput,
  FormSelect,
  FormTextarea,
  Button
} from "shards-react";

class UserAccountDetails extends React.Component {
  constructor(props) {
    super(props);

    this.state = {

    error: null,
    isLoaded: false,
    User: {},
    };
    this.onInputchange = this.onInputchange.bind(this);
    this.onSubmitForm = this.onSubmitForm.bind(this);
  }

  componentDidMount() {
    fetch("https://uwv1ywfwqe.execute-api.us-west-2.amazonaws.com/dev/users/getdetails/cf5bfa80-3b31-11eb-8991-f381fa75653e")
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({
            isLoaded: true,
            User: result
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

  onInputchange(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  onSubmitForm() {
    console.log(this.state)

    var UserUp = this.state.User
    const timestamp = new Date().getTime();
    var url = "https://uwv1ywfwqe.execute-api.us-west-2.amazonaws.com/dev/users/update/"
    url += UserUp.userID

    // REFACTOR!!
    if (this.state.fname) {
      UserUp.firstname = this.state.fname
    }
    if (this.state.lname) {
      UserUp.lastname = this.state.lname
    }
    if (this.state.email) {
      UserUp.email = this.state.email
    }
    if (this.state.address) {
      UserUp.address1 = this.state.address
    }
    if (this.state.city) {
      UserUp.city = this.state.city
    }
    if (this.state.profileDesc) {
      UserUp.profileDesc = this.state.profileDesc
    }
    if (this.state.zip) {
      UserUp.zip = this.state.zip
    }
    
    UserUp.updatedAt = timestamp
    postData(url, UserUp )
      .then(data => {
        //Update to popup confirmation message
        //console.log(data); // JSON data parsed by `data.json()` call
    });
  }

  render() {
    const {
      User
    } = this.state;

    return (
      <Card small className="mb-4">
        <CardHeader className="border-bottom">
          <h6 className="m-0">Account Details</h6>
        </CardHeader>
        <ListGroup flush>
          <ListGroupItem className="p-3">
            <Row>
              <Col>
                <Form>
                  <Row form>
                    {/* First Name */}
                    <Col md="6" className="form-group">
                      <label htmlFor="feFirstName">First Name</label>
                      <FormInput
                        name = "fname"
                        id="feFirstName"
                        placeholder={User.firstname}
                        value={this.state.fname}
                        onChange={this.onInputchange}
                      />
                    </Col>
                    {/* Last Name */}
                    <Col md="6" className="form-group">
                      <label htmlFor="feLastName">Last Name</label>
                      <FormInput
                        name="lname"
                        id="feLastName"
                        placeholder={User.lastname}
                        value={this.state.lname}
                        onChange={this.onInputchange}
                      />
                    </Col>
                  </Row>
                  <Row form>
                    {/* Email */}
                    <Col md="6" className="form-group">
                      <label htmlFor="feEmail">Email</label>
                      <FormInput
                        name="email"
                        type="email"
                        id="feEmail"
                        placeholder={User.email}
                        value={this.state.email}
                        onChange={this.onInputchange}
                        autoComplete="email"
                      />
                    </Col>
                    {/* Password */}
                    <Col md="6" className="form-group">
                      <label htmlFor="fePassword">Password</label>
                      <FormInput
                        name="password"
                        type="password"
                        id="fePassword"
                        placeholder="Password"
                        value="EX@MPL#P@$$w0RD"
                        onChange={() => {}}
                        autoComplete="current-password"
                      />
                    </Col>
                  </Row>
                  <FormGroup>
                    <label htmlFor="feAddress">Address</label>
                    <FormInput
                      name="address"
                      id="feAddress"
                      placeholder={User.address1}
                      value={this.state.address}
                      onChange={this.onInputchange}
                    />
                  </FormGroup>
                  <Row form>
                    {/* City */}
                    <Col md="6" className="form-group">
                      <label htmlFor="feCity">City</label>
                      <FormInput
                        name="city"
                        id="feCity"
                        placeholder={User.city}
                        value={this.state.city}
                        onChange={this.onInputchange}
                      />
                    </Col>
                    {/* State */}
                    <Col md="4" className="form-group">
                      <label htmlFor="feInputState">State</label>
                      <FormSelect id="feInputState">
                        <option>AK</option>
                        <option>AL</option>
                        <option>AZ</option>
                        <option>CA</option>
                        <option>CT</option>
                        <option>DE</option>
                        <option>DC</option>
                        <option>FL</option>
                        <option>GA</option>
                        <option>HI</option>
                        <option>ID</option>
                        <option>IA</option>
                        <option>LA</option>
                        <option>MI</option>
                        <option>MO</option>
                      </FormSelect>
                    </Col>
                    {/* Zip Code */}
                    <Col md="2" className="form-group">
                      <label htmlFor="feZipCode">Zip</label>
                      <FormInput
                        name="zip"
                        id="feZipCode"
                        placeholder={User.zip}
                        value={this.state.city}
                        onChange={this.onInputchange}
                      />
                    </Col>
                  </Row>
                  <Row form>
                    {/* Description */}
                    <Col md="12" className="form-group">
                      <label htmlFor="feDescription">Description</label>
                      <FormTextarea
                        name="profileDesc" 
                        id="feDescription" 
                        rows="5"
                        placeholder={User.profileDesc}
                        value={this.state.profileDesc}
                        onChange={this.onInputchange}
                      />
                    </Col>
                  </Row>
                  <Button onClick={this.onSubmitForm} theme="accent">Update Account</Button>
                </Form>
              </Col>
            </Row>
          </ListGroupItem>
        </ListGroup>
      </Card>
    );
  }
}

async function postData(url = '', data = {}) {
  // Default options are marked with *
  const response = await fetch(url, {
    method: 'POST', // *GET, POST, PUT, DELETE, etc.
    mode: 'no-cors', // no-cors, *cors, same-origin
    cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
    credentials: 'same-origin', // include, *same-origin, omit
    headers: {
      'Content-Type': 'application/json'
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
    redirect: 'follow', // manual, *follow, error
    referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
    body: JSON.stringify(data) // body data type must match "Content-Type" header
  });
  console.log(response);
  return response; // parses JSON response into native JavaScript objects
}

/*
UserAccountDetails.propTypes = {
  /**
   * The component's title.
   
  title: PropTypes.string
};

UserAccountDetails.defaultProps = {
  title: "Account Details"
};
*/
export default UserAccountDetails;


/*
const UserAccountDetails = ({ title }) => (
  <Card small className="mb-4">
    <CardHeader className="border-bottom">
      <h6 className="m-0">{title}</h6>
    </CardHeader>
    <ListGroup flush>
      <ListGroupItem className="p-3">
        <Row>
          <Col>
            <Form>
              <Row form>
                
                <Col md="6" className="form-group">
                  <label htmlFor="feFirstName">First Name</label>
                  <FormInput
                    id="feFirstName"
                    placeholder="First Name"
                    value="OnPointAdmin"
                    onChange={() => {}}
                  />
                </Col>
                
                <Col md="6" className="form-group">
                  <label htmlFor="feLastName">Last Name</label>
                  <FormInput
                    id="feLastName"
                    placeholder="Last Name"
                    value=""
                    onChange={() => {}}
                  />
                </Col>
              </Row>
              <Row form>
                
                <Col md="6" className="form-group">
                  <label htmlFor="feEmail">Email</label>
                  <FormInput
                    type="email"
                    id="feEmail"
                    placeholder="Email Address"
                    value="admin@OnPoint.com"
                    onChange={() => {}}
                    autoComplete="email"
                  />
                </Col>
                
                <Col md="6" className="form-group">
                  <label htmlFor="fePassword">Password</label>
                  <FormInput
                    type="password"
                    id="fePassword"
                    placeholder="Password"
                    value="EX@MPL#P@$$w0RD"
                    onChange={() => {}}
                    autoComplete="current-password"
                  />
                </Col>
              </Row>
              <FormGroup>
                <label htmlFor="feAddress">Address</label>
                <FormInput
                  id="feAddress"
                  placeholder="Address"
                  value="1234 Main St."
                  onChange={() => {}}
                />
              </FormGroup>
              <Row form>
                
                <Col md="6" className="form-group">
                  <label htmlFor="feCity">City</label>
                  <FormInput
                    id="feCity"
                    placeholder="City"
                    onChange={() => {}}
                  />
                </Col>
               
                <Col md="4" className="form-group">
                  <label htmlFor="feInputState">State</label>
                  <FormSelect id="feInputState">
                    <option>AK</option>
                    <option>AL</option>
                    <option>AZ</option>
                    <option>CA</option>
                    <option>CT</option>
                    <option>DE</option>
                    <option>DC</option>
                    <option>FL</option>
                    <option>GA</option>
                    <option>HI</option>
                    <option>ID</option>
                    <option>IA</option>
                    <option>LA</option>
                    <option>MI</option>
                    <option>MO</option>
                  </FormSelect>
                </Col>
               
                <Col md="2" className="form-group">
                  <label htmlFor="feZipCode">Zip</label>
                  <FormInput
                    id="feZipCode"
                    placeholder="Zip"
                    onChange={() => {}}
                  />
                </Col>
              </Row>
              <Row form>
                
                <Col md="12" className="form-group">
                  <label htmlFor="feDescription">Description</label>
                  <FormTextarea id="feDescription" rows="5" />
                </Col>
              </Row>
              <Button theme="accent">Update Account</Button>
            </Form>
          </Col>
        </Row>
      </ListGroupItem>
    </ListGroup>
  </Card>
);

UserAccountDetails.propTypes = {

  title: PropTypes.string
};

UserAccountDetails.defaultProps = {
  title: "Account Details"
};

export default UserAccountDetails;
*/