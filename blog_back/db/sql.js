const SqlSelect = {
    CREATE_TEST_TABLE: `CREATE TABLE IF NOT EXISTS user (
                                                           id INT UNSIGNED AUTO_INCREMENT,
                                                           name VARCHAR(100) NOT NULL,
                                                           addtime DATE,
                                                           PRIMARY KEY (id)
                                                          )ENGINE=InnoDB DEFAULT CHARSET=UTF8;`,
    SELECT_USER_TABLE: `SELECT * FROM hj_user WHERE user_name=?;`,
    INSERT_USER_TABLE: `INSERT INTO hj_user(user_name, user_password,user_three) value(?,?,?);`,
    INSERT_USER_THREE: `INSERT INTO hj_user(user_name, user_password,user_three) value(?,?,?);`,
    SELECT_USER_THREE: `SELECT * FROM hj_user WHERE user_name=? and user_three=?;`,

};


module.exports.SqlApi = SqlSelect;