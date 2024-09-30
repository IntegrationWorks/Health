import React, { useState, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import axios from 'axios';

function PublishEvent({ show, handleClose, selectedEvents }) {
  const [payload, setPayload] = useState('');
  const [interval, setInterval] = useState(0);
  const [taxonomy, setTaxonomy] = useState('');

  useEffect(() => {
    if (selectedEvents.length > 0) {
      // Fetch the taxonomy based on the selected events
      const fetchTaxonomy = async () => {
        try {
          const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/events/${selectedEvents[0]}`);
          setTaxonomy(response.data.taxonomy); // Set the taxonomy from the selected event
        } catch (error) {
          console.error('Error fetching taxonomy:', error);
        }
      };
      fetchTaxonomy();
    }
  }, [selectedEvents]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const message = {
      topic: taxonomy,
      payload: payload.split(','), // Convert payload string into an array
      interval: interval,
    };

    try {
      await axios.post(`${process.env.REACT_APP_BACKEND_URL}/send-message`, message);
      alert('Event published successfully!');
      handleClose();
    } catch (error) {
      console.error('Error publishing event:', error);
      alert('Failed to publish event.');
    }
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Publish Event</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="payload">
            <Form.Label>Payload</Form.Label>
            <Form.Control
              type="text"
              value={payload}
              onChange={(e) => setPayload(e.target.value)}
              placeholder="Enter payload values separated by commas"
              required
            />
          </Form.Group>
          <Form.Group controlId="interval">
            <Form.Label>Interval</Form.Label>
            <Form.Control
              type="number"
              value={interval}
              onChange={(e) => setInterval(e.target.value)}
              placeholder="Enter interval"
              required
            />
          </Form.Group>
          {/* Taxonomy field is now hidden and not rendered */}
          <input type="hidden" value={taxonomy} /> {/* This is to keep the value without showing it */}
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Cancel
            </Button>
            <Button variant="primary" type="submit">
              Publish
            </Button>
          </Modal.Footer>
        </Form>
      </Modal.Body>
    </Modal>
  );
}

export default PublishEvent;
