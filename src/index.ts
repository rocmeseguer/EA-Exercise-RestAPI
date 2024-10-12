import app from './app'
import { startConnection, populateDatabase } from './database';

async function main() {
  startConnection(); 
  
  populateDatabase()
    .then(() => console.log('Database populated successfully'))
    .catch(err => console.error('Failed to populate database', err));
  
  
  
  await app.listen(app.get('port'));
  console.log('Server on port', app.get('port'));
}

main();
