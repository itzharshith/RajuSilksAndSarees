import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { Home, Search, Heart, ShoppingBag, User } from 'lucide-react';

const MobileTabBar = () => {
  const { user } = useAuth();
  const { cartItems, wishlist } = useCart();
  const location = useLocation();

  const cartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  const isActive = (path) => {
    if (path === '/') {
      return location.pathname === '/';
    }
    return location.pathname.startsWith(path);
  };

  const navItems = [
    {
      label: 'Home',
      path: '/',
      icon: Home,
    },
    {
      label: 'Shop',
      path: '/shop',
      icon: Search,
    },
    {
      label: 'Wishlist',
      path: '/wishlist',
      icon: Heart,
      badge: wishlist.length,
    },
    {
      label: 'Cart',
      path: '/cart',
      icon: ShoppingBag,
      badge: cartCount,
    },
    {
      label: 'Account',
      path: user ? '/profile' : '/login',
      icon: User,
    },
  ];

  return (
    <div className="lg:hidden fixed bottom-0 left-0 right-0 z-50 bg-brand-blue-deep/90 backdrop-blur-md border-t border-brand-creamText/25 shadow-[0_-5px_15px_rgba(7,17,30,0.3)] pb-safe">
      <div className="flex justify-around items-center h-16 max-w-md mx-auto px-4">
        {navItems.map((item) => {
          const ActiveIcon = item.icon;
          const active = isActive(item.path);

          return (
            <Link
              key={item.label}
              to={item.path}
              className="flex flex-col items-center justify-center flex-1 h-full relative transition-all duration-200"
            >
              <div className={`p-1.5 rounded-full transition-all duration-300 relative ${
                active ? 'text-brand-creamText scale-110' : 'text-gray-400 hover:text-brand-creamText/70'
              }`}>
                <ActiveIcon size={20} className={active ? 'stroke-[2.5px]' : 'stroke-[1.8px]'} />
                
                {/* Badges */}
                {item.badge !== undefined && item.badge > 0 && (
                  <span className={`absolute -top-1 -right-1.5 font-bold text-[9px] h-4 w-4 rounded-full flex items-center justify-center border ${
                    item.label === 'Cart' 
                      ? 'bg-brand-creamText text-brand-blue-deep border-brand-blue-deep' 
                      : 'bg-red-600 text-white border-brand-blue-deep'
                  }`}>
                    {item.badge}
                  </span>
                )}
              </div>
              
              <span className={`text-[9px] tracking-wider font-sans font-semibold mt-0.5 uppercase transition-colors ${
                active ? 'text-brand-creamText font-bold' : 'text-gray-500'
              }`}>
                {item.label}
              </span>

              {/* Active gold dot */}
              {active && (
                <span className="absolute bottom-1 w-1 h-1 rounded-full bg-brand-creamText shadow-creamText-glow animate-fade-in" />
              )}
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default MobileTabBar;
