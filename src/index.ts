import { App } from './primary-adapters/http/App';
import { PostgresConnector } from './secondary-adapters/persistence/postgres/PostgresConnector';

const connector = new PostgresConnector();

(async () => {
    try {
        await connector.connect();
    } catch (error) {
        //   await shutdown();
    }
})();
console.info('⚡️[db]: Typeorm connection intitialized');

const app = new App(
    {
        port: '8000',
        isProduction: false,
    },
);
app.start();
console.info('⚡️[server]: Express rest api started');
