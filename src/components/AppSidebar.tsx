import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { BarChart2, MessageSquare, Users, Settings, SendHorizontal, LayoutGrid, BrainCircuit, Link as LinkIcon, LogOut } from 'lucide-react';
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader } from "@/components/ui/sidebar";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { useIsMobile } from '@/hooks/use-mobile';
import { SinapseLogo } from './SinapseLogo';
const NavItem = ({
  icon: Icon,
  label,
  path,
  active = false,
  onClick
}: {
  icon: React.ElementType;
  label: string;
  path: string;
  active?: boolean;
  onClick?: () => void;
}) => {
  return <li>
      <a href={path} className={cn('nav-link', active && 'active')} onClick={e => {
      e.preventDefault();
      if (onClick) onClick();
    }}>
        <Icon size={18} />
        <span>{label}</span>
      </a>
    </li>;
};
export function AppSidebar() {
  const navigate = useNavigate();
  const location = useLocation();
  const isMobile = useIsMobile();
  const navItems = [{
    icon: BarChart2,
    label: 'Dashboard',
    path: '/'
  }, {
    icon: MessageSquare,
    label: 'Chat Ao Vivo',
    path: '/chat'
  }, {
    icon: BrainCircuit,
    label: 'Personalização de IA',
    path: '/ai'
  }, {
    icon: SendHorizontal,
    label: 'Mensagens em Massa',
    path: '/messaging'
  }, {
    icon: Users,
    label: 'Contatos (CRM)',
    path: '/contacts'
  }, {
    icon: LinkIcon,
    label: 'Integrações',
    path: '/integrations'
  }, {
    icon: Settings,
    label: 'Configurações',
    path: '/settings'
  }];
  const handleNavigation = (path: string) => {
    navigate(path);
  };
  return <Sidebar>
      <SidebarHeader className="p-4 flex flex-col items-center">
        <div className="flex items-center gap-3">
          <SinapseLogo size="md" />
          <h1 className="text-xl font-bold text-foreground">Sinapse</h1>
        </div>
      </SidebarHeader>
      <Separator />
      <SidebarContent className="py-4">
        <nav>
          <ul className="space-y-1 px-2">
            {navItems.map(item => <NavItem key={item.path} icon={item.icon} label={item.label} path={item.path} active={location.pathname === item.path} onClick={() => handleNavigation(item.path)} />)}
          </ul>
        </nav>
      </SidebarContent>
      <SidebarFooter className="p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Avatar>
              <AvatarImage src="https://github.com/shadcn.png" alt="Usuário" />
              <AvatarFallback>JS</AvatarFallback>
            </Avatar>
            <div>
              <p className="text-sm font-bold text-left">Bruno Granate</p>
              <p className="text-xs text-muted-foreground">Admin</p>
            </div>
          </div>
          <button className="text-muted-foreground hover:text-foreground transition-colors">
            <LogOut size={18} />
          </button>
        </div>
      </SidebarFooter>
    </Sidebar>;
}