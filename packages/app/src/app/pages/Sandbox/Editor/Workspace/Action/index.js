import React from 'react';

import MoreInfoIcon from 'react-icons/lib/md/arrow-drop-down';

import {
  Title,
  Action,
  ActionLink,
  ActionA,
  ActionTooltip,
  IconContainer,
} from './elements';

function ActionComponent({
  onClick,
  href,
  Icon,
  title,
  tooltip,
  highlight,
  placeholder,
  moreInfo,
  unresponsive,
  a,
  iconProps = {},
  iconContainerProps = {},
  children,
  ...props
}) {
  if (!href && (placeholder || tooltip)) {
    return (
      <ActionTooltip
        disabledAction={!onClick}
        title={placeholder || tooltip}
        hideOnClick={false}
        {...props}
      >
        <IconContainer onClick={onClick} {...iconContainerProps}>
          <Icon {...iconProps} />
          {title !== undefined && (
            <Title unresponsive={unresponsive}>{title}</Title>
          )}
          {moreInfo && <MoreInfoIcon style={{ fontSize: '1.1rem' }} />}
        </IconContainer>
        {children}
      </ActionTooltip>
    );
  }
  if (onClick) {
    return (
      <Action disabledAction={!onClick} highlight={highlight} {...props}>
        <IconContainer onClick={onClick} {...iconContainerProps}>
          <Icon {...iconProps} />
          {title !== undefined && (
            <Title unresponsive={unresponsive}>{title}</Title>
          )}
          {moreInfo && <MoreInfoIcon style={{ fontSize: '1.1rem' }} />}
        </IconContainer>
        {children}
      </Action>
    );
  }

  if (href && a && (placeholder || tooltip)) {
    return (
      <ActionA href={href} target="_blank" rel="noopener noreferrer">
        <ActionTooltip title={placeholder || tooltip}>
          <IconContainer {...iconContainerProps}>
            <Icon {...iconProps} />
            {title !== undefined && (
              <Title unresponsive={unresponsive}>{title}</Title>
            )}
            {moreInfo && <MoreInfoIcon style={{ fontSize: '1.1rem' }} />}
          </IconContainer>
        </ActionTooltip>
        {children}
      </ActionA>
    );
  }

  if (href && (placeholder || tooltip)) {
    return (
      <ActionLink to={href} {...props}>
        <ActionTooltip title={placeholder || tooltip}>
          <IconContainer>
            <Icon {...iconProps} />
            {title !== undefined && (
              <Title unresponsive={unresponsive}>{title}</Title>
            )}
            {moreInfo && <MoreInfoIcon style={{ fontSize: '1.1rem' }} />}
          </IconContainer>
        </ActionTooltip>
        {children}
      </ActionLink>
    );
  }

  return (
    <ActionLink to={href} {...props}>
      <IconContainer {...iconContainerProps}>
        <Icon {...iconProps} />
        {title !== undefined && (
          <Title unresponsive={unresponsive}>{title}</Title>
        )}
        {moreInfo && <MoreInfoIcon style={{ fontSize: '1.1rem' }} />}
      </IconContainer>
      {children}
    </ActionLink>
  );
}

export default ActionComponent;
