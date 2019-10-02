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
  CardSubtitle, CardText
} from "reactstrap";
import Select from "react-select";
import CustomSelectInput from "Components/CustomSelectInput";
import { NavLink } from "react-router-dom";
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

      <div align="center">
        <h1>{this.props.nama_ukm}</h1>
      </div>
      <Row>
      <Colxx >
                    <Card className="sm-100">
                      <CardBody>
                        <div className="text-center">
                          <CardImg top src="/assets/img/profile-pic-l.jpg" alt="Card image cap" className="img-thumbnail border-0 rounded-circle mb-4 list-thumbnail" />
                          <NavLink to="/app/ui/cards">
                            {/* <CardSubtitle className="mb-1 text-big">Nama UKM</CardSubtitle> */}
                          </NavLink>
                          <CardText className="text-muted text-big mb-4">
                            {this.props.deskripsi_ukm}
                          </CardText>
                          <Button outline size="sm" color="primary">Edit</Button>
                        </div>
                      </CardBody>
                    </Card>
        </Colxx>
      </Row>

        
      </Fragment>
    );
  }
}

const mapStateToProps = ({ ukmReducer }) => {
  const { profile , nama_ukm, deskripsi_ukm} = ukmReducer;
  return { profile , nama_ukm, deskripsi_ukm};
};

export default connect(
  mapStateToProps,
  {
    getProfile
  }
)(injectIntl(Profile));