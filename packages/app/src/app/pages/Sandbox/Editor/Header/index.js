import * as React from 'react';
import { inject, observer } from 'mobx-react';

import Save from 'react-icons/lib/md/save';
import Fork from 'react-icons/lib/go/repo-forked';
import Download from 'react-icons/lib/md/file-download';
import PlusIcon from 'react-icons/lib/go/plus';
import GithubIcon from 'react-icons/lib/go/mark-github';
import HeartIcon from 'react-icons/lib/fa/heart-o';
import FullHeartIcon from 'react-icons/lib/fa/heart';
import SettingsIcon from 'react-icons/lib/md/settings';
import ShareIcon from 'react-icons/lib/md/share';

import { patronUrl } from 'common/utils/url-generator';

import PatronBadge from '-!svg-react-loader!common/utils/badges/svg/patron-4.svg'; // eslint-disable-line import/no-webpack-loader-syntax
import Margin from 'common/components/spacing/Margin';
import HeaderSearchBar from 'app/components/HeaderSearchBar';
import UserMenu from 'app/pages/common/UserMenu';

import Logo from './Logo';
import Action from './Action';

import { Container, Right, Left } from './elements';

function Header({ store, signals }) {
  const sandbox = store.editor.currentSandbox;

  return (
    <Container>
      <Left>
        <Logo title={sandbox.title} />

        {store.isLoggedIn &&
          (sandbox.userLiked ? (
            <Action
              tooltip="Undo like"
              title="Like"
              Icon={FullHeartIcon}
              onClick={() =>
                signals.editor.likeSandboxToggled({ id: sandbox.id })
              }
            />
          ) : (
            <Action
              title="Like"
              Icon={HeartIcon}
              onClick={() =>
                signals.editor.likeSandboxToggled({ id: sandbox.id })
              }
            />
          ))}
        <Action
          onClick={() => signals.editor.forkSandboxClicked()}
          title="Fork"
          Icon={Fork}
        />

        <Action
          title="Share"
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
      </Left>

      <Right>
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
        <Margin
          style={{
            zIndex: 20,
            height: '100%',
          }}
          left={1}
        >
          {store.isLoggedIn ? (
            <div style={{ fontSize: '.875rem', margin: '6px 0.5rem' }}>
              <UserMenu small />
            </div>
          ) : (
            <Action
              onClick={() => signals.signInClicked()}
              title="Sign in with Github"
              Icon={GithubIcon}
              highlight
              unresponsive
            />
          )}
        </Margin>
      </Right>
    </Container>
  );
}

export default inject('signals', 'store')(observer(Header));
