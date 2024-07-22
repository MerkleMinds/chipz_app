export enum MenuState {
  LIVE,
  OPEN,
  SETTLED,
}

interface IKind {
  state: MenuState;
  setState: (state: MenuState) => void;
  kind: MenuState;
  children?: React.ReactNode;
}

function Kind({ state, setState, kind, children }: IKind) {
  return (
    <div
      onClick={() => setState(kind)}
      className={`px-2 py-1 transition-colors duration-300 ease-in-out rounded-md text-xs ${
        state === kind
          ? "text-white bg-gray-800"
          : "text-neutral-400 hover:text-white"
      }`}
    >
      {children}
    </div>
  );
}

interface IMenu {
  state: MenuState;
  setState: (state: MenuState) => void;
}

export default function Menu({ state, setState }: IMenu) {
  return (
    <div className="w-full flex flex-row justify-evenly pt-2">
      <Kind state={state} setState={setState} kind={MenuState.LIVE}>
        <p className="text-sm">Live</p>
      </Kind>
      <Kind state={state} setState={setState} kind={MenuState.OPEN}>
        <p className="text-sm">Open</p>
      </Kind>
      <Kind state={state} setState={setState} kind={MenuState.SETTLED}>
        <p className="text-sm">Settled</p>
      </Kind>
    </div>
  );
}
