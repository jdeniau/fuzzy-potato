import * as React from 'react';
import styled from 'styled-components';
import { MemoryRouter as Router, Route, Switch } from 'react-router-dom';
import TableList from './TableList';
import TableGrid from './TableGrid';

const LayoutDiv = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
`;
const HeaderDiv = styled.header``;
const ContentDiv = styled.div`
  display: flex;
  flex-grow: 1;
`;
const LeftPanelDiv = styled.div`
  min-width: 200px;
  overflow: auto;
`;
const RightPanelDiv = styled.div`
  flex-grow: 1;
  overflow: auto;
`;

const Layout = () => {
  return (
    <Router>
      <LayoutDiv>
        <HeaderDiv>
          <h2>Welcome to Fuzzy Potato !</h2>
        </HeaderDiv>
        <ContentDiv>
          <LeftPanelDiv>
            <TableList />
          </LeftPanelDiv>
          <RightPanelDiv>
            <Switch>
              <Route exact path="/tables/:tableName" component={TableGrid} />
            </Switch>
          </RightPanelDiv>
        </ContentDiv>
      </LayoutDiv>
    </Router>
  );
};

export default Layout;