import React from "react";
import "./Dashboard.css";
//import Map from "../components/Map";
// nodejs library that concatenates classes
import classNames from "classnames";
// react plugin used to create charts
import { Line } from "react-chartjs-2";
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';

// reactstrap components
import {
  Button,
  ButtonGroup,
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  Table,
  Row,
  Col
} from "reactstrap";

// core components
import { chartExample1 } from "../variables/charts.jsx";

class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      bigChartData: "data1",
      testdata: null,
      numberOfAlerts: null,
      alerts: [],
      signalStrength: null,
      deviceStatus: null,
      connectionStatus: null,
      lat: 0,
      long: 0
    };
  }
  setBgChartData = name => {
    this.setState({
      bigChartData: name
    });
  };
  // ,{'mode': 'no-cors'}
  componentDidMount() {
    this.timer = setInterval(() => this.getTemperature(), 1000);
    this.timer = setInterval(() => this.getAlerts(), 1000);
    this.timer = setInterval(() => this.getSignal(), 1000);
    this.timer = setInterval(() => this.getDeviceStatus(), 1000);
    this.timer = setInterval(() => this.getLocation(), 10000);
  }
  componentWillReceiveProps(nextProps) {
    this.setState({
      lat: nextProps.lat,
      long: nextProps.long
    });
  }

  async getTemperature() {
    fetch("http://127.0.0.1:5000/temperature", { method: "GET" })
      .then(response => response.json())
      .then(responseData => {
        //set your data here

        let a = [];
        let i = 0;
        // newdate = date.split("/").reverse().join("-");
        for (let index = 0; index < responseData.length - 1; index++) {
          let x = responseData[index]["DATE"];
          let newdate = x
            .split("/")
            .reverse()
            .join("-");
          let t1 = newdate + " " + responseData[index]["TIME"];
          let y = responseData[index + 1]["DATE"];
          let newdate1 = y
            .split("/")
            .reverse()
            .join("-");
          let t2 = newdate1 + " " + responseData[index + 1]["TIME"];
          let td = new Date(t2) - new Date(t1);
          let td2 = new Date("April 1, 2019 21:13:00") - new Date(t1)
          if (td > 380000 && td2<1209600000) {
            a[i] = {};
            a[i]["x"] = newdate + " " + responseData[index]["TIME"];
            a[i]["y"] = responseData[index]["TEMPERATURE"];
            i = i + 1;
            a[i] = {};
            a[i]["x"] = newdate + " " + responseData[index]["TIME"];
            a[i]["y"] = 0;
            i = i + 1;
            a[i] = {};
            a[i]["x"] = newdate1 + " " + responseData[index + 1]["TIME"];
            a[i]["y"] = 0;
            i = i + 1;
            a[i] = {};
            a[i]["x"] = newdate1 + " " + responseData[index + 1]["TIME"];
            a[i]["y"] = responseData[index + 1]["TEMPERATURE"];
              i = i + 1;
        
          } else if(td2<1209600000)  {
            a[i] = {};
            a[i]["x"] = newdate + " " + responseData[index]["TIME"];
            a[i]["y"] = responseData[index]["TEMPERATURE"];
            i = i + 1;
            a[i] = {};
            a[i]["x"] = newdate1 + " " + responseData[index + 1]["TIME"];
            a[i]["y"] = responseData[index + 1]["TEMPERATURE"];
              i = i + 1;
        
          }
        }



        this.setState({
          temperature: a
        });
        //console.log(this.state.temperature);
      })
      .catch(error => {
        console.error(error);
      });
  }

  async getAlerts() {
    fetch("http://127.0.0.1:5000/error", { method: "GET" })
      .then(response => response.json())
      .then(responseData => {
        //set your data here
        let numberOfAlerts = responseData.length;
        this.setState({
          numberOfAlerts: numberOfAlerts,
          alerts: responseData
        });
      })
      .catch(error => {
        console.error(error);
      });
  }

  async getSignal() {
    fetch("http://127.0.0.1:5000/sigstrength", { method: "GET" })
      .then(response => response.json())
      .then(responseData => {
        //set your data here
        this.setState({
          signalStrength: responseData[0]["SIGNAL STRENGTH"]
        });
      })
      .catch(error => {
        console.error(error);
      });
  }

  async getDeviceStatus() {
    fetch("http://127.0.0.1:5000/checkdev", { method: "GET" })
      .then(response => response.json())
      .then(responseData => {
        //set your data here
        let x = responseData[0]["DATE"];
        let newdate = x
          .split("/")
          .reverse()
          .join("-");
        let t1 = newdate + " " + responseData[0]["TIME"];
        let last_time = new Date(t1)
        let current_time = new Date();
        let time_difference =current_time - last_time
        if (time_difference > 18000){
          this.setState({
            deviceStatus: t1,
            connectionStatus: 'DISCONNECTED'
          });
        }
        else{
          this.setState({
            deviceStatus: t1,
            connectionStatus: 'CONNECTED'
          })
        }
        //console.log(time_difference)
        }
      )
      .catch(error => {
        console.error(error);
      });
  }
  async getLocation() {
    fetch("http://127.0.0.1:5000/latlong", { method: "GET" })
      .then(response => response.json())
      .then(responseData => {
        //set your data here
        this.setState({
          lat: parseFloat(responseData[0]["LONGITUDE"]),
          long: parseFloat(responseData[0]["LATTITUDE"])
        });
        //console.log(this.state.long, this.state.lat)
        this.forceUpdate();
        //console.log(parseFloat(responseData[0]["LATTITUDE"]));
      })
      .catch(error => {
        console.error(error);
      });
  }

  render() {
    return (
      <>
        <div className="content">
          <Row>
            <Col lg="4">
              <Card className="card-chart">
                <CardHeader>
                  <CardTitle tag="h2">
                    <i className="tim-icons icon-bell-55 text-info" /> PwC Demo
                    Device
                  </CardTitle>
                </CardHeader>
                <CardBody />
              </Card>
            </Col>
            <Col lg="4">
              <Card className="card-chart">
                <CardHeader>
                  <CardTitle tag="h2">
                    <i className="tim-icons icon-delivery-fast text-primary" />{" "}
                    {/*Number of Alerts: {this.state.numberOfAlerts}*/}
                    Number of Alerts: {this.state.numberOfAlerts}
                  </CardTitle>
                </CardHeader>
                <CardBody />
              </Card>
            </Col>
            <Col lg="4">
              <Card className="card-chart">
                <CardHeader>
                  {this.state.deviceStatus === "CONNECTED" ? (
                    <CardTitle tag="h2">
                      <i className="tim-icons icon-send text-success" />
                      Signal Strength : {this.state.signalStrength}
                    </CardTitle>
                  ) : (
                    <CardTitle tag="h2">
                      <i className="tim-icons icon-send text-success" />
                      Device Status: {this.state.connectionStatus}
                    </CardTitle>
                  )}
                </CardHeader>
                 &nbsp; Last Connected at : {this.state.deviceStatus}
                <CardBody />
              </Card>
            </Col>
          </Row>
          <Row>
            <Col xs="12">
              <Card className="card-chart">
                <CardHeader>
                  <Row>
                    <Col className="text-left" sm="6">
                      {/* <h5 className="card-category">Device Telemetry</h5> */}
                      <CardTitle tag="h2">Telemetry</CardTitle>
                    </Col>
                    <Col sm="6">
                      <ButtonGroup
                        className="btn-group-toggle float-right"
                        data-toggle="buttons"
                      >
                        <Button
                          tag="label"
                          className={classNames("btn-simple", {
                            active: this.state.bigChartData === "data1"
                          })}
                          color="info"
                          id="0"
                          size="sm"
                          onClick={() => this.setBgChartData("data1")}
                        >
                          <input
                            defaultChecked
                            className="d-none"
                            name="options"
                            type="radio"
                          />
                          <span className="d-none d-sm-block d-md-block d-lg-block d-xl-block">
                            Temperature
                          </span>
                          <span className="d-block d-sm-none">
                            <i className="tim-icons icon-single-02" />
                          </span>
                        </Button>
                        <Button
                          color="info"
                          id="1"
                          size="sm"
                          tag="label"
                          className={classNames("btn-simple", {
                            active: this.state.bigChartData === "data2"
                          })}
                          onClick={() => this.setBgChartData("data2")}
                        >
                          <input
                            className="d-none"
                            name="options"
                            type="radio"
                          />
                          <span className="d-none d-sm-block d-md-block d-lg-block d-xl-block">
                            Water Level
                          </span>
                          <span className="d-block d-sm-none">
                            <i className="tim-icons icon-gift-2" />
                          </span>
                        </Button>
                        <Button
                          color="info"
                          id="2"
                          size="sm"
                          tag="label"
                          className={classNames("btn-simple", {
                            active: this.state.bigChartData === "data3"
                          })}
                          onClick={() => this.setBgChartData("data3")}
                        >
                          <input
                            className="d-none"
                            name="options"
                            type="radio"
                          />
                          <span className="d-none d-sm-block d-md-block d-lg-block d-xl-block">
                            Flow
                          </span>
                          <span className="d-block d-sm-none">
                            <i className="tim-icons icon-tap-02" />
                          </span>
                        </Button>
                        <Button
                          color="info"
                          id="3"
                          size="sm"
                          tag="label"
                          className={classNames("btn-simple", {
                            active: this.state.bigChartData === "data4"
                          })}
                          onClick={() => this.setBgChartData("data4")}
                        >
                          <input
                            className="d-none"
                            name="options"
                            type="radio"
                          />
                          <span className="d-none d-sm-block d-md-block d-lg-block d-xl-block">
                            Heartbeat
                          </span>
                          <span className="d-block d-sm-none">
                            <i className="tim-icons icon-tap-02" />
                          </span>
                        </Button>
                      </ButtonGroup>
                    </Col>
                  </Row>
                </CardHeader>
                <CardBody>
                  <div className="chart-area">
                    <Line
                      data={chartExample1[this.state.bigChartData]}
                      options={chartExample1.options}
                    />
                  </div>
                </CardBody>
              </Card>
            </Col>
          </Row>
          <Row>
            <Col lg="6" md="12">
              <Card>
                <CardHeader>
                  <CardTitle tag="h2">Alerts</CardTitle>
                </CardHeader>
                <CardBody class="test2">
                  <Table>
                    <thead className="text-primary tablehead">
                      <tr>
                        <th className="time">Time</th>
                        <th className="value">Value</th>
                        <th className="error">Error Code</th>
                      </tr>
                    </thead>
                    <tbody className="tablebody">
                      {this.state.alerts.map(item =>
                        //  console.log(item["DATE"] + item["TIME"])
                        <tr>
                          <td class="time">{item["DATE"] + " " + item["TIME"]}</td>
                          <td class="value">Temperature Sensor Not Working</td>
                          <td className="error" >{item["ERROR CODE"]}</td>
                        </tr>
                      )}
                    </tbody>
                  </Table>
                </CardBody>
              </Card>
            </Col>
            <Col lg="6" md="12">
              <Card>
                <CardHeader>
                  <CardTitle tag="h2">Maps</CardTitle>
                </CardHeader>
                <CardBody className="mapContainer">
                  <div
                      id="map"
                      className="map"
                      style={{ position: "relative", overflow: "hidden", height: "380px" , width: "100%" }}
                    >
                    <Map google={this.props.google} zoom={13} center={{lat: this.state.lat , lng: this.state.long}}>
                      <Marker position={{ lat: this.state.lat, lng: this.state.long}} />
                    </Map>
                  </div>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </div>
      </>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: "AIzaSyDf-yIqxErTkbWzKhLox7nAANnrfDIY190"
})(Dashboard)
