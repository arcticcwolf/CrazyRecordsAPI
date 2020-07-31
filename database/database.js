const sql = require('mssql');

const conf = 'Server=localhost;Database=CrazyRecords;User Id=sa;Password=samana';
sql.connect(conf, err => { 
    if(err){
        throw err ;
    }
    console.log("Connection Successful !");
       
});

sql.on('error', err => {
    // ... error handler 
    console.log("Sql database connection error " ,err);
})

module.exports = sql;