import { Component } from 'react';
import { Container, FormControl, Jumbotron, ListGroup } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import axios from 'axios';

export default class Dashboard extends Component {
  constructor() {
    super();

    this.state = {
      data: null,
      ques: [],
      error: '',
    };
  }

  componentDidMount() {
    axios
      .get('http://localhost:5000/question/getAll/')
      .then(async (response) => {
        await this.setState({ data: response.data });
        await this.state.data.ques.forEach((ques) => {
          axios
            .get(`http://localhost:5000/user/getDetails/${ques.author}`)
            .then((author) => {
              axios
                .get(`http://localhost:5000/answer/getAll/${ques._id}`)
                .then((answers) => {
                  const totalComments = answers.data.answers.length;
                  const authorName = author.data.user.name;
                  const created = new Date(
                    Date.parse(ques.createdAt)
                  ).toDateString();

                  const question = (
                    <ListGroup.Item
                      as={Link}
                      action
                      to={'/question/' + ques._id}
                      key={ques._id}
                    >
                      <div className="d-flex w-100 justify-content-between">
                        <h5 className="mb-1">{ques.title}</h5>
                        <small>Posted on {created}</small>
                      </div>
                      <p className="mb-1">Posted by: {authorName}</p>
                      <small>Comments: {totalComments}</small>
                    </ListGroup.Item>
                  );
                  this.setState({ ques: [...this.state.ques, question] });
                });
            });
        });
      })
      .catch((err) => {
        err = JSON.stringify(err, undefined, 2);
        this.setState({ error: err });
      });
  }

  catChanged(cat) {
    console.log(cat);
    axios
      .get(`http://localhost:5000/question/getAll?cat=${cat}`)
      .then(async (response) => {
        console.log(response);
        await this.setState({ data: response.data });
        await this.state.data.ques.forEach((ques) => {
          axios
            .get(`http://localhost:5000/user/getDetails/${ques.author}`)
            .then((author) => {
              axios
                .get(`http://localhost:5000/answer/getAll/${ques._id}`)
                .then((answers) => {
                  const totalComments = answers.data.answers.length;
                  const authorName = author.data.user.name;
                  const created = new Date(
                    Date.parse(ques.createdAt)
                  ).toDateString();

                  const question = (
                    <ListGroup.Item
                      action
                      href={'/question/' + ques._id}
                      key={ques._id}
                      as="li"
                    >
                      <div className="d-flex w-100 justify-content-between">
                        <h5 className="mb-1">{ques.title}</h5>
                        <small>Posted on {created}</small>
                      </div>
                      <p className="mb-1">Posted by: {authorName}</p>
                      <small>Comments: {totalComments}</small>
                    </ListGroup.Item>
                  );
                  this.setState({ ques: [question] });
                });
            });
        });
        if (!this.state.data.ques.length) {
          this.setState({ ques: [] });
        }
      })
      .catch((err) => {
        err = JSON.stringify(err, undefined, 2);
        this.setState({ error: err });
      });
  }

  render() {
    return (
      <Container>
        <br />
        <Jumbotron>
          <h1 className="display-4">Posts</h1>
        </Jumbotron>
        <br />
        {this.state.error}
        <FormControl
          as="select"
          onChange={(e) => this.catChanged(e.target.value)}
        >
          <option>All</option>
        </FormControl>
        <hr />
        <ListGroup as="ul">{this.state.ques || ''}</ListGroup>
      </Container>
    );
  }
}
