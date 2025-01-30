"use client";

import { Box } from "@twilio-paste/core/box";
import {
  Sidebar,
  SidebarHeader,
  SidebarBody,
  SidebarHeaderIconButton,
  SidebarHeaderLabel,
  SidebarNavigation,
  SidebarNavigationItem,
  SidebarNavigationDisclosure,
  SidebarNavigationDisclosureHeadingWrapper,
  SidebarNavigationDisclosureHeading,
  SidebarNavigationDisclosureContent,
  SidebarFooter,
  SidebarCollapseButton,
  SidebarPushContentWrapper,
} from "@twilio-paste/core/sidebar";
import { Topbar, TopbarActions } from "@twilio-paste/core/topbar";
import {
  InPageNavigation,
  InPageNavigationItem,
} from "@twilio-paste/core/in-page-navigation";
import { LogoTwilioIcon } from "@twilio-paste/icons/cjs/LogoTwilioIcon";
import React from "react";

export const Navigation = ({ children }: { children: React.ReactNode }) => {
  const [pushSidebarCollapsed, setPushSidebarCollapsed] = React.useState(false);
  const sidebarNavigationSkipLinkID = "sidebar-navigation-skip-link";
  const topbarSkipLinkID = "topbar-skip-link";
  const mainContentSkipLinkID = "main-content-skip-link";

  return (
    <Box>
      <Sidebar
        sidebarNavigationSkipLinkID={sidebarNavigationSkipLinkID}
        topbarSkipLinkID={topbarSkipLinkID}
        mainContentSkipLinkID={mainContentSkipLinkID}
        collapsed={pushSidebarCollapsed}
        variant="compact"
      >
        <SidebarHeader>
          <SidebarHeaderIconButton as="a" href="#">
            <LogoTwilioIcon
              size="sizeIcon20"
              decorative={false}
              title="Go to Twilio Docs homepage"
            />
          </SidebarHeaderIconButton>
          <SidebarHeaderLabel>Twilio Docs</SidebarHeaderLabel>
        </SidebarHeader>
        <SidebarBody>
          <SidebarNavigation
            aria-label={sidebarNavigationSkipLinkID}
            hierarchical
            hideItemsOnCollapse
          >
            <SidebarNavigationItem href="https://google.com" selected>
              Twilio CLI
            </SidebarNavigationItem>
            <SidebarNavigationDisclosure>
              <SidebarNavigationDisclosureHeadingWrapper>
                <SidebarNavigationDisclosureHeading>
                  Examples
                </SidebarNavigationDisclosureHeading>
              </SidebarNavigationDisclosureHeadingWrapper>
              <SidebarNavigationDisclosureContent>
                <SidebarNavigationItem href="https://google.com">
                  Overview
                </SidebarNavigationItem>
              </SidebarNavigationDisclosureContent>
            </SidebarNavigationDisclosure>
            <SidebarNavigationDisclosure>
              <SidebarNavigationDisclosureHeadingWrapper>
                <SidebarNavigationDisclosureHeading>
                  General usage
                </SidebarNavigationDisclosureHeading>
              </SidebarNavigationDisclosureHeadingWrapper>
              <SidebarNavigationDisclosureContent>
                <SidebarNavigationItem href="https://google.com">
                  Overview
                </SidebarNavigationItem>
              </SidebarNavigationDisclosureContent>
            </SidebarNavigationDisclosure>
            <SidebarNavigationDisclosure>
              <SidebarNavigationDisclosureHeadingWrapper>
                <SidebarNavigationDisclosureHeading>
                  Getting started
                </SidebarNavigationDisclosureHeading>
              </SidebarNavigationDisclosureHeadingWrapper>
              <SidebarNavigationDisclosureContent>
                <SidebarNavigationItem href="https://google.com">
                  Overview
                </SidebarNavigationItem>
              </SidebarNavigationDisclosureContent>
            </SidebarNavigationDisclosure>
            <SidebarNavigationItem href="https://google.com">
              Plugins
            </SidebarNavigationItem>
            <SidebarNavigationItem href="https://google.com">
              Quick start
            </SidebarNavigationItem>
            <SidebarNavigationItem href="https://google.com">
              Uninstall
            </SidebarNavigationItem>
          </SidebarNavigation>
        </SidebarBody>
        <SidebarFooter>
          <SidebarCollapseButton
            onClick={() => setPushSidebarCollapsed(!pushSidebarCollapsed)}
            i18nCollapseLabel="Close sidebar"
            i18nExpandLabel="Open sidebar"
          />
        </SidebarFooter>
      </Sidebar>
      <SidebarPushContentWrapper
        collapsed={pushSidebarCollapsed}
        variant="compact"
      >
        <Topbar id={topbarSkipLinkID}>
          <TopbarActions justify="start">
            <InPageNavigation aria-label="Product" marginBottom="space0">
              <InPageNavigationItem href="#" currentPage>
                Messaging
              </InPageNavigationItem>
              <InPageNavigationItem href="#">Voice</InPageNavigationItem>
              <InPageNavigationItem href="#">Serverless</InPageNavigationItem>
              <InPageNavigationItem href="#">Video</InPageNavigationItem>
              <InPageNavigationItem href="#">Studio</InPageNavigationItem>
            </InPageNavigation>
          </TopbarActions>
          <TopbarActions justify="end">
            <Box
              as="a"
              href="#"
              color="colorText"
              textDecoration="none"
              fontWeight="fontWeightMedium"
              _hover={{ textDecoration: "underline" }}
            >
              Log in
            </Box>
            <Box
              as="a"
              href="#"
              color="colorText"
              textDecoration="none"
              fontWeight="fontWeightMedium"
              _hover={{ textDecoration: "underline" }}
            >
              Sign up
            </Box>
          </TopbarActions>
        </Topbar>
        <Box padding="space70" id={mainContentSkipLinkID}>
          {children}
        </Box>
      </SidebarPushContentWrapper>
    </Box>
  );
};
