import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import styled from "styled-components";
import tw from "tailwind.macro";

import { useAppState } from "../state";
import AccountAvatar from "./AccountAvatar";

const StyledNavLink = styled(NavLink).attrs({
  className:
    "px-3 py-2 rounded-md text-sm font-medium leading-5 text-gray-300 hover:text-white hover:bg-gray-700 focus:outline-none focus:text-white focus:bg-gray-700 transition duration-150 ease-in-out",
})`
  &.active {
    ${tw`text-white bg-gray-900`}
  }
`;

export default function Nav() {
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const { user } = useAppState();

  return (
    <nav class="bg-gray-800">
      <div class="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
        <div class="flex items-center justify-between h-14">
          <div class="flex">
            {user ? (
              <>
                <StyledNavLink to="/dashboard" activeClassName="active">
                  Dashboard
                </StyledNavLink>

                <StyledNavLink
                  to="/webhooks"
                  className="ml-4"
                  activeClassName="active"
                >
                  Webhooks
                </StyledNavLink>
              </>
            ) : (
              <>
                <StyledNavLink
                  to="/login"
                  className="ml-4"
                  activeClassName="active"
                >
                  Login
                </StyledNavLink>

                <StyledNavLink
                  to="/register"
                  className="ml-4"
                  activeClassName="active"
                >
                  Register
                </StyledNavLink>
              </>
            )}
          </div>
          <div class="relative">
            {user ? (
              <AccountAvatar
                name={user.name}
                onClick={() => setShowProfileDropdown(!showProfileDropdown)}
                onClickAway={() => setShowProfileDropdown(false)}
              />
            ) : null}

            <div
              class={`origin-top-right absolute right-0 mt-1 w-48 rounded-md shadow-lg ${
                showProfileDropdown ? "" : "hidden"
              }`}
            >
              <div
                class="py-1 rounded-md bg-white shadow-xs"
                role="menu"
                aria-orientation="vertical"
                aria-labelledby="user-menu"
              >
                <Link
                  to="/logout"
                  class="block px-4 py-2 text-sm leading-5 text-gray-700 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 transition duration-150 ease-in-out"
                  role="menuitem"
                >
                  Logout
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
