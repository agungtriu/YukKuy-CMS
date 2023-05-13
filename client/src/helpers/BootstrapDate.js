import React from "react";
import { Form } from "react-bootstrap"

class BootstrapDate extends React.Component {
    render() {
        return ( 
            <div>
                <div className="row row-cols-2">
                    <div className="col">
                        <Form.Group controlId="dob">
                            <Form.Label>Start Date</Form.Label>
                            <Form.Control type="date" name="dob" placeholder="Date of Birth" />
                        </Form.Group>
                    </div>
                    <div className="col">
                        <Form.Group controlId="dob">
                            <Form.Label>End Date</Form.Label>
                            <Form.Control type="date" name="dob" placeholder="Date of Birth" />
                        </Form.Group>
                    </div>
                </div>
            </div>
        )
    }
}

export default BootstrapDate;