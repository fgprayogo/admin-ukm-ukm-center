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


import { Link } from "react-router-dom";

import { connect } from "react-redux";
import { getUkmProfile , postPendaftaranUkm} from "Redux/actions";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';


class ProfileUkm extends Component {
  constructor(props) {
    super(props);


    this.state = {
      id: this.props.match.params.id,
      modal: false,
      ukm_id: this.props.match.params.id
    };
    this.toggle = this.toggle.bind(this)
    this.handleDaftar = this.handleDaftar.bind(this)
  }
  toggle() {
    this.setState(prevState => ({
      modal: !prevState.modal
    }));
  }

handleDaftar(){
    this.props.postPendaftaranUkm(this.state , this.props.history)
  }
componentDidMount(){
  this.props.getUkmProfile(this.state)
  
}
componentDidUpdate(){
  // this.props.getMahasiswa(this.state)
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

      <Link to="/app/pages/semua_ukm">  
        <h1><i className="iconsmind-Left-4" /></h1>
      </Link>
      
 
      <Row>
      <Colxx xxs="12">
                <div align="center">
                <CardTitle className="mb-4">UKM {this.props.nama_ukm}</CardTitle>
                </div>
                <Card className="mb-4">
                      <CardBody>
                        <div className="text-center">
                          <CardImg top src="/assets/img/profile-pic-l.jpg" alt="Card image cap" className="img-thumbnail border-0 rounded-circle mb-4 list-thumbnail" />
                          <NavLink to="/app/ui/cards">
                            <CardSubtitle className="mb-1">Deskripsi UKM</CardSubtitle>
                          </NavLink>
                          <CardText className="text-muted text-small mb-4">{this.props.profile_ukm}</CardText>
                          <Button outline size="sm" color="primary" onClick={this.toggle}>Begabung!</Button>
                        </div>
                      </CardBody>
                </Card>
        </Colxx>
      </Row>

      <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
          <ModalHeader toggle={this.toggle}>WARNING!</ModalHeader>
          <ModalBody>
            Apakah anda yakin ingin bergabung dengan {this.props.nama_ukm} ?
          </ModalBody>
          <ModalFooter>
            <Button color="secondary" onClick={this.toggle}>Cancel</Button>{' '}
            <Button color="primary" onClick={this.handleDaftar}>Gabung!</Button>
          </ModalFooter>
        </Modal>


        
      </Fragment>
    );
  }
}

const mapStateToProps = ({ ukmReducer }) => {
    const { id_ukm, nama_ukm, profile_ukm} = ukmReducer;
    return { id_ukm, nama_ukm, profile_ukm};
  };

export default connect(
  mapStateToProps,
  {
    getUkmProfile,
    postPendaftaranUkm
  }
)(injectIntl(mouseTrap(ProfileUkm)));