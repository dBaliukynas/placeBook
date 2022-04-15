import Home from "../pages/Home";
import About from "../pages/About";
import Profile from "../pages/Profile";
import Property from "../pages/Property";
import PropertyListing from "../pages/PropertyListing";
import PropertySearch from "../pages/PropertySearch";
import AdminPanel from "../pages/AdminPanel";

export const routes = [
    {
        path: "/",
        name: "Home",
        component: Home,
        isAuthRequired: false,
    },
    {
        path: "about",
        name: "About",
        component: About,
    },
    {
        path: "property-listing",
        name: "Property listing",
        component: () => PropertyListing(false),
        isAuthRequired: true,
    },
    {
        path: "property-search",
        name: "Property search",
        component: PropertySearch,
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
        parent: "property-search",
    },
    {
        path: "property/:id/edit",
        name: "Edit",
        component: () => PropertyListing(true),
        parent: "property/:id",
    },
    {
        path: "admin-panel",
        name: "Admin Panel",
        component: AdminPanel,
        isAuthRequired: true,
        roleRequired: "admin",
    },
];

export const routesMap = Object.fromEntries(
    routes.map((route) => [route.path, route])
);
