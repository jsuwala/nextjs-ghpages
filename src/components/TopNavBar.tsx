'use client';

import { Fragment } from 'react';
import { usePathname } from 'next/navigation';
import {Navbar, NavbarBrand, NavbarContent, NavbarItem} from "@nextui-org/navbar";
import {Link} from "@nextui-org/link";
import {Button, ButtonGroup} from "@nextui-org/button";

import Image from 'next/image';

const navigation = [
  { name: 'Home', href: '/' },
  { name: 'About', href: '/about' }
];

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ');
}

export default function TopNavBar() {
  const pathname = usePathname();

  // return (
  //   <div className="top-navbar w-full fixed top-0 left-0 right-0 h-16 bg-gray-100 border-t border-gray-200 text-black">
  //       This is the navBar
  //   </div>
  // );
  return (
    <Navbar>
      <NavbarBrand>
        [Insert Logo]
        <p className="font-bold text-inherit">ACME</p>
      </NavbarBrand>
      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        <NavbarItem>
          <Link color="foreground" href="#">
            Features
          </Link>
        </NavbarItem>
        <NavbarItem isActive>
          <Link href="#" aria-current="page">
            Customers
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link color="foreground" href="#">
            Integrations
          </Link>
        </NavbarItem>
      </NavbarContent>
      <NavbarContent justify="end">
        <NavbarItem className="hidden lg:flex">
          <Link href="#">Login</Link>
        </NavbarItem>
        <NavbarItem>
          <Button as={Link} color="primary" href="#" variant="flat">
            Sign Up
          </Button>
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  );
}