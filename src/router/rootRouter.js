import Home from '../components/Home';
import Login from '../components/Login';
import ConsoleDesk from '../components/ConsoleDesk';

const routers = [
    {
        path: '/',
        exact: true,
        component: Home,
    },
    {
        path: '/login',
        exact: true,
        component: Login,
    },
    {
        path: '/c**',
        exact: true,
        component: ConsoleDesk,
    },
];

export default routers;
