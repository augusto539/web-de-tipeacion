class dbmanager {

    async execute(sql, parameters) {
        let result, Adapter;
        Adapter = require('./mysql');
        const mysqlConn = new Adapter();
        result = await mysqlConn.execute(sql, parameters);
        mysqlConn.close();
        return result;
    }
}

module.exports = dbmanager;