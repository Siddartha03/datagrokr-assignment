import { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Container, Jumbotron, Form, Button } from 'react-bootstrap';

export default class AddQuestion extends Component {
  constructor() {
    super();

    this.state = {
      title: '',
      cat: '',
    };

    this.onChangeTitle = this.onChangeTitle.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChangeTitle(e) {
    this.setState({ title: e.target.value });
  }

  onSubmit(e) {
    e.preventDefault();

    const token = sessionStorage.getItem('token');

    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };

    const question = {
      title: this.state.title,
      cat: this.state.cat,
    };

    axios
      .post('http://localhost:5000/question/add', question, config)
      .then((res) => {
        if (res.data.success) {
          this.setState({ id: res.data.ques._id, success: true });
        }
      });
  }

  render() {
    return (
      <Container>
        <br />
        <Jumbotron>
          <h1 className="display-4">Add Post</h1>
        </Jumbotron>
        <br />
        <Form onSubmit={this.onSubmit}>
          <Form.Group>
            <Form.Label>Post</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter your interesting question..."
              onChange={this.onChangeTitle}
            />
          </Form.Group>
          <Button type="submit">Add Post</Button>
        </Form>
        {this.state.success && <Link to={`/question/${this.state.id}`} />}
      </Container>
    );
  }
}
