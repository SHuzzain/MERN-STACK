import { Button, Navbar, TextInput } from "flowbite-react";
import React, { Fragment } from "react";
import { Form, Link, useLocation } from "react-router-dom";
import { MoonIcon, SearchIcon } from "lucide-react";
import TextHeading from "./ui/TextHeading";

const navItems = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Projects", href: "/project" },
];

const HeaderNav = () => {
  const pathName = useLocation().pathname;
  return (
    <Navbar border>
      <Link to={"/"}>
        <h2 className="font-bold text-3xl text-primary whitespace-nowrap">
          De<span className="text-[#1d1d1d] dark:text-gray-400">sign</span>
        </h2>
      </Link>

      <Form>
        <TextInput
          type="text"
          rightIcon={SearchIcon}
          placeholder="Search..."
          className="lg:inline hidden"
        />
      </Form>

      <div className="flex items-center gap-3 md:order-2">
        <Button className="inline lg:hidden w-12 h-10" color={"gray"} pill>
          <SearchIcon size={15} />
        </Button>
        <Button color={"gray"} className="sm:inline hidden w-12 h-10">
          <MoonIcon size={15} fill="black" />
        </Button>
        <Link to={"/auth?mode=signin"}>
          <Button color={"gray"} className="[&>span]:py-1">
            <TextHeading
              containerClassName={"text-lg"}
              label={{
                1: "sgin",
                2: "in",
              }}
            />
          </Button>
        </Link>
        <Navbar.Toggle />
      </div>
      <Navbar.Collapse>
        {navItems.map((item, index) => (
          <Fragment key={index}>
            <Navbar.Link active={pathName === item.href} as={"div"}>
              <Link to={item.href}>{item.label}</Link>
            </Navbar.Link>
          </Fragment>
        ))}
      </Navbar.Collapse>
    </Navbar>
  );
};

export default HeaderNav;
