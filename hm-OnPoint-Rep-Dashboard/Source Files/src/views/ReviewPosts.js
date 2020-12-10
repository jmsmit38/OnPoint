/* eslint jsx-a11y/anchor-is-valid: 0 */

import React from "react";
import { NavLink } from "react-router-dom";
import {
  Container,
  Row,
  Col,
  Card,
  CardBody,
  CardFooter,
  Badge,
  Button
} from "shards-react";

import PageTitle from "../components/common/PageTitle";

class ReviewPosts extends React.Component {
  constructor(props) {
    super(props);

    this.state = {

     error: null,
     isLoaded: false,
     PostsListOne: []
    };
  }

  componentDidMount() {
    fetch("https://uwv1ywfwqe.execute-api.us-west-2.amazonaws.com/dev/review/getall")
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({
            isLoaded: true,
            PostsListOne: result.Reviews
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
      PostsListOne
    } = this.state;

    return (
      <Container fluid className="main-content-container px-4">
        {/* Page Header */}
        <Row noGutters className="page-header py-4">
          <PageTitle sm="4" title="Recent Customer Review" subtitle="Feedback" className="text-sm-left" />
        </Row>

        {/* First Row of Posts */}
        <Row>
          {PostsListOne.map((post, idx) => (
            <Col lg="4" key={idx}>
              <Card small className="card-post mb-4">
                <CardBody>
                  <h5 className="card-title">{post.title}</h5>
                  <p className="card-text text-muted">{post.body}</p>
                </CardBody>
                <CardFooter className="border-top d-flex">
                  <div className="card-post__author d-flex">
                    <div className="d-flex flex-column justify-content-center ml-3">
                      <span className="card-post__author-name">
                        {post.firstname} {post.lastname}
                      </span>
                      <small className="text-muted">{new Date(post.submittedAt).toDateString()}</small>
                    </div>
                  </div>
                  <div className="my-auto ml-auto">
                    <NavLink to="/service-overview">
                      <Button size="sm" theme="white">
                        <i className="far fa-bookmark mr-1" /> Service Page
                      </Button>
                    </NavLink>
                  </div>
                </CardFooter>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    );
  }
}

export default ReviewPosts;


/*
<Row>
{PostsListTwo.map((post, idx) => (
  <Col lg="4" key={idx}>
    <Card small className="card-post mb-4">
      <CardBody>
        <h5 className="card-title">{post.title}</h5>
        <p className="card-text text-muted">{post.body}</p>
      </CardBody>
      <CardFooter className="border-top d-flex">
        <div className="card-post__author d-flex">
          <a
            href="#"
            className="card-post__author-avatar card-post__author-avatar--small"
            style={{ backgroundImage: `url('${post.authorAvatar}')` }}
          >
            Written by James Khan
          </a>
          <div className="d-flex flex-column justify-content-center ml-3">
            <span className="card-post__author-name">
              {post.author}
            </span>
            <small className="text-muted">{post.date}</small>
          </div>
        </div>
        <div className="my-auto ml-auto">
          <Button size="sm" theme="white">
            <i className="far fa-bookmark mr-1" /> Bookmark
          </Button>
        </div>
      </CardFooter>
    </Card>
  </Col>
))}
</Row>
*/