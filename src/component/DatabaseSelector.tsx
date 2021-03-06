import * as React from 'react';
import { Connection } from 'mysql';
import { ConnectionContext, DatabaseContext } from '../Contexts';

interface TableListWithoutConnectionProps {}

interface TableListProps extends TableListWithoutConnectionProps {
  connection: Connection;
}

interface DatabaseRow {
  Database: string;
}

function DatabaseSelector({ connection }: TableListProps) {
  const [databaseList, setDatabaseList]: [
    DatabaseRow[],
    Function
  ] = React.useState([]);

  const { database, setDatabase } = React.useContext(DatabaseContext);

  React.useEffect(() => {
    connection.query('SHOW DATABASES;', (err, result: DatabaseRow[]) => {
      if (err) {
        throw err;
      }
      if (result) {
        setDatabaseList(result);
        setDatabase(result[0].Database);
      }
    });
  }, [connection.threadId, connection, setDatabase]);

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setDatabase(event.target.value);
  };

  return (
    <select onChange={handleChange} value={database || undefined}>
      {databaseList.map((row: DatabaseRow) => (
        <option key={row.Database}>{row.Database}</option>
      ))}
    </select>
  );
}

export default function DatabaseSelectorWithContext(
  props: TableListWithoutConnectionProps
) {
  const { currentConnection } = React.useContext(ConnectionContext);

  if (!currentConnection) {
    return null;
  }

  return (
    <DatabaseSelector
      key={currentConnection.threadId || undefined}
      connection={currentConnection}
      {...props}
    />
  );
}
