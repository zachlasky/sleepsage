import { Navbar } from "flowbite-react";
import { useEffect, useState } from "react";



const Header = () => {
  const [pathname, setPathname] = useState("/");

  useEffect(() => {
    setPathname(window.location.pathname);
  }, []);

  return (
    <Navbar className="px-5 md:p-[33.5px]" fluid>
      <Navbar.Brand href="/">
        <span className="self-center whitespace-nowrap font-bold text-[#15171a] text-[22px] lg:text-2xl hover:opacity-80">SleepSage</span>
      </Navbar.Brand>
      <Navbar.Toggle />
      <Navbar.Collapse>
        <Navbar.Link active={pathname === "/"} className="text-xs text-[#15171a] font-bold" href="/">HOME</Navbar.Link>
        <Navbar.Link active={pathname.startsWith("/quiz")} className="text-xs text-[#15171a] font-bold" href="/quiz">QUIZ</Navbar.Link>
        <Navbar.Link active={pathname.startsWith("/supplements")} className="text-xs text-[#15171a] font-bold" href="/supplements">SUPPLEMENTS</Navbar.Link>
        <Navbar.Link active={pathname.startsWith("/products")} className="text-xs text-[#15171a] font-bold" href="/products">PRODUCTS</Navbar.Link>
        <Navbar.Link active={pathname.startsWith("/blog")} className="text-xs text-[#15171a] font-bold" href="/blog">BLOG</Navbar.Link>
        <Navbar.Link active={pathname.startsWith("/about")} className="text-xs text-[#15171a] font-bold" href="/about">ABOUT</Navbar.Link>
        <Navbar.Link active={pathname.startsWith("/legal")} className="text-xs text-[#15171a] font-bold" href="/legal">LEGAL</Navbar.Link>
      </Navbar.Collapse>
    </Navbar>
  );
};

export { Header };
