import { FaCircleInfo } from "react-icons/fa6";

interface IAccordionProps {
  title: string;
  children: React.ReactNode;
  arrow?: boolean;
  active?: boolean;
}

export default function Accordion(
  { title, children, arrow = false, active = false }: IAccordionProps,
) {
  return (
    <div
      className="hs-accordion-group mx-2 px-2 mt-0 bg-gray-800 rounded-md"
      id={title.toLowerCase().replaceAll(/ /g, () => "-")}
    >
      <div
        className={`hs-accordion ${active && "active"} id="hs-basic-${
          arrow ? "with-arrow" : "no-arrow"
        }-heading-one ${arrow ? "" : "border border-gray-700 rounded-md"}`}
      >
        <button
          className="hs-accordion-toggle hs-accordion-active:text-white inline-flex items-center gap-x-3 w-full font-semibold text-start text-gray-500 rounded-lg disabled:opacity-50 disabled:pointer-events-none"
          aria-controls={`hs-basic-${
            arrow ? "with-arrow" : "no-arrow"
          }-collapse-one`}
        >
          {arrow && (
            <>
              <svg
                className="hs-accordion-active:hidden block size-4"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="m6 9 6 6 6-6"></path>
              </svg>
              <svg
                className="hs-accordion-active:block hidden size-4"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="m18 15-6-6-6 6"></path>
              </svg>
            </>
          )}
          {arrow
            ? <p className={`text-lg ${!arrow ? "px-4" : "p-1"}`}>{title}</p>
            : (
              <div className="flex justify-between p-2 text-xs bg-gray-700 w-full rounded-md">
                <p className="text-neutral-400">{title}</p>
                <FaCircleInfo className="text-neutral-400" />
              </div>
            )}
        </button>
        <div
          id={`hs-basic-${arrow ? "with-arrow" : "no-arrow"}-collapse-one`}
          className={`hs-accordion-content w-full ${
            !active && "hidden"
          } overflow-hidden transition-[height] duration-300 ${
            arrow && "flex flex-col gap-2"
          }`}
          aria-labelledby={`hs-basic-${
            arrow ? "with-arrow" : "no-arrow"
          }-heading-one`}
        >
          {children}
        </div>
      </div>
    </div>
  );
}
