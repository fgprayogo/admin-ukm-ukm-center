import React, { Component, Fragment } from 'react'
import { Row, Card, CardBody, CardTitle } from 'reactstrap';
import IntlMessages from 'Util/IntlMessages';
import { Colxx, Separator } from 'Components/CustomBootstrap'
import BreadcrumbContainer from 'Components/BreadcrumbContainer'
import { YMaps, Map, Placemark } from 'react-yandex-maps';
import {
    withScriptjs,
    withGoogleMap,
    GoogleMap,
    Marker,
} from "react-google-maps";


const MapWithAMarker = withScriptjs(withGoogleMap(props =>
    <GoogleMap
        defaultZoom={8}
        defaultCenter={{ lat: -34.397, lng: 150.644 }}>
        <Marker
            position={{ lat: -34.397, lng: 150.644 }}
        />
    </GoogleMap>
));


export default class MapsUi extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Fragment>
                <Row>
                    <Colxx xxs="12">
                        <BreadcrumbContainer heading={<IntlMessages id="menu.maps" />} match={this.props.match} />
                        <Separator className="mb-5" />
                    </Colxx>
                </Row>
                <Row>
                    <Colxx xxs="12">
                        <Card className="mb-4">
                            <CardBody>
                                <CardTitle><IntlMessages id="maps.google" /></CardTitle>
                                <MapWithAMarker
                                    googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyCO8MfadmlotuuHC8wmjwL_46I5QAMIiRU&v=3.exp&libraries=geometry,drawing,places"
                                    loadingElement={<div className="map-item" />}
                                    containerElement={<div className="map-item" />}
                                    mapElement={<div className="map-item" />}
                                />
                            </CardBody>
                        </Card>

                        <Card className="mb-4">
                            <CardBody>
                                <CardTitle><IntlMessages id="maps.yandex" /></CardTitle>
                                <div className="map-item">
                                    <YMaps query={{ lang: 'en-US' }}>
                                        <Map className="map-item" defaultState={{ center: [-34.397, 150.644], zoom: 9 }} >
                                            <Placemark defaultGeometry={[-34.397, 150.644]} />
                                        </Map>
                                    </YMaps>
                                </div>

                            </CardBody>
                        </Card>
                    </Colxx>
                </Row>
            </Fragment>
        )
    }
}
