const { exec } = require('child_process');

const flywayCommand = 'flyway -url="jdbc:mysql://localhost:3306/user_service_db?useSSL=false&allowPublicKeyRetrieval=true&passwordCharacterEncoding=utf8" -user=user_service -password=admin -locations=filesystem:./db/migration migrate';

exec(flywayCommand, (err, stdout, stderr) => {
    if (err) {
        console.error(`Ошибка миграции Flyway: ${err}`);
        return;
    }
    console.log(`Flyway результат: ${stdout}`);
});

const express = require('express');
const app = express();
const port = 3001;

app.listen(port, () => {
    console.log(`User Service running on http://localhost:${port}`);
});
