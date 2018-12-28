import React, { Component } from 'react';

import { withRouter, Link, Route} from 'react-router-dom';
import { matchRoutes } from 'react-router-config'

import Rotas from '../../Rotas';


const capitalizeFirstLetter = (text) => {
   return text.charAt(0).toUpperCase() + text.slice(1);
}

const findRouteName = (rotas, url) => {

    const objs = matchRoutes(rotas,url)
    const matches = objs.filter(obj => {
        return obj.match.isExact
    });

    return matches.length === 1 ? matches[0].route.name : capitalizeFirstLetter(url.replace("/",""));
};

const getPaths = (pathname) => {
    const paths = [];

    if (pathname === '/') return paths;

    pathname.split('/').reduce((prev, curr, index) => {
        const currPath = `${prev}/${curr}`;
        paths.push(currPath);
        return currPath;
    });

    return paths;
};

const BreadcrumbsItem = ({ match }) => {

    const routeName = findRouteName(Rotas, match.url);

    const tem_link = Rotas.filter(obj => {
        return obj.path === match.url
    });

    if (routeName) {

        return (
            match.isExact ?
            (
                <li className="active">{routeName}</li>
            ) :
            (
            (tem_link.length) ?
                <li>
                    <Link to={match.url || ''}>
                    {routeName}
                    </Link>
                </li>
                :
                <li>{routeName}</li>
            )
        );
    }
    return null;
};


class Breadcrumb extends Component {
   
    render() {

        const { location } = this.props
        const paths = getPaths(location.pathname);

        return (

            <nav aria-label="breadcrumb">
                <ol className="breadcrumb">
                    <b>Você está em:&nbsp;</b>
                    {paths.map((p, i) => <Route key={i} path={p} component={BreadcrumbsItem} />)}
                </ol>
            </nav>
        )
    }
    
}

export default withRouter(Breadcrumb);