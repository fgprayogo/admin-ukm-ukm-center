import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

import dataList from './data-list';
import thumbList from './thumb-list';
import imageList from './image-list';
import search from './search';
import details from './details';
import invoice from './invoice';
import mailing from './mailing';

import pendaftaran from './pendaftaran'
import anggota from './anggota'
import alumni from './alumni'
import ditolak from './ditolak'
import profileMahasiswa from './edit/profileMahasiswa'
import semuaUkm from './semua_ukm'
import pendaftaranDibuka from './pendaftaran_dibuka'
import pendataranDitutup from './pendaftaran_ditutup'

import profileUkm from './edit/profileUkm'

const Pages = ({ match }) => (
    <div className="dashboard-wrapper">
        <Switch>
            <Redirect exact from={`${match.url}/`} to={`${match.url}/semua_ukm`} />
            <Route path={`${match.url}/pendaftaran`} exact component={pendaftaran} /> 
            <Route path={`${match.url}/pendaftaran/:id`} component={profileMahasiswa} />             
            <Route path={`${match.url}/semua_ukm`} exact component={semuaUkm} />            
            <Route path={`${match.url}/semua_ukm/:id`} component={profileUkm} />            
            <Route path={`${match.url}/pendaftaran_dibuka`} component={pendaftaranDibuka} />            
            <Route path={`${match.url}/pendaftaran_ditutup`} component={pendataranDitutup} />            
            <Route path={`${match.url}/anggota`} component={anggota} />            
            <Route path={`${match.url}/alumni`} component={alumni} />            
            <Route path={`${match.url}/ditolak`} component={ditolak} />            
            <Route path={`${match.url}/data-list`} component={dataList} />            
            <Route path={`${match.url}/thumb-list`} component={thumbList} />            
            <Route path={`${match.url}/image-list`} component={imageList} />            
            <Route path={`${match.url}/details`} component={details} />            
            <Route path={`${match.url}/search`} component={search} />  
            <Route path={`${match.url}/invoice`} component={invoice} />  
            <Route path={`${match.url}/mailing`} component={mailing} />  
            <Redirect to="/error" />
          
        </Switch>
    </div>
);

export default Pages;