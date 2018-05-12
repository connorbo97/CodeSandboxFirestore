import * as React from 'react';
import { inject, observer } from 'mobx-react';

import VERSION from 'common/version';

import workspaceItems from 'app/store/modules/workspace/items';
import SocialInfo from 'app/components/SocialInfo';

import Files from './items/Files';
import ProjectInfo from './items/ProjectInfo';
import GitHub from './items/GitHub';
import Deployment from './items/Deployment';
import ConfigurationFiles from './items/ConfigurationFiles';
import NotOwnedSandboxInfo from './items/NotOwnedSandboxInfo';

import ConnectionNotice from './ConnectionNotice';
import Advertisement from './Advertisement';

import { Container, ContactContainer, ItemTitle, Left } from './elements';

import Action from './Action';
import Save from 'react-icons/lib/md/save';
import Fork from 'react-icons/lib/go/repo-forked';
import Download from 'react-icons/lib/md/file-download';
import ShareIcon from 'react-icons/lib/md/share';
import SettingsIcon from 'react-icons/lib/md/settings';
import PlusIcon from 'react-icons/lib/go/plus';

const idToItem = {
  project: ProjectInfo,
  files: Files,
  github: GitHub,
  deploy: Deployment,
  config: ConfigurationFiles,
};

function Workspace({ store, signals }) {
  const sandbox = store.editor.currentSandbox;
  const preferences = store.preferences;

  const currentItem = store.workspace.openedWorkspaceItem;

  if (!currentItem) {
    return null;
  }

  const Component = sandbox.owned ? idToItem[currentItem] : NotOwnedSandboxInfo;

  const item = workspaceItems.find(i => i.id === currentItem);
  return (
    <Container>
      <Left>
        <Action
          onClick={() => signals.editor.forkSandboxClicked()}
          tooltip="Fork"
          Icon={Fork}
        />

        {/*use title="Share" to make it have a tag next to the image*/}

        <Action
          tooltip="Share"
          Icon={ShareIcon}
          onClick={() =>
            signals.modalOpened({
              modal: 'share',
            })
          }
        />

        {(sandbox.owned || !store.editor.isAllModulesSynced) && (
          <Action
            onClick={
              store.editor.isAllModulesSynced
                ? null
                : () => signals.editor.saveClicked()
            }
            placeholder={
              store.editor.isAllModulesSynced ? 'All modules are saved' : false
            }
            tooltip="Save"
            Icon={Save}
          />
        )}

        <Action
          tooltip="Download"
          Icon={Download}
          onClick={() => signals.editor.createZipClicked()}
        />
        <Action
          onClick={() =>
            signals.modalOpened({
              modal: 'newSandbox',
            })
          }
          tooltip="Create New Sandbox"
          Icon={PlusIcon}
        />
        {!store.isLoggedIn && (
          <Action
            onClick={() =>
              signals.modalOpened({
                modal: 'preferences',
              })
            }
            tooltip="Preferences"
            Icon={SettingsIcon}
          />
        )}
      </Left>
      {sandbox.owned && <ItemTitle>{item.name}</ItemTitle>}
      <div style={{ position: 'relative', flex: 1 }}>
        <Container>
          <Component />
        </Container>
      </div>
      {!preferences.settings.zenMode && (
        <div>
          <ContactContainer />
          <ConnectionNotice />
        </div>
      )}
    </Container>
  );
}

export default inject('signals', 'store')(observer(Workspace));
