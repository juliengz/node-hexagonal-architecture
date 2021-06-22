import { init } from './primary-adapters/webserver/server';
import { PostgresConnector } from './secondary-adapters/persistence/postgres/PostgresConnector';

console.info('--> start application');

init(new PostgresConnector());

console.info('--> application started');
