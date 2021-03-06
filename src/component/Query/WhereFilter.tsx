import * as React from 'react';
import styled from 'styled-components';

const WhereArea = styled.textarea`
  width: 100%;
  padding: 5px;
  border-radius: 3px;
`;

interface Props {
  onSubmit: (where: string) => void;
  defaultValue: string;
}

function WhereFilter({ defaultValue, onSubmit }: Props): React.ReactElement {
  const [where, setWhere] = React.useState<string>(defaultValue);

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit(where);
      }}
    >
      <WhereArea value={where} onChange={(e) => setWhere(e.target.value)} />

      <input type="submit" />
    </form>
  );
}

export default WhereFilter;
