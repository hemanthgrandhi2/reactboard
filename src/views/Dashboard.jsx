import React from "react";
import "./Dashboard.css";
//import Map from "../components/Map";
// nodejs library that concatenates classes
import classNames from "classnames";
// react plugin used to create charts
import { Line } from "react-chartjs-2";
import {Map, Marker, GoogleApiWrapper} from 'google-maps-react';

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
// import { chartExample1 } from "../variables/charts.jsx";
// import LineGraph from "../variables/linegraph";

//let datemax  = new Date("April 1, 2019 21:13:00");
//let datemin = new Date(datemax.getDate() - 13);



let chart1_2_options = {
  maintainAspectRatio: false,
  legend: {
    display: false
  },

  
  elements: {
    line: {
    tension: 0
    }
    },

  responsive: true,
  scales: {
    yAxes: [
      {
        gridLines: {
          drawBorder: false,
          color: "rgba(29,140,248,0.0)",
          zeroLineColor: "transparent"
        },
        ticks: {
          suggestedMin: 0,
          // suggestedMax: 100,
          padding: 20,

          fontColor: "#9a9a9a"
        }
      }
    ],
    xAxes: [
      {
        type: 'time',
        // distribution: 'linear',

        time: {
            unit : 'day',
            displayFormats: {
                day: 'MMM DD',
            },
            // max: datemax,
            // min: datemin,
        },
        barPercentage: 1.6,
        gridLines: {
          drawBorder: false,
          color: "rgba(29,140,248,0.1)",
          zeroLineColor: "transparent"
        },
        ticks: {
          fontColor: "#9a9a9a",
          // source: 'data',
        }
      }
    ]
  }
};



class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    
    this.getAlerts = this.getAlerts.bind(this);
    this.getDeviceStatus = this.getDeviceStatus.bind(this);
    this.getTemperature = this.getTemperature.bind(this);
    this.getSignal = this.getSignal.bind(this);
    this.getLocation = this.getLocation.bind(this);
    this.getWaterLevel = this.getWaterLevel.bind(this);
    this.getFlow = this.getFlow.bind(this)

    this.state = {
      bigChartData: "data1",
      testdata: null,
      numberOfAlerts: null,
      alerts: [],
      signalStrength: null,
      deviceStatus: null,
      lat: 0,
      long: 0,
      temperature: [],
      waterlevel: [],
      flow: [],
      chartExample1 : {
        data1: canvas => {
          let ctx = canvas.getContext("2d");
      
          let gradientStroke = ctx.createLinearGradient(0, 230, 0, 50);
      
          gradientStroke.addColorStop(1, "rgba(29,140,248,0.2)");
          gradientStroke.addColorStop(0.4, "rgba(29,140,248,0.0)");
          gradientStroke.addColorStop(0, "rgba(29,140,248,0)"); //blue colors
           let dateObj = new Date();

      
          return {

            labels : [ new Date(),
              
                      dateObj.setDate(dateObj.getDate() - 1) ,
                      dateObj.setDate(dateObj.getDate() - 1),
                      dateObj.setDate(dateObj.getDate() - 1),
                      dateObj.setDate(dateObj.getDate() - 1),
                      dateObj.setDate(dateObj.getDate() - 1),
                      dateObj.setDate(dateObj.getDate() - 1),
                      dateObj.setDate(dateObj.getDate() - 1),
                      dateObj.setDate(dateObj.getDate() - 1),
                      dateObj.setDate(dateObj.getDate() - 1),
                      dateObj.setDate(dateObj.getDate() - 1),
                      dateObj.setDate(dateObj.getDate() - 1),
                      dateObj.setDate(dateObj.getDate() - 1),
                    ],

            datasets: [
              {
                label: "Temperature",
                fill: true,
                backgroundColor: gradientStroke,
                borderColor: "#1f8ef1",
                borderWidth: 2,
                borderDash: [],
                borderDashOffset: 0.0,
                pointBackgroundColor: "#1f8ef1",
                pointBorderColor: "rgba(255,255,255,0)",
                pointHoverBackgroundColor: "#1f8ef1",
                pointBorderWidth: 0,
                pointHoverRadius: 0,
                pointHoverBorderWidth: 0,
                pointRadius: 0,
                data: this.state.temperature
              }
            ]
          };
        },

        data2: canvas => {
          let ctx = canvas.getContext("2d");
      
          let gradientStroke = ctx.createLinearGradient(0, 230, 0, 50);
      
          gradientStroke.addColorStop(1, "rgba(29,140,248,0.2)");
          gradientStroke.addColorStop(0.4, "rgba(29,140,248,0.0)");
          gradientStroke.addColorStop(0, "rgba(29,140,248,0)"); //blue colors
          // let td = moment('2019-04-01')
          let date = []
          date[0]  = new Date();
           date[1] = new Date(date[0].getDate() - 1);
          date[2] = new Date(date[0].getDate() - 2);

           date[3] = new Date(date[0].getDate() - 3);
           date[4] = new Date(date[0].getDate() - 4);
           date[5] = new Date(date[0].getDate() - 5);
           date[6] = new Date(date[0].getDate() - 6);
           date[7] = new Date(date[0].getDate() - 7);
           date[8] = new Date(date[0].getDate() - 8);
           date[9] = new Date(date[0].getDate() - 9);
           let dateObj = new Date();

      
          return {

            labels : [ new Date(),
              
                      dateObj.setDate(dateObj.getDate() - 1) ,
                      dateObj.setDate(dateObj.getDate() - 1),
                      dateObj.setDate(dateObj.getDate() - 1),
                      dateObj.setDate(dateObj.getDate() - 1),
                      dateObj.setDate(dateObj.getDate() - 1),
                      dateObj.setDate(dateObj.getDate() - 1),
                      dateObj.setDate(dateObj.getDate() - 1),
                      dateObj.setDate(dateObj.getDate() - 1),
                      dateObj.setDate(dateObj.getDate() - 1),
                      dateObj.setDate(dateObj.getDate() - 1),
                      dateObj.setDate(dateObj.getDate() - 1),
                      dateObj.setDate(dateObj.getDate() - 1),
                    ],

            datasets: [
              {
                label: "Water Level",
                fill: true,
                backgroundColor: gradientStroke,
                borderColor: "#1f8ef1",
                borderWidth: 2,
                borderDash: [],
                borderDashOffset: 0.0,
                pointBackgroundColor: "#1f8ef1",
                pointBorderColor: "rgba(255,255,255,0)",
                pointHoverBackgroundColor: "#1f8ef1",
                pointBorderWidth: 0,
                pointHoverRadius: 0,
                pointHoverBorderWidth: 0,
                pointRadius: 0,
                data: this.state.waterlevel,
              }
            ]
          };
        },
        data3: canvas => {
          let ctx = canvas.getContext("2d");
      
          let gradientStroke = ctx.createLinearGradient(0, 230, 0, 50);
      
          gradientStroke.addColorStop(1, "rgba(29,140,248,0.2)");
          gradientStroke.addColorStop(0.4, "rgba(29,140,248,0.0)");
          gradientStroke.addColorStop(0, "rgba(29,140,248,0)"); //blue colors
          // let td = moment('2019-04-01')
          let date = []
          date[0]  = new Date();
           date[1] = new Date(date[0].getDate() - 1);
          date[2] = new Date(date[0].getDate() - 2);

           date[3] = new Date(date[0].getDate() - 3);
           date[4] = new Date(date[0].getDate() - 4);
           date[5] = new Date(date[0].getDate() - 5);
           date[6] = new Date(date[0].getDate() - 6);
           date[7] = new Date(date[0].getDate() - 7);
           date[8] = new Date(date[0].getDate() - 8);
           date[9] = new Date(date[0].getDate() - 9);
           let dateObj = new Date();

      
          return {

            labels : [ new Date(),
              
                      dateObj.setDate(dateObj.getDate() - 1) ,
                      dateObj.setDate(dateObj.getDate() - 1),
                      dateObj.setDate(dateObj.getDate() - 1),
                      dateObj.setDate(dateObj.getDate() - 1),
                      dateObj.setDate(dateObj.getDate() - 1),
                      dateObj.setDate(dateObj.getDate() - 1),
                      dateObj.setDate(dateObj.getDate() - 1),
                      dateObj.setDate(dateObj.getDate() - 1),
                      dateObj.setDate(dateObj.getDate() - 1),
                      dateObj.setDate(dateObj.getDate() - 1),
                      dateObj.setDate(dateObj.getDate() - 1),
                      dateObj.setDate(dateObj.getDate() - 1),
                    ],

            datasets: [
              {
                label: "flow pulse",
                fill: true,
                backgroundColor: gradientStroke,
                borderColor: "#1f8ef1",
                borderWidth: 2,
                borderDash: [],
                borderDashOffset: 0.0,
                pointBackgroundColor: "#1f8ef1",
                pointBorderColor: "rgba(255,255,255,0)",
                pointHoverBackgroundColor: "#1f8ef1",
                pointBorderWidth: 0,
                pointHoverRadius: 0,
                pointHoverBorderWidth: 0,
                pointRadius: 0,
                data: this.state.flow,
              }
            ]
          };
        },
        options: chart1_2_options
      },
    };
  }

  
  setBgChartData = name => {
    this.setState({
      bigChartData: name
    });
  };
  // ,{'mode': 'no-cors'}

  componentDidMount() {
    this.interval = setInterval(() => this.getTemperature(), 1000);
    this.interval = setInterval(() => this.getWaterLevel(), 1000);
    this.interval = setInterval(() => this.getFlow(), 1000);
    this.interval = setInterval(() => this.getAlerts(), 1000);
    this.interval = setInterval(() => this.getSignal(), 1000);
    this.interval = setInterval(() => this.getDeviceStatus(), 1000);
    this.interval = setInterval(() => this.getLocation(), 5000);
  }
  componentWillReceiveProps(nextProps) {
    this.setState({
      lat: nextProps.lat,
      long: nextProps.long
    });
  }
  async getWaterLevel() {
    fetch("http://127.0.0.1:5000/waterlevel", { method: "GET" })
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
          // let td2 = new Date("April 1, 2019 21:13:00") - new Date(t1)
          let td2 = new Date() - new Date(t1)

          if (td > 380000 && td2<1209600000) {
            a[i] = {};
            a[i]["x"] = newdate + " " + responseData[index]["TIME"];
            a[i]["y"] = (responseData[index]["WATER LEVEL"]==="HIGH"?1 : 0);
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
            a[i]["y"] = (responseData[index + 1]["WATER LEVEL"]==="HIGH"?1 : 0);
              i = i + 1;
        
          } else if(td2<1209600000)  {
            a[i] = {};
            a[i]["x"] = newdate + " " + responseData[index]["TIME"];
            a[i]["y"] = (responseData[index]["WATER LEVEL"]==="HIGH"?1 : 0);;
            i = i + 1;
            a[i] = {};
            a[i]["x"] = newdate1 + " " + responseData[index + 1]["TIME"];
            a[i]["y"] = (responseData[index + 1]["WATER LEVEL"]==="HIGH"?1 : 0);
              i = i + 1;
        
          }
        }



        this.setState({
          waterlevel: a
        });
        //console.log(this.state.temperature);
      })
      .catch(error => {
        console.error(error);
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
          // let td2 = new Date("April 1, 2019 21:13:00") - new Date(t1)
          let td2 = new Date() - new Date(t1)

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
  async getFlow() {
    fetch("http://127.0.0.1:5000/flowpulse", { method: "GET" })
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
          // let td2 = new Date("April 1, 2019 21:13:00") - new Date(t1)
          let td2 = new Date() - new Date(t1)

          if (td > 1000 && td2<7200000) {
            a[i] = {};
            a[i]["x"] = newdate + " " + responseData[index]["TIME"];
            a[i]["y"] = responseData[index]["FLOW PULSE"];
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
            a[i]["y"] = responseData[index + 1]["FLOW PULSE"];
              i = i + 1;
        
          } else if(td2<1209600000)  {
            a[i] = {};
            a[i]["x"] = newdate + " " + responseData[index]["TIME"];
            a[i]["y"] = responseData[index]["FLOW PULSE"];
            i = i + 1;
            a[i] = {};
            a[i]["x"] = newdate1 + " " + responseData[index + 1]["TIME"];
            a[i]["y"] = responseData[index + 1]["FLOW PULSE"];
              i = i + 1;
        
          }
        }



        this.setState({
          flow: a
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
        let deviceDate = responseData[0]["DATE"];
        deviceDate = deviceDate
          .split("/")
          .reverse()
          .join("-");
        deviceDate = deviceDate+ " " + responseData[0]["TIME"];
        let today = new Date();
        //let currentDate = today.getDate() + '/'+ (today.getMonth()+1) +'/'+ today.getFullYear();
        //let currentTime = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
        let timeDiff = today - new Date(deviceDate)
        //console.log(timeDiff)
        //console.log(currentDateTime - deviceDate)
        if (timeDiff > 380000){
          this.setState({
            deviceStatus:"Device Disconnected -- Last Connected at:" + " " + responseData[0]["DATE"] + " " + responseData[0]["TIME"]
          });
        }
        else{
          this.setState({
            deviceStatus:"Device Connected -- Signal Strength:" + " " + responseData[0]["SIGNAL STRENGTH"] 
          });
        }
      })
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
            <Col lg="3">
              <Card className="card-chart1">
                <CardHeader>
                  <CardTitle tag="h3">
                    {/* <i className="tim-icons icon-bell-55 text-info" /> */}
                     PwC Demo
                    Device
                  </CardTitle>
                </CardHeader>
                <CardBody />
              </Card>
            </Col>
            <Col lg="3">
              <Card className="card-chart1">
                <CardHeader>
                  <CardTitle tag="h3">
                    {/* <i className="tim-icons icon-delivery-fast text-primary" />{" "} */}
                    {/*Number of Alerts: {this.state.numberOfAlerts}*/}
                    Number of Alerts: {this.state.numberOfAlerts}
                  </CardTitle>
                </CardHeader>
                <CardBody />
              </Card>
            </Col>
            <Col lg="6">
              <Card className="card-chart1">
                <CardHeader>
                  {this.state.deviceStatus === "CONNECTED" ? (
                    <CardTitle tag="h3">
                      {/* <i className="tim-icons icon-send text-success" /> */}
                      Signal Strength : {this.state.signalStrength}
                    </CardTitle>
                  ) : (
                    <CardTitle tag="h3">
                      {/* <i className="tim-icons icon-send text-success" /> */}
                        {this.state.deviceStatus}
                    </CardTitle>
                  )}
                </CardHeader>
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

                      </ButtonGroup>
                    </Col>
                  </Row>
                </CardHeader>
                <CardBody>
                  <div className="chart-area" style={{marginRight : '100px !important'}}>
                    <Line
                      data={this.state.chartExample1[this.state.bigChartData]}
                      options={this.state.chartExample1.options}
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
                      style={{ position: "relative", overflow: "hidden", height: "380px" , width: "600px" }}
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
