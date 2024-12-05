import { Bars3Icon, BellIcon } from '@heroicons/react/24/outline';
import { useLayoutStore } from '../../stores/layoutStore';

const Header = () => {
  const { setSidebarOpen } = useLayoutStore();

  return (
    <header className="sticky top-0 z-40 flex w-full bg-white drop-shadow-1 dark:bg-boxdark dark:drop-shadow-none">
      <div className="flex flex-grow items-center justify-between px-4 py-4 shadow-2 md:px-6 2xl:px-11">
        <div className="flex items-center gap-2 sm:gap-4 lg:hidden">
          <button
            aria-controls="sidebar"
            onClick={() => setSidebarOpen(true)}
            className="z-99999 block rounded-sm border border-stroke bg-white p-1.5 shadow-sm dark:border-strokedark dark:bg-boxdark lg:hidden"
          >
            <Bars3Icon className="h-5 w-5" />
          </button>
        </div>

        <div className="hidden sm:block">
          <form action="#" method="GET">
            <div className="relative">
              <input
                type="text"
                placeholder="Pesquisar..."
                className="w-full bg-transparent pl-9 pr-4 font-medium focus:outline-none xl:w-125"
              />
            </div>
          </form>
        </div>

        <div className="flex items-center gap-3 2xsm:gap-7">
          <div className="relative">
            <button className="flex h-8.5 w-8.5 items-center justify-center rounded-full border-[0.5px] border-stroke bg-gray hover:text-primary dark:border-strokedark dark:bg-meta-4 dark:text-white">
              <BellIcon className="h-5 w-5" />
            </button>
            <span className="absolute -top-0.5 right-0 z-1 h-2 w-2 rounded-full bg-meta-1">
              <span className="absolute -z-1 inline-flex h-full w-full animate-ping rounded-full bg-meta-1 opacity-75"></span>
            </span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;