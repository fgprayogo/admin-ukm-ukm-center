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
  CardImg, Table,
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
import { getMahasiswaProfile , postPendaftaranUkm , updatePendaftaranMahasiswa, updatePendaftaranMahasasiswaDitolak , clearFormPendaftaran} from "Redux/actions";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';


class ProfileMahasiswa extends Component {
  constructor(props) {
    super(props);


    this.state = {
      id: this.props.match.params.id,
      modal: false,
      ukm_id: this.props.match.params.id,
      pendaftaran_id: this.props.location.state,
      is_anggota:null
    };
    console.log(this.props)
    
    this.toggle = this.toggle.bind(this)
    this.handleDaftar = this.handleDaftar.bind(this)
    this.handleTerima = this.handleTerima.bind(this)
    this.handleTolak = this.handleTolak.bind(this)
    this.goBack = this.goBack.bind(this)
  }
  toggle() {
    this.setState(prevState => ({
      modal: !prevState.modal
    }));
  }

handleDaftar(){
    this.props.postPendaftaranUkm(this.state , this.props.history)
  }
handleTerima(){
    this.setState({is_anggota:1})
    this.props.updatePendaftaranMahasiswa({pendaftaran_id: this.props.location.state , is_anggota:1} , this.props.history)
}
handleTolak(){
    this.setState({is_anggota:0})
    this.props.updatePendaftaranMahasasiswaDitolak({pendaftaran_id: this.props.location.state , is_anggota:0} , this.props.history)
}
componentDidMount(){
  this.props.getMahasiswaProfile(this.state)
  // this.props.clearFormPendaftaran()
  
}
componentDidUpdate(){
  // this.props.getMahasiswa(this.state)
  console.log(this.props)
}
goBack(){
  this.props.history.goBack()
}
  render() {
    const {messages} = this.props.intl;
    return (
      <Fragment>
        <Row>
          <Colxx xxs="12">
            <h1>Profile UKM</h1>
            <BreadcrumbContainer
              // heading={<IntlMessages id="dashboards.profile" />}
              match={this.props.match}
            />
            <Separator className="mb-5" />
          </Colxx>
        </Row>

      {/* <Link to={this.goBack()}>   */}
        <h1><i className="iconsmind-Left-4" onClick={this.goBack}/></h1>
      {/* </Link> */}
      
 
      <Row>
      <Colxx xxs="12">
                <div align="center">
                {/* <CardTitle className="mb-4">{this.props.nama}</CardTitle> */}
                </div>
                <Card className="mb-4">
                      <CardBody>
                        <div className="text-center">
                          <CardImg top src={this.props.gambar} alt="Card image cap" className="img-thumbnail border-0 rounded-circle mb-4 list-thumbnail" />
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
                                <th scope="row">Nama</th>
                                <td>{this.props.nama}</td>
                              </tr>
                              <tr>
                                <th scope="row">NIM</th>
                                <td>{this.props.nim}</td>
                              </tr>
                              <tr>
                                <th scope="row">Email</th>
                                <td>{this.props.email}</td>
                              </tr>
                              <tr>
                                <th scope="row">Perguruan Tinggi</th>
                                <td>{this.props.nama_pt}</td>
                              </tr>
                              <tr>
                                <th scope="row">Fakultas</th>
                                <td>{this.props.nama_fakultas}</td>
                              </tr>
                              <tr>
                                <th scope="row">Program Studi</th>
                                <td>{this.props.nama_prodi}</td>
                              </tr>
                            </tbody>
                          </Table>
                          </div>
                          <Button outline size="sm" color="primary" onClick={this.toggle}>Proses</Button>
                        </div>
                      </CardBody>
                </Card>
        </Colxx>
      </Row>

      <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
          <ModalHeader toggle={this.toggle}>WARNING!</ModalHeader>
          <ModalBody>
            Tentukan apakah <b>{this.props.nama}</b> akan menjadi anggota baru ukm Anda? 
            <br/>
            <br/>
            <br/>
            {/* <a><font color="red"><b>{this.props.pen.msg}</b></font></a> */}
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={this.handleTerima}>Terima</Button>{' '}
            <Button color="danger" onClick={this.handleTolak}>Tolak</Button>
            {/* <Button color="secondary" onClick={this.toggle}>Cancel</Button>{' '} */}

          </ModalFooter>
        </Modal>


        
      </Fragment>
    );
  }
}

const mapStateToProps = ({ ukmReducer , pendaftaranReducer }) => {
    const { mahasiswa_id, nama, nim, email, gambar, pt_id, fakultas_id, prodi_id , nama_pt , nama_fakultas , nama_prodi} = pendaftaranReducer
    return { mahasiswa_id, nama, nim, email, gambar, pt_id, fakultas_id, prodi_id , nama_pt , nama_fakultas , nama_prodi};
  };

export default connect(
  mapStateToProps,
  {
    getMahasiswaProfile,
    postPendaftaranUkm,
    updatePendaftaranMahasiswa,
    clearFormPendaftaran,
    updatePendaftaranMahasasiswaDitolak
  }
)(injectIntl(mouseTrap(ProfileMahasiswa)));