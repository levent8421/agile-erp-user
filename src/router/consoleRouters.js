import ConsoleHome from '../components/console/ConsoleHome';
import ConsoleMarketOrders from '../components/console/ConsoleMarketOrders';
import Console404 from '../components/console/Console404';

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
        path: '/c/*',
        exact: true,
        component: Console404,
    },
];

export default routers;
