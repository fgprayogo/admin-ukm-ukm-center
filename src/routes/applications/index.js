import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";

import todo from "./todo";
import surveyList from "./survey";
import surveyDetail from "./survey-detail";
import chat from "./chat";
import aktif from './aktif'
import ditolak from './ditolak'
import diterima from './diterima'
import riwayat from './riwayat'

const Applications = ({ match }) => (
  <div className="dashboard-wrapper">
    <Switch>
      <Redirect exact from={`${match.url}/`} to={`${match.url}/riwayat`} />
      <Route path={`${match.url}/riwayat`} component={riwayat} />
      <Route path={`${match.url}/aktif`} component={aktif} />
      <Route path={`${match.url}/diterima`} component={diterima} />
      <Route path={`${match.url}/ditolak`} component={ditolak} />
      <Route path={`${match.url}/todo`} component={todo} />
      <Route
        path={`${match.url}/survey/:surveyid`}
        component={surveyDetail}
        isExact
      />
      <Route path={`${match.url}/survey`} component={surveyList} isExact />
      <Route path={`${match.url}/chat`} component={chat} />
      <Redirect to="/error" />
    </Switch>
  </div>
);

export default Applications;
