
import { Outlet } from 'react-router-dom';
import Header from './Header.jsx';

export default function Layout({ searchQuery, setSearchQuery }) {
  return (
    <div>
      <Header searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      <main>
        <Outlet />
      </main>
    </div>
  );
}
