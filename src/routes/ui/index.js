import React, { Component } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

import alerts from './alerts';
import badges from './badges';
import buttons from './buttons';
import cards from './cards';
import carousel from './carousel';
import charts from './charts';
import collapse from './collapse';
import dropdowns from './dropdowns';
import editors from './editors';
import forms from './forms';
import formComponents from './form-components';
import icons from './icons';
import inputGroups from './input-groups';
import jumbotron from './jumbotron';
import modal from './modal';
import navigation from './navigation';
import popoverTooltip from './popover-tooltip';
import sortable from './sortable';
import tables from './tables';
import maps from './maps';
import anggota from './anggota'
import alumni from './alumni'

import profileMahasiswa from "./edit/profileMahasiswa";


export default class Ui extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        const { match } = this.props;

        return (
            <Switch>
                <Redirect exact from={`${match.url}/`} to={`${match.url}/anggota`} />
                <Route path={`${match.url}/anggota`} exact component={anggota} />
                <Route path={`${match.url}/anggota/:id`} component={profileMahasiswa} />
                <Route path={`${match.url}/alumni`} exact component={alumni} />
                <Route path={`${match.url}/alumni/:id`} component={profileMahasiswa} />
                <Route path={`${match.url}/alerts`} component={alerts} />
                <Route path={`${match.url}/badges`} component={badges} />
                <Route path={`${match.url}/buttons`} component={buttons} />
                <Route path={`${match.url}/cards`} component={cards} />
                <Route path={`${match.url}/carousel`} component={carousel} />
                <Route path={`${match.url}/charts`} component={charts} />
                <Route path={`${match.url}/collapse`} component={collapse} />
                <Route path={`${match.url}/dropdowns`} component={dropdowns} />
                <Route path={`${match.url}/editors`} component={editors} />
                <Route path={`${match.url}/forms`} component={forms} />
                <Route path={`${match.url}/form-components`} component={formComponents} />
                <Route path={`${match.url}/icons`} component={icons} />
                <Route path={`${match.url}/input-groups`} component={inputGroups} />
                <Route path={`${match.url}/jumbotron`} component={jumbotron} />
                <Route path={`${match.url}/modal`} component={modal} />
                <Route path={`${match.url}/navigation`} component={navigation} />
                <Route path={`${match.url}/popover-tooltip`} component={popoverTooltip} />
                <Route path={`${match.url}/sortable`} component={sortable} />
                <Route path={`${match.url}/tables`} component={tables} />
                <Route path={`${match.url}/maps`} component={maps} />
                <Redirect to="/error" />

            </Switch>
        )
    };
}