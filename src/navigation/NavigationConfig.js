// import Home from '../screens/common/Home/Home.js';
import Login from '../screens/common/Login/Login.js';
import Signup from '../screens/common/Signup/Signup.js';
// import NotFound from '../screens/common/NotFound/NotFound.js';
// import PrivacyPage from '../screens/common/Privacy/PrivacyPage.js';
// import SellerProfile from '../screens/common/Profile/SellerProfile.js';
// import AddTruckPage from '../screens/seller/AddTruck/AddTruckPage.js';
// import Plans from '../screens/seller/Plans/Plans.js';
// import SuccessPage from '../screens/seller/Plans/components/ConfirmModal.js';
// import DetailPage from '../screens/common/Detail/DetailPage.js';
// import FilterPage from '../screens/common/Filter/FilterPage.js';
// import Listing from '../screens/seller/Listing/Listing.js';
// import ContactUs from '../screens/common/ContactUs/ContactUs.js';
// import Inventory from '../screens/common/Inventory/Inventory.js';

const routes = [
    //seller
    // { name: "Listing", component: Listing, protected: true, allowedRoles: ['seller'], authRedirect: false, showHeader: true, showFooter: true },
    // { name: "AddTruck", component: AddTruckPage, protected: true, authRedirect: false, showHeader: true, showFooter: true },
    // { name: "EditTruck", component: AddTruckPage, protected: true, authRedirect: false, showHeader: true, showFooter: true },
    // { name: "Profile", component: SellerProfile, protected: true, authRedirect: false, showHeader: true, showFooter: true },
    // { name: "Success", component: SuccessPage, protected: true, authRedirect: false, showHeader: true, showFooter: true },
    // { name: "Plans", component: Plans, protected: true, authRedirect: false, showHeader: true, showFooter: true },

    //common
    // { name: "Home", component: Home, protected: false, authRedirect: false, showHeader: true, showFooter: true },
    { name: "Login", component: Login, protected: false, allowedRoles: [], authRedirect: true, showHeader: true, showFooter: true },
    { name: "Signup", component: Signup, protected: false, allowedRoles: [], authRedirect: true, showHeader: true, showFooter: true },
    // { name: "Filter", component: FilterPage, protected: false, authRedirect: false, showHeader: true, showFooter: true },
    // { name: "Detail", component: DetailPage, protected: false, authRedirect: false, showHeader: true, showFooter: true },
    // { name: "Privacy", component: PrivacyPage, protected: false, authRedirect: false, showHeader: true, showFooter: true },
    // { name: "ContactUS", component: ContactUs, protected: false, authRedirect: false, showHeader: true, showFooter: true },
    //   { name: "/inventory/:userId", component: Inventory, protected: false, authRedirect: false, showHeader: true, showFooter: true },
    // { name: "NotFound", component: NotFound, protected: false, authRedirect: false, showHeader: false, showFooter: false },
];

export default routes;
