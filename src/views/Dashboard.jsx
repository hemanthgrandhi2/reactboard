import React from "react";
import "./Dashboard.css";
import classNames from "classnames";
// react plugin used to create charts
import { Line } from "react-chartjs-2";
//react plugin for google maps
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

//chart options for the chart
let chart0_options = {
  maintainAspectRatio: false,
  tooltips: {
    enabled: false
},
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
          unit : 'second',
          displayFormats: {
              second: 'hh:mm:ss a',
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

let chart1_options = {
  maintainAspectRatio: false,
  tooltips: {
    enabled: false
},
  legend: {
    display: false
  },

  elements: {
    line: {
    tension: 0
    }
    },
    animation: false,

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
          precision: 0,
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
          unit : 'second',
          displayFormats: {
              second: 'hh:mm:ss a',
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

let chart2_options = {
  maintainAspectRatio: false,
  tooltips: {
    enabled: false
},
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
            unit : 'second',
            displayFormats: {
                second: 'hh:mm:ss a',
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

//Dashboard component
class Dashboard extends React.Component {
  constructor(props) {
    super(props);

    //binding the functions
    this.getAlerts = this.getAlerts.bind(this);
    this.getDeviceStatus = this.getDeviceStatus.bind(this);
    this.getTemperature = this.getTemperature.bind(this);
    this.getSignal = this.getSignal.bind(this);
    this.getLocation = this.getLocation.bind(this);
    this.getWaterLevel = this.getWaterLevel.bind(this);
    this.getFlow = this.getFlow.bind(this)

    this.state = {
      bigChartData: 0,
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
      chartExample1 : [{
        //data for the temperature
        0: canvas => {
          let ctx = canvas.getContext("2d");
          let gradientStroke = ctx.createLinearGradient(0, 230, 0, 50);
          gradientStroke.addColorStop(1, "rgba(29,140,248,0.2)");
          gradientStroke.addColorStop(0.4, "rgba(29,140,248,0.0)");
          gradientStroke.addColorStop(0, "rgba(29,140,248,0)"); //blue colors
          let dateObj = new Date();
          return {

            labels : [ dateObj.setMinutes(dateObj.getMinutes() - 0),
              dateObj.setMinutes(dateObj.getMinutes() - 1),
              dateObj.setMinutes(dateObj.getMinutes() - 1),
              dateObj.setMinutes(dateObj.getMinutes() - 1),

              dateObj.setMinutes(dateObj.getMinutes() - 1),

              dateObj.setMinutes(dateObj.getMinutes() - 1),
              dateObj.setMinutes(dateObj.getMinutes() - 1),
              dateObj.setMinutes(dateObj.getMinutes() - 1),
              dateObj.setMinutes(dateObj.getMinutes() - 1),

              dateObj.setMinutes(dateObj.getMinutes() - 1),

              dateObj.setMinutes(dateObj.getMinutes() - 1),

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
                // data: [],
              }
            ],
          };
        },
        //data for the water level

        options: chart0_options
      },
      {
        
        1: canvas => {
          let ctx = canvas.getContext("2d");
          let gradientStroke = ctx.createLinearGradient(0, 230, 0, 50);
          gradientStroke.addColorStop(1, "rgba(29,140,248,0.2)");
          gradientStroke.addColorStop(0.4, "rgba(29,140,248,0.0)");
          gradientStroke.addColorStop(0, "rgba(29,140,248,0)"); //blue colors

          let dateObj = new Date();
          return {
            labels : [ dateObj.setMinutes(dateObj.getMinutes() - 0),
              dateObj.setMinutes(dateObj.getMinutes() - 1),
              dateObj.setMinutes(dateObj.getMinutes() - 1),
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
                pointRadius: 5,
                data: this.state.waterlevel,
                showLine: false,
              }
            ],

          };
        },
        options: chart1_options
      },
      {
        //data for the flow pulse
        2: canvas => {
          let ctx = canvas.getContext("2d");
          let gradientStroke = ctx.createLinearGradient(0, 230, 0, 50);
          gradientStroke.addColorStop(1, "rgba(29,140,248,0.2)");
          gradientStroke.addColorStop(0.4, "rgba(29,140,248,0.0)");
          gradientStroke.addColorStop(0, "rgba(29,140,248,0)"); //blue colors
          // let td = moment('2019-04-01')
          let date = []
          date[0]  = new Date();
          date[1] = new Date(date[0].getMinutes() - 1);
          date[2] = new Date(date[0].getMinutes() - 2);
          date[3] = new Date(date[0].getMinutes() - 3);
          date[4] = new Date(date[0].getMinutes() - 4);
          // date[5] = new Date(date[0].getDate() - 5);
          // date[6] = new Date(date[0].getDate() - 6);
          // date[7] = new Date(date[0].getDate() - 7);
          // date[8] = new Date(date[0].getDate() - 8);
          // date[9] = new Date(date[0].getDate() - 9);
          let dateObj = new Date();
          return {
            labels : [dateObj.setMinutes(dateObj.getMinutes() - 0),
                      dateObj.setMinutes(dateObj.getMinutes() - 1),
                      dateObj.setMinutes(dateObj.getMinutes() - 1),
                      // dateObj.setMinutes(dateObj.getMinutes() - 1),
                      // dateObj.setMinutes(dateObj.getMinutes() - 1),
                      // dateObj.setDate(dateObj.getDate() - 1),
                      // dateObj.setDate(dateObj.getDate() - 1),
                      // dateObj.setDate(dateObj.getDate() - 1),
                      // dateObj.setDate(dateObj.getDate() - 1),
                      // dateObj.setDate(dateObj.getDate() - 1),
                      // dateObj.setDate(dateObj.getDate() - 1),
                      // dateObj.setDate(dateObj.getDate() - 1),
                      // dateObj.setDate(dateObj.getDate() - 1),
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
                // data : []
              }
            ]
          };
        },
        options: chart2_options
      },
    ],
      
    };
  }

  //setting the chart data to the state
  setBgChartData = name => {
    this.setState({
      bigChartData: name
    });
  };
  // ,{'mode': 'no-cors'}

  componentDidMount() {
    //setting intervals for each API request
    this.interval = setInterval(() => this.getTemperature(), 1000);
    this.interval = setInterval(() => this.getWaterLevel(), 1000);
    this.interval = setInterval(() => this.getFlow(), 1000);
    this.interval = setInterval(() => this.getAlerts(), 1000);
    this.interval = setInterval(() => this.getSignal(), 1000);
    this.interval = setInterval(() => this.getDeviceStatus(), 1000);
    this.interval = setInterval(() => this.getLocation(), 1000);
  }
  componentWillReceiveProps(nextProps) {
    this.setState({
      lat: nextProps.lat,
      long: nextProps.long
    });
  }

  //fetches water level data from the API and sets state
  async getWaterLevel() {
    fetch("http://127.0.0.1:5000/waterlevel", { method: "GET" })
      .then(response => response.json())
      .then(responseData => {
        let a = [];
        let i = 0;
        for (let index = 0; index < responseData.length; index++) {
          let x = responseData[index]["DATE"];
          //converting recieved data into UTC format to find difference
          let newdate = x
            .split("/")
            .reverse()
            .join("-");
          let t1 = newdate + " " + responseData[index]["TIME"];
          // let y = responseData[index + 1]["DATE"];
          // let newdate1 = y
          //   .split("/")
          //   .reverse()
          //   .join("-");
          // let t2 = newdate1 + " " + responseData[index + 1]["TIME"];
          // let td = new Date(t2) - new Date(t1);
          // let td2 = new Date("April 1, 2019 21:13:00") - new Date(t1)
          let td2 = new Date() - new Date(t1)

          //if time within 5 minutes and 2 weeks, then display data item
          // if (td > 380000 && td2<1209600000) {
          //   a[i] = {};
          //   a[i]["x"] = newdate + " " + responseData[index]["TIME"];
          //   a[i]["y"] = (responseData[index]["WATER LEVEL"]==="HIGH"?1 : 0);
          //   i = i + 1;
          //   a[i] = {};
          //   a[i]["x"] = newdate + " " + responseData[index]["TIME"];
          //   a[i]["y"] = 0;
          //   i = i + 1;
          //   a[i] = {};
          //   a[i]["x"] = newdate1 + " " + responseData[index + 1]["TIME"];
          //   a[i]["y"] = 0;
          //   i = i + 1;
          //   a[i] = {};
          //   a[i]["x"] = newdate1 + " " + responseData[index + 1]["TIME"];
          //   a[i]["y"] = (responseData[index + 1]["WATER LEVEL"]==="HIGH"?1 : 0);
          //     i = i + 1;
        
          // }
          if(td2<120000)  {
            a[i] = {};
            a[i]["x"] = newdate + " " + responseData[index]["TIME"];
            a[i]["y"] = (responseData[index]["WATER LEVEL"]==="HIGH"?1 : 0);
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

  //get temperature
  async getTemperature() {
    fetch("http://127.0.0.1:5000/temperature", { method: "GET" })
      .then(response => response.json())
      .then(responseData => {
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

          // if (td > 380000 && td2<1209600000) {
          //   a[i] = {};
          //   a[i]["x"] = newdate + " " + responseData[index]["TIME"];
          //   a[i]["y"] = responseData[index]["TEMPERATURE"];
          //   i = i + 1;
          //   a[i] = {};
          //   a[i]["x"] = newdate + " " + responseData[index]["TIME"];
          //   a[i]["y"] = 0;
          //   i = i + 1;
          //   a[i] = {};
          //   a[i]["x"] = newdate1 + " " + responseData[index + 1]["TIME"];
          //   a[i]["y"] = 0;
          //   i = i + 1;
          //   a[i] = {};
          //   a[i]["x"] = newdate1 + " " + responseData[index + 1]["TIME"];
          //   a[i]["y"] = responseData[index + 1]["TEMPERATURE"];
          //     i = i + 1;
        
          // } 
          // console.log(t1)
          // console.log(td2)
          if(td2<600000)  {
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
        // console.log(this.state.temperature);
      })
      .catch(error => {
        console.error(error);
      });
  }

  //get the flow pulse
  async getFlow() {
    fetch("http://127.0.0.1:5000/flowpulse", { method: "GET" })
      .then(response => response.json())
      .then(responseData => {
        let arr = responseData.map(obj=> ({ ...obj, datetime: obj["DATE"] + " "+ obj["TIME"] }))
        let uniq = {}
        responseData = arr.filter(obj => !uniq[obj.datetime] && (uniq[obj.datetime] = true));
        let a = [];
        let i = 0;
        // newdate = date.split("/").reverse().join("-");
        let cummulative_counter = 0;
        console.log(responseData);
        for (let index = 0; index < responseData.length; index++) {
          let x = responseData[index]["DATE"];
          let newdate = x
            .split("/")
            .reverse()
            .join("-");
          let t1 = newdate + " " + responseData[index]["TIME"];
          // let y = responseData[index + 1]["DATE"];
          // let newdate1 = y
          //   .split("/")
          //   .reverse()
          //   .join("-");
          // let t2 = newdate1 + " " + responseData[index + 1]["TIME"];
          // let td = new Date(t2) - new Date(t1);
          // let td2 = new Date("April 1, 2019 21:13:00") - new Date(t1)
          let td2 = new Date() - new Date(t1);
          let dateNow = new Date()

          let timeDiffFromMidnight = new Date(t1) - dateNow.setHours(0,0,0,0)

          // let td2 = new Date() - new Date(t1)

          if (timeDiffFromMidnight>0 && td2>=120000){
            cummulative_counter = cummulative_counter + parseFloat(responseData[index]["FLOW PULSE"])

          }
          if ( td2<120000) {
            a[i] = {};
            a[i]["x"] = newdate + " " + responseData[index]["TIME"];
            cummulative_counter = cummulative_counter + parseFloat(responseData[index]["FLOW PULSE"])
            a[i]["y"] = cummulative_counter
            i = i +1 ;
          } 
        }
        console.log(a);


        this.setState({
          flow: a
        });
      })
      .catch(error => {
        console.error(error);
      });
  }

  //get number of alerts
  async getAlerts() {
    fetch("http://127.0.0.1:5000/error", { method: "GET" })
      .then(response => response.json())
      .then(responseData => {
        let arr = responseData.map(obj=> ({ ...obj, datetime: obj["DATE"] + " "+ obj["TIME"] }))
        let uniq = {}
        // let arrFiltered = arr.filter(obj => !uniq[obj.datetime] && (uniq[obj.datetime] = true));
        responseData = arr.filter(obj => !uniq[obj.datetime] && (uniq[obj.datetime] = true));

        //set your data here
        // console.log(responseData)
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

  //get signal strength
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

  //displays device status and last connected
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
        let timeDiff = today - new Date(deviceDate)
        //if device has been inactive for more than 5mins, then say device is disconnected and show last connected
        if (timeDiff > 380000){
          this.setState({
            deviceStatus:"Device Disconnected -- Last Connected at:" + " " + responseData[0]["DATE"] + " " + responseData[0]["TIME"]
          });
        }
        else{
          this.setState({
            deviceStatus:"Device Connected -- Signal Strength:" + " " + this.state.signalStrength 
          });
        }
      })
      .catch(error => {
        console.error(error);
      });
  }

  //get location data
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
                            active: this.state.bigChartData === 0
                          })}
                          color="info"
                          id="0"
                          size="sm"
                          onClick={() => this.setBgChartData(0)}
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
                            active: this.state.bigChartData === 1
                          })}
                          onClick={() => this.setBgChartData(1)}
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
                            active: this.state.bigChartData === 2

                          })}
                          onClick={() => this.setBgChartData(2)}
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
                    {/* {console.log(this.state.bigChartData ==="data1" || this.state.bigChartData ==="data2")} */}
                                      <Line
                                      data={this.state.chartExample1[this.state.bigChartData][this.state.bigChartData]}
                                      options={this.state.chartExample1[this.state.bigChartData].options}
                
                                      // options={(this.state.bigChartData === "data1" || "data2"? this.state.chartExample1.options:this.state.chartExample2.options)}
                                    />  
                    

                    {/* <Line
                    data={this.state.chartExample2[this.state.bigChartData]}
                    options={this.state.chartExample2.options}

                    // options={(this.state.bigChartData === "data1" || "data2"? this.state.chartExample1.options:this.state.chartExample2.options)}
                  />  
                  } */}
                    {/* // <Line
                    //   data={(this.state.bigChartData === "data1" || "data2"? this.state.chartExample1[this.state.bigChartData] : this.state.chartExample2[this.state.bigChartData])}
                    //   // options={this.chart1_2_options}

                    //   options={(this.state.bigChartData === "data1" || "data2"? this.state.chartExample1.options:this.state.chartExample2.options)}
                    // /> */}
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
