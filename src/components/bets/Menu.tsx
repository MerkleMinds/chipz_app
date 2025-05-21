export enum MenuState {
  OPEN,
  SETTLED,
}

interface IMenu {
  state: MenuState;
  setState: (state: MenuState) => void;
}

export default function Menu({ state, setState }: IMenu) {
  return (
    <div className="bg-gray-900 text-white mx-6 mt-2">
      <div className="max-w-md mx-auto">
        <div className="flex justify-between mb-4 gap-2">
          {Object.keys(MenuState)
            .filter(key => isNaN(Number(key)))
            .map(tab => {
              const tabState = MenuState[tab as keyof typeof MenuState];
              return (
                <button
                  key={tab}
                  className={`flex-1 py-2 transition-colors duration-300 ease-in-out rounded-md text-xs ${
                    state === tabState
                      ? "text-white bg-gray-800"
                      : "text-neutral-400 hover:text-white"
                  }`}
                  onClick={() => setState(tabState)}
                >
                  {tab.charAt(0).toUpperCase() + tab.slice(1).toLowerCase()}
                </button>
              );
            })}
        </div>
      </div>
    </div>
  );
}
