import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

import defaultDash from './default';
import contentDash from './content';
import analyticsDash from './analytics';
import ecommerceDash from './ecommerce';
import profile from './profile';
import profileEdit from './edit/profileEdit';

const Dashboards = ({ match }) => (
    <div className="dashboard-wrapper">
        <Switch>
            <Redirect exact from={`${match.url}/`} to={`${match.url}/profile`} />
            <Route path={`${match.url}/profile`} exact component={profile} />
            <Route path={`${match.url}/profile/:edit`} component={profileEdit} />
            <Route path={`${match.url}/default`} component={defaultDash} />
            <Route path={`${match.url}/content`} component={contentDash} />
            <Route path={`${match.url}/ecommerce`} component={ecommerceDash} />
            <Route path={`${match.url}/analytics`} component={analyticsDash} />

            <Redirect to="/error" />

        </Switch>
    </div>
);
export default Dashboards;