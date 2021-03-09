import ConsoleHome from '../components/console/ConsoleHome';
import ConsoleMarketOrders from '../components/console/ConsoleMarketOrders';
import Console404 from '../components/console/Console404';
import ConsoleMarketOrderDetails from '../components/console/ConsoleMarketOrderDetails';

const routers = [
    {
        path: '/c/',
        exact: true,
        component: ConsoleHome,
    },
    {
        path: '/c/market-orders',
        exact: true,
        component: ConsoleMarketOrders,
    },
    {
        path: '/c/market-order/:id',
        exact: true,
        component: ConsoleMarketOrderDetails,
    },
    {
        path: '/c/*',
        exact: true,
        component: Console404,
    },
];

export default routers;
