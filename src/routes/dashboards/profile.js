import React, { Component, Fragment } from "react";
import IntlMessages from "Util/IntlMessages";
import { injectIntl} from 'react-intl';
import {
  Row,
  Card,
  CardBody,
  CardTitle,
  Badge,
  UncontrolledDropdown,
  DropdownItem,
  DropdownToggle,
  DropdownMenu,
  Progress,
  Form,
  FormGroup,
  Button,
  Label,
  Input,
  CustomInput,
  CardHeader,
  CardImg,
  CardSubtitle, CardText , Table,
  Carousel,
  CarouselItem,
  CarouselControl,
  CarouselIndicators,
  CarouselCaption
} from "reactstrap";
import Select from "react-select";
import CustomSelectInput from "Components/CustomSelectInput";
import { NavLink, Link } from "react-router-dom";
import PerfectScrollbar from "react-perfect-scrollbar";
import { Colxx, Separator } from "Components/CustomBootstrap";
import BreadcrumbContainer from "Components/BreadcrumbContainer";
import { CalendarToolbar } from "Components/Calendar/CalendarToolbar";
import { PolarShadow, LineShadow, SmallLineChart } from "Components/Charts";
import {
  visitChartConfig,
  conversionChartConfig,
  lineChartConfig,
  polarChartConfig,
  smallChartData1,
  smallChartData2,
  smallChartData3,
  smallChartData4
} from "Constants/chartConfig";

import BigCalendar from "react-big-calendar";
import moment from "moment";
import ReactTable from "react-table";
import CircularProgressbar from "react-circular-progressbar";
import { Chart } from "react-chartjs-2";
import ReactSiemaCarousel from "Components/ReactSiema/ReactSiemaCarousel";
import Rating from "Components/Rating";
import DataTablePagination from "Components/DataTables/pagination";
import Sortable from "react-sortablejs";

import "chartjs-plugin-datalabels";
import "react-circular-progressbar/dist/styles.css";
import "react-perfect-scrollbar/dist/css/styles.css";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "react-table/react-table.css";

import axios from 'axios'


import { connect } from "react-redux";
import { getProfile } from "Redux/actions";

class Profile extends Component {
  constructor(props) {
    super(props);


    this.state = {
    };
  }

componentDidMount(){
  this.props.getProfile()
}

  render() {
    const {messages} = this.props.intl;
    return (
      <Fragment>
        <Row>
          <Colxx xxs="12">
            <BreadcrumbContainer
              heading={<IntlMessages id="dashboards.profile" />}
              match={this.props.match}
            />
            <Separator className="mb-5" />
          </Colxx>
        </Row>

      {/* <div align="center">
        <h1>{this.props.nama}</h1>
      </div> */}
      <Row>
      <Colxx >
                    <Card className="sm-100">
                      <CardBody>
                        <div className="text-center">
                          
                          <CardImg top src={this.props.gambar}
                              alt="Card image cap" 
                              className="img-thumbnail border-0 rounded-circle mb-4 list-thumbnail" />

                          <NavLink to="/app/ui/cards">
                            {/* <CardSubtitle className="mb-1 text-big">Nama UKM</CardSubtitle> */}
                          </NavLink>
                          <div align="left">
                          <Table hover>
                            {/* <thead>
                              <tr>
                                <th>#</th>
                                <th>First Name</th>
                                <th>Last Name</th>
                                <th>Username</th>
                              </tr>
                            </thead> */}
                            <tbody>
                              <tr>
                                <th scope="row">Nama UKM</th>
                                <td>{this.props.nama}</td>
                              </tr>
                              <tr>
                                <th scope="row">Deskripsi UKM</th>
                                <td>{this.props.deskripsi_ukm}</td>
                              </tr>
                              <tr>
                                <th scope="row">Email</th>
                                <td>{this.props.email}</td>
                              </tr>
                              <tr>
                                <th scope="row">Perguruan Tinggi</th>
                                <td>{this.props.nama_pt}</td>
                              </tr>
                            </tbody>
                          </Table>
                          </div>
                          <Link to={`${this.props.match.url}/edit:${this.props.id}`}>
                          <Button outline size="sm" color="primary">
                        
                            Edit
                          </Button>
                          </Link>
                        </div>
                      </CardBody>
                    </Card>
        </Colxx>
      </Row>

      

        
      </Fragment>
    );
  }
}

const mapStateToProps = ({ adminUkmReducer }) => {
  const {id, nama , deskripsi_ukm , email ,nama_pt, gambar } = adminUkmReducer;
  return {id, nama , deskripsi_ukm , email ,nama_pt, gambar };
};

export default connect(
  mapStateToProps,
  {
    getProfile
  }
)(injectIntl(Profile));