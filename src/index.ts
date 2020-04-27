import app from './app';
import './database';

app.listen(app.get('port'));
console.log(`El servidor se esta ejecutando en el puerto: ${app.get('port')}`);
