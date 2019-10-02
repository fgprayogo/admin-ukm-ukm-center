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
import mouseTrap from "react-mousetrap";
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
import { getPendaftaran , getMahasiswa} from "Redux/actions";


class ProfileMahasiswa extends Component {
  constructor(props) {
    super(props);


    this.state = {
      id: this.props.match.params.id
    };
    // console.log(this.props.nama)
  }

componentDidMount(){
  // this.props.getPendaftaran()
  this.props.getMahasiswa(this.state)
  
}
componentDidUpdate(){
  this.props.getMahasiswa(this.state)
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
        <h1>{this.props.id}</h1>
      </div>
      <h1>
          {this.props.nama}
      </h1>
      <hr/>
      <Button>Terima</Button> <Button>Tolak</Button>

        
      </Fragment>
    );
  }
}

const mapStateToProps = ({ authUser, pendaftaranReducer , mahasiswaReducer}) => {
    const { user, loading, profile} = authUser;
    const { pendaftaran } = pendaftaranReducer;
    const { nama, id} = mahasiswaReducer;
    return { user, loading, pendaftaran, profile , nama , id};
  };

export default connect(
  mapStateToProps,
  {
    getPendaftaran,
    getMahasiswa
  }
)(injectIntl(mouseTrap(ProfileMahasiswa)));