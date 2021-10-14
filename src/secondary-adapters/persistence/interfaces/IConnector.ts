export interface IConnector {
    connect():Promise<void>
    disconnect(): Promise<void>
}
