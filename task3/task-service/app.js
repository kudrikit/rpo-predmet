const { exec } = require('child_process');

const liquibaseCommand = 'npx liquibase --classpath=lib/mysql-connector-j-9.0.0.jar --changeLogFile=./db/changelog/db.changelog-1.0.xml --url=jdbc:mysql://localhost:3306/task_service_db --username=root --password=admin update';

exec(liquibaseCommand, (err, stdout, stderr) => {
    if (err) {
        console.error(`Ошибка миграции Liquibase: ${err}`);
        return;
    }
    console.log(`Liquibase результат: ${stdout}`);
});

const express = require('express');
const app = express();
const port = 3000;

app.listen(port, () => {
    console.log(`Task Service running on http://localhost:${port}`);
});
