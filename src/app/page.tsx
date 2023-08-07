'use client'

import React, { useEffect, useState } from 'react';

import Typography from '@mui/material/Typography';
import { NextPage } from 'next';
import { TabWithClose } from '@/components/TabWithClose';
import { Button, Grid, Tab, Tabs } from '@mui/material';
import { TabViewer } from '@/store/features/tabs/components/TabViewer';
import { Add, HdrPlus } from '@mui/icons-material';
import { TabAdd } from '@/store/features/tabs/components/TabAdd';
import useTabs from '@/store/features/tabs/hooks/useTabs';
import useSelectedTab from '@/store/features/userPreferences/hooks/useSelectedTab';

export const Home: NextPage = () => {

  const {
    selectTab: setTab,
    selectedTab
  } = useSelectedTab();

  const {
    newTab,
    tabs,
    removeTab
  } = useTabs();

  const [tabId, setTabId] = useState<string | undefined | number>('new');


  useEffect(() => {
    const targetTab = tabs.filter(tab => tab.id === selectedTab);

    if (targetTab.length > 0) {
      setTabId(tabs.indexOf(targetTab[0]));
    } else {
      setTabId(tabs.length > 0 ? Object.keys(tabs)[0] : 'new');
    }
  }, [selectedTab, tabs]);

  useEffect(() => {
    console.log('tabId', tabId);
  }, [tabId]);



  return (<>
    <Grid container gap={2}>
      <Grid item xs={12}>
        <Tabs
          sx={{
            mb: 4
          }}
          value={tabId}
          onChange={(e, v) => {
            console.log(v);
            tabs[v] && setTab(tabs[v].id);
          }}
          variant="scrollable"
          scrollButtons="auto"
        >
          {typeof tabs !== 'undefined' && tabs.map((tab, index) => {
            return <TabWithClose key={index} label={
              tab.title
            } onClickCloseIcon={() => {
              setTab((typeof tabs !== undefined && tabs.length > 1) ? 'new' : 'new');
              removeTab(tab.id);
            }}
              tabId={tab.id}
            />
          })}
          <Tab value='new' label='+' onClick={() => {
            const createdTab = newTab();
            setTab(
              createdTab
            );
          }} />
        </Tabs>
      </Grid>
    </Grid>


    <TabViewer tabId={selectedTab} />

  </>);
}

export default Home;
