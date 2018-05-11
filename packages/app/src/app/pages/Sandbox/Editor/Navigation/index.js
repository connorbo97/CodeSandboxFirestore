import React from 'react';
import { inject, observer } from 'mobx-react';

import GitHubIcon from 'react-icons/lib/go/mark-github';

import workspaceItems from 'app/store/modules/workspace/items';
import Tooltip from 'common/components/Tooltip';

import InfoIcon from './InfoIcon';
import FilesIcon from './FileIcon';
import RocketIcon from './RocketIcon';
import ConfigurationIcon from './ConfigurationIcon';

import { Container, IconContainer } from './elements';

const IDS_TO_ICONS = {
  project: InfoIcon,
  files: FilesIcon,
  config: ConfigurationIcon,
};

const Navigation = ({ store, signals }) => (
  <Container>
    {workspaceItems.filter(w => !w.show || w.show(store)).map(item => {
      const { id, name } = item;
      const Icon = IDS_TO_ICONS[id];
      const selected = id === store.workspace.openedWorkspaceItem;
      return (
        <Tooltip key={id} position="right" title={name}>
          <IconContainer
            selected={selected}
            onClick={() => {
              if (selected) {
                signals.workspace.setWorkspaceItem({ item: null });
              } else {
                signals.workspace.setWorkspaceItem({ item: id });
              }
            }}
          >
            <Icon />
          </IconContainer>
        </Tooltip>
      );
    })}
  </Container>
);

export default inject('signals', 'store')(observer(Navigation));
