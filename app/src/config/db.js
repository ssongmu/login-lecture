"use strict"

const sql = require("mssql");

const config = {
    user: process.env.DB_HOST,
    password: process.env.DB_PASSWORD,
    server: process.env.DB_SERVER,
    database:process.env.DB_DATABASE,
    stream: true,
    encrypt : false
}

const pool = sql.connect(config, (err)=> {
  if(err){
   return console.error('error : ',err);
  }
  console.log('MSSQL 연결 완료');
})

// const pool = new sql.ConnectionPool(config).connect()
//       .then(pool => {
//           console.log('Pool 생성')
//         })
//         .catch(err =>{
//           console.log('err', err)
//         })

module.exports = {
    sql,
    pool
};
