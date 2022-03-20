import Home from "../pages/Home";
import About from "../pages/About";
import Profile from "../pages/Profile";
import Property from "../pages/Property";
import PropertyListing from "../pages/PropertyListing";
import PropertySearch from "../pages/PropertySearch";

export const routes = [
    { path: "/", name: "Home", component: Home, isAuthRequired: false },
    {
        path: "about",
        name: "About",
        component: About,
        isAuthRequired: false,
    },
    {
        path: "property-listing",
        name: "Property listing",
        component: PropertyListing,
        isAuthRequired: true,
    },
    {
        path: "property-search",
        name: "Property search",
        component: PropertySearch,
        isAuthRequired: false,
    },
    {
        path: "profile",
        name: "Profile",
        component: Profile,
        isAuthRequired: true,
    },
    {
        path: "property/:id",
        name: "Property",
        component: Property,
        isAuthRequired: false,
        parent: "property-search",
    },
];

export const routesMap = Object.fromEntries(
    routes.map((route) => [route.path, route])
);
