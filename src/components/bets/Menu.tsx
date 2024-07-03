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
      className={`py-1 px-2 rounded-md transition-all ${
        state === kind ? "text-white" : "text-neutral-400"
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
    <div className="w-full flex flex-row justify-evenly py-2">
      <Kind state={state} setState={setState} kind={MenuState.LIVE}>
        <p className="text-lg">Live</p>
      </Kind>
      <Kind state={state} setState={setState} kind={MenuState.OPEN}>
        <p className="text-lg">Open</p>
      </Kind>
      <Kind state={state} setState={setState} kind={MenuState.SETTLED}>
        <p className="text-lg">Settled</p>
      </Kind>
    </div>
  );
}
