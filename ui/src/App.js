import React, { Component } from 'react';
import './App.css';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.css';
import {Countries} from './countries';
import {Betas} from './betas';
import {multiplyMatrices} from './matmul.js';

class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      isLoading: false,
      formData: {
        country: 'India',
        year: 2022,
        nitrogen: 1,
        phosphate: 1,
        potash: 1,
        manureApplied: 1,
        atmosphericDeposition: 1,
        cropRemoval: 1,
        bioFixation: 1,
        pesticideIndex: 1,
      },
      result: ""
    };
  }

  handleChange = (event) => {
    const value = event.target.value;
    const name = event.target.name;
    let formData = this.state.formData;
    formData[name] = value;
    this.setState({
      formData 
    });
  }

  handlePredictClick = (event) => {
    const formData = this.state.formData;
    this.setState({ isLoading: true });
    let country_str = formData.country;
    let country = parseInt(Countries[formData.country]);
    let arr = [[1, country, formData.year, formData.nitrogen, formData.phosphate, formData.potash, formData.manureApplied, formData.atmosphericDeposition, formData.cropRemoval, formData.bioFixation, formData.pesticideIndex]];

    let total = 0
    // iterate through each beta and make prediction
    for (let i = 0; i < 10; i++) {
      let beta = Betas[i];
      let temp = multiplyMatrices(arr, beta);
      total += temp[0][0];
    }

    let result = String((total/10).toFixed(2));

    this.setState({
      result: "The predicted rice yield for " + country_str +" is: " + result + " kg/ha.",
      isLoading: false
    });
  }

  handleCancelClick = (event) => {
    this.setState({ result: "" });
  }

  render() {
    const isLoading = this.state.isLoading;
    const formData = this.state.formData;
    const result = this.state.result;

    let country = [];

    // push all the countries into the array
    for (const key in Countries) {
      country.push(<option key={key} value={key}>{key}</option>);
    }
    let year = [];
    for (let i = 1961; i <= 2022; i++) {
      year.push(<option key={i} value={i}>{i}</option>);
    }
    let nitrogen = [];
    let phosphate = [];
    let potash = [];
    let manureApplied = [];
    let atmosphericDeposition = [];
    let cropRemoval = [];
    let bioFixation = [];
    let pesticideIndex = [];

    return (
      <Container>
        <div>
          <h1 className="title">Rice Yield Predictor</h1>
        </div>
        <div className="content">
          <Form>

          <Form.Row>
          <Form.Group as={Col}>
                <Form.Label>Country</Form.Label>
                <Form.Control 
                  as="select"
                  value={formData.country}
                  name="country"
                  onChange={this.handleChange}>
                  {country}
                </Form.Control>
              </Form.Group>
              <Form.Group as={Col}>
                <Form.Label>Year</Form.Label>
                <Form.Control 
                  as="select"
                  value={formData.year}
                  name="year"
                  onChange={this.handleChange}>
                  {year}
                </Form.Control>
              </Form.Group>
            </Form.Row>

            <Form.Row>
              <Form.Group as={Col}>
                <Form.Label>Nitrogen Index</Form.Label>
                <Form.Control 
                  as="textarea"
                  value={formData.nitrogen}
                  name="nitrogen"
                  onChange={this.handleChange}>
                  {nitrogen}
                </Form.Control>
              </Form.Group>
              <Form.Group as={Col}>
                <Form.Label>Phosphate Index</Form.Label>
                <Form.Control 
                  as="textarea"
                  value={formData.phosphate}
                  name="phosphate"
                  onChange={this.handleChange}>
                  {phosphate}
                </Form.Control>
              </Form.Group>
            </Form.Row>

            <Form.Row>
              <Form.Group as={Col}>
                <Form.Label>Potash Index</Form.Label>
                <Form.Control 
                  as="textarea"
                  value={formData.potash}
                  name="potash"
                  onChange={this.handleChange}>
                  {potash}
                </Form.Control>
              </Form.Group>
              <Form.Group as={Col}>
                <Form.Label>Manure Applied</Form.Label>
                <Form.Control 
                  as="textarea"
                  value={formData.manureApplied}
                  name="manureApplied"
                  onChange={this.handleChange}>
                  {manureApplied}
                </Form.Control>
              </Form.Group>
            </Form.Row>

            <Form.Row>
              <Form.Group as={Col}>
                <Form.Label>Atmospheric Deposition</Form.Label>
                <Form.Control 
                  as="textarea"
                  value={formData.atmosphericDeposition}
                  name="atmosphericDeposition"
                  onChange={this.handleChange}>
                  {atmosphericDeposition}
                </Form.Control>
              </Form.Group>
              <Form.Group as={Col}>
                <Form.Label>Crop Removal</Form.Label>
                <Form.Control 
                  as="textarea"
                  value={formData.cropRemoval}
                  name="cropRemoval"
                  onChange={this.handleChange}>
                  {cropRemoval}
                </Form.Control>
              </Form.Group>
            </Form.Row>

            <Form.Row>
              <Form.Group as={Col}>
                <Form.Label>Biological Fixation</Form.Label>
                <Form.Control 
                  as="textarea"
                  value={formData.bioFixation}
                  name="bioFixation"
                  onChange={this.handleChange}>
                  {bioFixation}
                </Form.Control>
              </Form.Group>
              <Form.Group as={Col}>
                <Form.Label>Pesticide Index</Form.Label>
                <Form.Control 
                  as="textarea"
                  value={formData.pesticideIndex}
                  name="pesticideIndex"
                  onChange={this.handleChange}>
                  {pesticideIndex}
                </Form.Control>
              </Form.Group>
            </Form.Row>
            
            <Row>
              <Col>
                <Button
                  block
                  variant="success"
                  disabled={isLoading}
                  onClick={!isLoading ? this.handlePredictClick : null}>
                  { isLoading ? 'Making prediction' : 'Predict' }
                </Button>
              </Col>
              <Col>
                <Button
                  block
                  variant="danger"
                  disabled={isLoading}
                  onClick={this.handleCancelClick}>
                  Reset prediction
                </Button>
              </Col>
            </Row>
          </Form>
          {result === "" ? null :
            (<Row>
              <Col className="result-container">
                <h5 id="result">{result}</h5>
              </Col>
            </Row>)
          }
        </div>
      </Container>
    );
  }
}

export default App;