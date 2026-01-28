export interface Project {
  id: string;
  title: string;
  author: string;
  imageUrl: string;
  type?: string;
}

export interface NavItem {
  label: string;
  href: string;
}