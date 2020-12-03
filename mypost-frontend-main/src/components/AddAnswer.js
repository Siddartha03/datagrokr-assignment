import { Component } from 'react';
import axios from 'axios';
import { Button, Container, Form } from 'react-bootstrap';

export default class AddAnswer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      body: '',
      ques: props.props.match.params.id,
    };

    this.onChangeAnswerBody = this.onChangeAnswerBody.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChangeAnswerBody(e) {
    this.setState({ body: e.target.value });
  }

  onSubmit(e) {
    e.preventDefault();

    const token = sessionStorage.getItem('token');

    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };

    const comment = { body: this.state.body, ques: this.state.ques };

    axios
      .post('http://localhost:5000/answer/add', comment, config)
      .then(() => {
        this.props.refresh();
      })
      .catch((err) => console.error(err));
  }

  render() {
    return (
      <Container>
        <h2>Add your comment</h2>
        <Form onSubmit={this.onSubmit}>
          <Form.Group>
            <Form.Label>Comment Body</Form.Label>
            <Form.Control
              as="textarea"
              placeholder="Add your Comment"
              onChange={this.onChangeAnswerBody}
            />
          </Form.Group>
          <Button type="submit">Add Comment!</Button>
        </Form>
      </Container>
    );
  }
}
