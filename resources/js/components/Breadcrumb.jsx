import { Link, matchPath } from "react-router-dom";
import { routes, routesMap } from "../utils/routes";

const Breadcrumb = (props) => {
    const getCrumbs = () => {
        const leaf = routes.find((route) =>
            matchPath({ path: route.path }, props.location.pathname)
        );
        let crumbs = [];
        
        if (!leaf) {
            return undefined;
        }

        let parent = leaf.parent;
        crumbs.push(leaf);
        if (parent) {
            crumbs.push(routesMap[parent]);
        }

        while (parent) {
            parent = routesMap[parent]?.parent;
            if (parent) {
                crumbs.push(routesMap[parent]);
            }
        }
        return crumbs.reverse();
    };

    const crumbs = getCrumbs();

    return crumbs ? (
        <nav className="breadcrumb breadcrumb-property" aria-label="breadcrumb">
            <ol className="breadcrumb">
                <li className="breadcrumb-item">
                    <Link to="/">Home</Link>
                </li>
                {crumbs.map((route, index) => {
                    return index != crumbs.length - 1 ? (
                        <li key={index} className="breadcrumb-item">
                            <Link to={`/${route.path}`}>{route.name}</Link>
                        </li>
                    ) : (
                        <li
                            key={index}
                            className="breadcrumb-item active"
                            aria-current="page"
                        >
                            {route.name}
                        </li>
                    );
                })}
            </ol>
        </nav>
    ) : (
        <></>
    );
};

export default Breadcrumb;
