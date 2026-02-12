import type { NavItem } from "../../types/portfolio";

interface NavbarProps {
  brand: string;
  items: NavItem[];
}

export function Navbar({ brand, items }: NavbarProps) {
  return (
    <header className="site-header">
      <div className="container-page flex h-16 items-center justify-between">
        <a href="#home" className="brand">
          {brand}
        </a>

        <nav aria-label="Primary navigation">
          <ul className="flex items-center gap-1">
            {items.map((item) => (
              <li key={item.id}>
                <a href={`#${item.id}`} className="nav-link">
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
}
