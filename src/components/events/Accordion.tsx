interface IAccordionProps {
  title: string;
  children: React.ReactNode;
}

export default function Accordion({ title, children }: IAccordionProps) {
  return (
    <div className="hs-accordion-group mx-2 px-2 bg-gray-800 rounded-md">
      <div className="hs-accordion active" id="hs-basic-with-arrow-heading-one">
        <button
          className="hs-accordion-toggle hs-accordion-active:text-white py-3 inline-flex items-center gap-x-3 w-full font-semibold text-start text-gray-500 rounded-lg disabled:opacity-50 disabled:pointer-events-none"
          aria-controls="hs-basic-with-arrow-collapse-one"
        >
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
          <p>{title}</p>
        </button>
        <div
          id="hs-basic-with-arrow-collapse-one"
          className="hs-accordion-content w-full overflow-hidden transition-[height] duration-300"
          aria-labelledby="hs-basic-with-arrow-heading-one"
        >
          {children}
        </div>
      </div>
    </div>
  );
}
