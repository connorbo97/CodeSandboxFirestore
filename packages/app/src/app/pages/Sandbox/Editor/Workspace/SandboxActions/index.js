import React from 'react';
import { inject, observer } from 'mobx-react';

import Button from 'app/components/Button';
import { WorkspaceInputContainer, WorkspaceSubtitle } from '../elements';

import { PrivacySelect, PatronMessage } from './elements';

function SandboxActions({ store, signals }) {
  const sandbox = store.editor.currentSandbox;

  return (
    <div>
      <WorkspaceInputContainer style={{ fontSize: '1rem' }}>
        <Button
          block
          small
          style={{
            margin: '0.75rem 0.25rem',
            boxSizing: 'border-box',
          }}
          onClick={() =>
            signals.modalOpened({
              modal: 'deleteSandbox',
            })
          }
        >
          Delete Sandbox
        </Button>
      </WorkspaceInputContainer>
    </div>
  );
}

export default inject('signals', 'store')(observer(SandboxActions));
