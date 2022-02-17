class mysqlAdapter {
    constructor() {
        this.mysql = require('promise-mysql');
        this.conn = null;
    }

    async createConnection() {
        return await this.mysql.createConnection({
            host: process.env.DM_HOST,
            user: process.env.DB_USER,
            password: process.env.DB_PASS,
            database: process.env.DE_DATABASE 
        });
    }

    async execute(sql, options) {
        this.conn = this.conn || await this.createConnection();
        return await this.conn.query(sql, options);
    }

    async close() {
        await this.conn.end();
    }
}

module.exports = mysqlAdapter;