import path from 'path';
import { Connection, createConnection } from 'typeorm';
import { IConnector } from '../interfaces/IConnector';

export class PostgresConnector implements IConnector {
    private connexion!: Connection

    async connect(): Promise<void> {
        this.connexion = await createConnection({
            type: 'postgres',
            url: 'postgres://root:password@localhost:5432/cleanarchi',
            entities: [
                path.join(__dirname, 'models', '*.ts'),
            ],
            synchronize: true,
            logging: false,
        });
    }

    async disconnect(): Promise<void> {
        await this.connexion.close();
    }
}
