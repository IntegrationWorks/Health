import React, { Component } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import axios from 'axios';
import './PublishEvent.css'; // Custom CSS file for styling

class PublishEvent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      topic: '',
      payload: '',
      interval: 0,
      eventTypes: [],
      selectedEventType: ''
    };
  }

  componentDidMount() {
    // Fetch event types when the component mounts
    this.fetchEventTypes();
  }

  fetchEventTypes = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/events`);
      this.setState({ eventTypes: response.data });
    } catch (error) {
      console.error('Error fetching event types:', error);
    }
  };

  handleSubmit = async (e) => {
    e.preventDefault();
    
    const { payload, interval, selectedEventType } = this.state;

    let parsedPayload;
    try {
      parsedPayload = JSON.parse(payload);
      if (!Array.isArray(parsedPayload)) {
        throw new Error("Payload must be an array of objects");
      }
    } catch (err) {
      alert('Payload must be a valid JSON array.');
      return;
    }

    const message = {
      topic: selectedEventType, // Selected event type (name or taxonomy) is used as topic
      payload: parsedPayload,
      interval: interval,
    };

    try {
      await axios.post(`${process.env.REACT_APP_BACKEND_URL}/send-message`, message);
      alert('Event published successfully!');
      this.props.handleClose(); // Close the modal after successful publish
    } catch (error) {
      console.error('Error publishing event:', error);
      alert('Failed to publish event.');
    }
  };

  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  render() {
    const { show, handleClose } = this.props;
    const { eventTypes, selectedEventType, payload, interval } = this.state;

    return (
      <Modal show={show} onHide={handleClose} dialogClassName="custom-modal">
        <Modal.Header closeButton>
          <Modal.Title>Publish Event</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={this.handleSubmit} className="publish-form">
            {/* Dropdown for Event Types */}
            <Form.Group controlId="eventType">
              <Form.Control
                as="select"
                name="selectedEventType"
                value={selectedEventType}
                onChange={this.handleChange}
                required
              >
                <option value="">Select Event Type</option>
                {eventTypes.map((event) => (
                  <option key={event.id} value={event.name}> {/* Use event.name for topic */}
                    {event.name}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>

            {/* Textarea for Payload */}
            <Form.Group controlId="payload">
              <Form.Label>Payload</Form.Label>
              <Form.Control
                as="textarea"
                rows={8}
                name="payload"
                value={payload}
                onChange={this.handleChange}
                placeholder={`Enter Payload here`}
                required
              />
            </Form.Group>

            {/* Delay Field */}
            <Form.Group controlId="interval">
              <Form.Label>Delay</Form.Label>
              <Form.Control
                type="number"
                name="interval"
                value={interval}
                onChange={this.handleChange}
                placeholder="Enter delay here"
                required
              />
            </Form.Group>

            {/* Publish Button */}
            <div className="publish-btn-container">
              <Button variant="primary" type="submit" className="publish-btn">
                Publish Event
              </Button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>
    );
  }
}

export default PublishEvent;
