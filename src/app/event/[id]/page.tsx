import Drawer, { type IDrawerProps } from "@/components/events/Drawer";

import Accordion from "@/components/events/Accordion";
import Banner from "@/components/events/Banner";
import Footer from "@/components/Footer";
import Menu from "@/components/events/Menu";

const oneXTwoData: IDrawerProps["boxes"] = {
  sections: [
    {
      key: "Full Time",
      data: [
        { name: "Spain", odds: 1.5 },
        { name: "X", odds: 2.2 },
        { name: "Italy", odds: 3.3 },
      ],
    },
    {
      key: "1st Half",
      data: [
        { name: "Spain", odds: 1.9 },
        { name: "X", odds: 2.5 },
        { name: "Italy", odds: 3.1 },
      ],
    },
    {
      key: "2nd Half",
      data: [
        { name: "Spain", odds: 1.5 },
        { name: "X", odds: 2.2 },
        { name: "Italy", odds: 3.3 },
      ],
    },
  ],
};

const drawNoBetData: IDrawerProps["boxes"] = {
  sections: [
    {
      key: "Full Time",
      data: [
        { name: "Spain", odds: 1.5 },
        { name: "Italy", odds: 2.2 },
      ],
    },
    {
      key: "1st Half",
      data: [
        { name: "Spain", odds: 1.9 },
        { name: "Italy", odds: 2.5 },
      ],
    },
    {
      key: "2nd Half",
      data: [
        { name: "Spain", odds: 1.5 },
        { name: "Italy", odds: 2.2 },
      ],
    },
  ],
};

const doubleChanceData: IDrawerProps["boxes"] = {
  sections: [
    {
      key: "Full time",
      data: [
        { name: "Spain/X", odds: 1.5 },
        { name: "Spain/Italy", odds: 2.2 },
        { name: "X/Italy", odds: 3.3 },
      ],
    },
    {
      key: "1st Half",
      data: [
        { name: "Spain/X", odds: 1.9 },
        { name: "Spain/Italy", odds: 2.5 },
        { name: "X/Italy", odds: 3.1 },
      ],
    },
    {
      key: "2nd Half",
      data: [
        { name: "Spain/X", odds: 1.5 },
        { name: "Spain/Italy", odds: 2.2 },
        { name: "X/Italy", odds: 3.3 },
      ],
    },
  ],
};

const bothTeamsToScoreData: IDrawerProps["boxes"] = {
  sections: [
    {
      key: "Full time",
      data: [
        { name: "Yes", odds: 1.5 },
        { name: "No", odds: 2.2 },
      ],
    },
    {
      key: "1st Half",
      data: [
        { name: "Yes", odds: 1.9 },
        { name: "No", odds: 2.5 },
      ],
    },
    {
      key: "2nd Half",
      data: [
        { name: "Yes", odds: 1.5 },
        { name: "No", odds: 2.2 },
      ],
    },
  ],
};

const spainGoalData: IDrawerProps["boxes"] = {
  sections: [
    {
      key: "Over 0.5",
      data: [
        { name: "Yes", odds: 1.5 },
        { name: "No", odds: 2.2 },
      ],
    },
    {
      key: "Over 1.5",
      data: [
        { name: "Yes", odds: 1.9 },
        { name: "No", odds: 2.5 },
      ],
    },
    {
      key: "Over 2.5",
      data: [
        { name: "Yes", odds: 1.5 },
        { name: "No", odds: 2.2 },
      ],
    },
  ],
};

const italyGoalData: IDrawerProps["boxes"] = {
  sections: [
    {
      key: "Over 0.5",
      data: [
        { name: "Yes", odds: 1.5 },
        { name: "No", odds: 2.2 },
      ],
    },
    {
      key: "Over 1.5",
      data: [
        { name: "Yes", odds: 1.9 },
        { name: "No", odds: 2.5 },
      ],
    },
    {
      key: "Over 2.5",
      data: [
        { name: "Yes", odds: 1.5 },
        { name: "No", odds: 2.2 },
      ],
    },
  ],
};

const totalGoalsData: IDrawerProps["boxes"] = {
  sections: [
    {
      key: "Full time",
      data: [
        { name: "0", odds: 1.5 },
        { name: "1", odds: 2.2 },
        { name: "2", odds: 3.3 },
        { name: "3+", odds: 4.4 },
      ],
    },
    {
      key: "1st Half",
      data: [
        { name: "0", odds: 1.9 },
        { name: "1", odds: 2.5 },
        { name: "2", odds: 3.1 },
        { name: "3+", odds: 4.2 },
      ],
    },
    {
      key: "2nd Half",
      data: [
        { name: "0", odds: 1.5 },
        { name: "1", odds: 2.2 },
        { name: "2", odds: 3.3 },
        { name: "3+", odds: 4.4 },
      ],
    },
  ],
};

const goalHandicapData: IDrawerProps["boxes"] = {
  sections: [
    {
      key: "Full time",
      data: [
        { name: "Spain -1", odds: 1.5 },
        { name: "Italy +1", odds: 2.2 },
      ],
    },
    {
      key: "1st Half",
      data: [
        { name: "Spain -1", odds: 1.9 },
        { name: "Italy +1", odds: 2.5 },
      ],
    },
    {
      key: "2nd Half",
      data: [
        { name: "Spain -1", odds: 1.5 },
        { name: "Italy +1", odds: 2.2 },
      ],
    },
  ],
};

const handicapOneXTwoOneData: IDrawerProps["boxes"] = {
  sections: [
    {
      key: "Full time",
      data: [
        { name: "Spain - 1", odds: 1.5 },
        { name: "X - 1 (Italy)", odds: 2.2 },
        { name: "Italy + 1", odds: 3.3 },
      ],
    },
    {
      key: "1st Half",
      data: [
        { name: "Spain - 1", odds: 1.9 },
        { name: "X - 1 (Italy)", odds: 2.5 },
        { name: "Italy + 1", odds: 3.1 },
      ],
    },
    {
      key: "2nd Half",
      data: [
        { name: "Spain - 1", odds: 1.5 },
        { name: "X - 1 (Italy)", odds: 2.2 },
        { name: "Italy + 1", odds: 3.3 },
      ],
    },
  ],
};

const handicapOneXTwoTwoData: IDrawerProps["boxes"] = {
  sections: [
    {
      key: "Full time",
      data: [
        { name: "Spain + 1", odds: 1.5 },
        { name: "X - 1 (Italy)", odds: 2.2 },
        { name: "Italy - 1", odds: 3.3 },
      ],
    },
    {
      key: "1st Half",
      data: [
        { name: "Spain + 1", odds: 1.9 },
        { name: "X - 1 (Italy)", odds: 2.5 },
        { name: "Italy - 1", odds: 3.1 },
      ],
    },
    {
      key: "2nd Half",
      data: [
        { name: "Spain + 1", odds: 1.5 },
        { name: "X - 1 (Italy)", odds: 2.2 },
        { name: "Italy - 1", odds: 3.3 },
      ],
    },
  ],
};

const handicapOneXTwoHalfData: IDrawerProps["boxes"] = {
  sections: [
    {
      key: "Full time",
      data: [
        { name: "Spain - 0.5", odds: 1.5 },
        { name: "Italy + 0.5", odds: 3.3 },
      ],
    },
    {
      key: "1st Half",
      data: [
        { name: "Spain - 0.5", odds: 1.9 },
        { name: "Italy + 0.5", odds: 3.1 },
      ],
    },
    {
      key: "2nd Half",
      data: [
        { name: "Spain - 0.5", odds: 1.5 },
        { name: "Italy + 0.5", odds: 3.3 },
      ],
    },
  ],
};

const handicapTotalData: IDrawerProps["boxes"] = {
  sections: [
    {
      key: "Spain",
      data: [
        { name: "Spain + 1", odds: 1.5 },
        { name: "Spain - 1", odds: 2.2 },
      ],
    },
    {
      key: "Italy",
      data: [
        { name: "Italy + 1", odds: 1.9 },
        { name: "Italy - 1", odds: 2.5 },
      ],
    },
  ],
};

const yellowCardsData: IDrawerProps["boxes"] = {
  sections: [
    {
      key: "O/U 1.5",
      data: [
        { name: "Over 1.5", odds: 1.5 },
        { name: "Under 1.5", odds: 2.2 },
      ],
    },
    {
      key: "O/U 2.5",
      data: [
        { name: "Over 2.5", odds: 1.9 },
        { name: "Under 2.5", odds: 2.5 },
      ],
    },
    {
      key: "O/U 3.5",
      data: [
        { name: "Over 3.5", odds: 1.5 },
        { name: "Under 3.5", odds: 2.2 },
      ],
    },
  ],
};

const redCardsData: IDrawerProps["boxes"] = {
  sections: [
    {
      key: "O/U 1.5",
      data: [
        { name: "Over 1.5", odds: 1.5 },
        { name: "Under 1.5", odds: 2.2 },
      ],
    },
    {
      key: "O/U 2.5",
      data: [
        { name: "Over 2.5", odds: 1.9 },
        { name: "Under 2.5", odds: 2.5 },
      ],
    },
    {
      key: "O/U 3.5",
      data: [
        { name: "Over 3.5", odds: 1.5 },
        { name: "Under 3.5", odds: 2.2 },
      ],
    },
  ],
};

const combinedCornersData: IDrawerProps["boxes"] = {
  sections: [
    {
      key: "O/U 1.5",
      data: [
        { name: "Over 1.5", odds: 1.5 },
        { name: "Under 1.5", odds: 2.2 },
      ],
    },
    {
      key: "O/U 2.5",
      data: [
        { name: "Over 2.5", odds: 1.9 },
        { name: "Under 2.5", odds: 2.5 },
      ],
    },
    {
      key: "O/U 3.5",
      data: [
        { name: "Over 3.5", odds: 1.5 },
        { name: "Under 3.5", odds: 2.2 },
      ],
    },
  ],
};

const throwsInSpainData: IDrawerProps["boxes"] = {
  sections: [
    {
      key: "Full time",
      data: [
        { name: "1+", odds: 1.5 },
        { name: "2+", odds: 2.2 },
        { name: "3+", odds: 3.3 },
        { name: "4+", odds: 4.4 },
      ],
    },
    {
      key: "1st Half",
      data: [
        { name: "1+", odds: 1.9 },
        { name: "2+", odds: 2.5 },
        { name: "3+", odds: 3.1 },
        { name: "4+", odds: 4.2 },
      ],
    },
    {
      key: "2nd Half",
      data: [
        { name: "1+", odds: 1.5 },
        { name: "2+", odds: 2.2 },
        { name: "3+", odds: 3.3 },
        { name: "4+", odds: 4.4 },
      ],
    },
  ],
};

const throwsInItalyData: IDrawerProps["boxes"] = {
  sections: [
    {
      key: "Full time",
      data: [
        { name: "1+", odds: 1.5 },
        { name: "2+", odds: 2.2 },
        { name: "3+", odds: 3.3 },
        { name: "4+", odds: 4.4 },
      ],
    },
    {
      key: "1st Half",
      data: [
        { name: "1+", odds: 1.9 },
        { name: "2+", odds: 2.5 },
        { name: "3+", odds: 3.1 },
        { name: "4+", odds: 4.2 },
      ],
    },
    {
      key: "2nd Half",
      data: [
        { name: "1+", odds: 1.5 },
        { name: "2+", odds: 2.2 },
        { name: "3+", odds: 3.3 },
        { name: "4+", odds: 4.4 },
      ],
    },
  ],
};

const goalKickSpainData: IDrawerProps["boxes"] = {
  sections: [
    {
      key: "Full time",
      data: [
        { name: "1+", odds: 1.5 },
        { name: "2+", odds: 2.2 },
        { name: "3+", odds: 3.3 },
        { name: "4+", odds: 4.4 },
      ],
    },
    {
      key: "1st Half",
      data: [
        { name: "1+", odds: 1.9 },
        { name: "2+", odds: 2.5 },
        { name: "3+", odds: 3.1 },
        { name: "4+", odds: 4.2 },
      ],
    },
    {
      key: "2nd Half",
      data: [
        { name: "1+", odds: 1.5 },
        { name: "2+", odds: 2.2 },
        { name: "3+", odds: 3.3 },
        { name: "4+", odds: 4.4 },
      ],
    },
  ],
};

const goalKickItalyData: IDrawerProps["boxes"] = {
  sections: [
    {
      key: "Full time",
      data: [
        { name: "1+", odds: 1.5 },
        { name: "2+", odds: 2.2 },
        { name: "3+", odds: 3.3 },
        { name: "4+", odds: 4.4 },
      ],
    },
    {
      key: "1st Half",
      data: [
        { name: "1+", odds: 1.9 },
        { name: "2+", odds: 2.5 },
        { name: "3+", odds: 3.1 },
        { name: "4+", odds: 4.2 },
      ],
    },
    {
      key: "2nd Half",
      data: [
        { name: "1+", odds: 1.5 },
        { name: "2+", odds: 2.2 },
        { name: "3+", odds: 3.3 },
        { name: "4+", odds: 4.4 },
      ],
    },
  ],
};

const headGoalsSpainData: IDrawerProps["boxes"] = {
  sections: [
    {
      key: "Full time",
      data: [
        { name: "1+", odds: 1.5 },
        { name: "2+", odds: 2.2 },
        { name: "3+", odds: 3.3 },
        { name: "4+", odds: 4.4 },
      ],
    },
    {
      key: "1st Half",
      data: [
        { name: "1+", odds: 1.9 },
        { name: "2+", odds: 2.5 },
        { name: "3+", odds: 3.1 },
        { name: "4+", odds: 4.2 },
      ],
    },
    {
      key: "2nd Half",
      data: [
        { name: "1+", odds: 1.5 },
        { name: "2+", odds: 2.2 },
        { name: "3+", odds: 3.3 },
        { name: "4+", odds: 4.4 },
      ],
    },
  ],
};

const headGoalsItalyData: IDrawerProps["boxes"] = {
  sections: [
    {
      key: "Full time",
      data: [
        { name: "1+", odds: 1.5 },
        { name: "2+", odds: 2.2 },
        { name: "3+", odds: 3.3 },
        { name: "4+", odds: 4.4 },
      ],
    },
    {
      key: "1st Half",
      data: [
        { name: "1+", odds: 1.9 },
        { name: "2+", odds: 2.5 },
        { name: "3+", odds: 3.1 },
        { name: "4+", odds: 4.2 },
      ],
    },
    {
      key: "2nd Half",
      data: [
        { name: "1+", odds: 1.5 },
        { name: "2+", odds: 2.2 },
        { name: "3+", odds: 3.3 },
        { name: "4+", odds: 4.4 },
      ],
    },
  ],
};

const assistsData: IDrawerProps["boxes"] = {
  sections: [
    {
      key: "First Assist - Spain",
      data: [
        { name: "A. Morata", odds: 1.5 },
        { name: "P. Sarabia", odds: 2.2 },
        { name: "D. Olmo", odds: 3.3 },
      ],
    },
    {
      key: "First Assist - Italy",
      data: [
        { name: "L. Insigne", odds: 1.9 },
        { name: "C. Immobile", odds: 2.5 },
        { name: "F. Chiesa", odds: 3.1 },
      ],
    },
  ],
};

const penaltyKickData: IDrawerProps["boxes"] = {
  sections: [
    {
      key: "Full time",
      data: [
        { name: "Yes", odds: 1.5 },
        { name: "No", odds: 2.2 },
      ],
    },
    {
      key: "1st Half",
      data: [
        { name: "Yes", odds: 1.9 },
        { name: "No", odds: 2.5 },
      ],
    },
    {
      key: "2nd Half",
      data: [
        { name: "Yes", odds: 1.5 },
        { name: "No", odds: 2.2 },
      ],
    },
  ],
};

const lead15Data: IDrawerProps["boxes"] = {
  sections: [
    {
      key: "15'",
      data: [
        { name: "Spain", odds: 1.5 },
        { name: "X", odds: 2.2 },
        { name: "Italy", odds: 3.3 },
      ],
    },
    {
      key: "30'",
      data: [
        { name: "Spain", odds: 1.9 },
        { name: "X", odds: 2.5 },
        { name: "Italy", odds: 3.1 },
      ],
    },
    {
      key: "45'",
      data: [
        { name: "Spain", odds: 1.5 },
        { name: "X", odds: 2.2 },
        { name: "Italy", odds: 3.3 },
      ],
    },
    {
      key: "60'",
      data: [
        { name: "Spain", odds: 1.9 },
        { name: "X", odds: 2.5 },
        { name: "Italy", odds: 3.1 },
      ],
    },
    {
      key: "75'",
      data: [
        { name: "Spain", odds: 1.5 },
        { name: "X", odds: 2.2 },
        { name: "Italy", odds: 3.3 },
      ],
    },
    {
      key: "90'",
      data: [
        { name: "Spain", odds: 1.9 },
        { name: "X", odds: 2.5 },
        { name: "Italy", odds: 3.1 },
      ],
    },
  ],
};

const intervalOverUnderData: IDrawerProps["boxes"] = {
  sections: [
    {
      key: "15'",
      data: [
        { name: "Over 1.5", odds: 1.5 },
        { name: "Under 1.5", odds: 2.2 },
      ],
    },
    {
      key: "30'",
      data: [
        { name: "Over 1.5", odds: 1.9 },
        { name: "Under 1.5", odds: 2.5 },
      ],
    },
    {
      key: "45'",
      data: [
        { name: "Over 1.5", odds: 1.5 },
        { name: "Under 1.5", odds: 2.2 },
      ],
    },
    {
      key: "60'",
      data: [
        { name: "Over 1.5", odds: 1.9 },
        { name: "Under 1.5", odds: 2.5 },
      ],
    },
    {
      key: "75'",
      data: [
        { name: "Over 1.5", odds: 1.5 },
        { name: "Under 1.5", odds: 2.2 },
      ],
    },
    {
      key: "90'",
      data: [
        { name: "Over 1.5", odds: 1.9 },
        { name: "Under 1.5", odds: 2.5 },
      ],
    },
  ],
};

const intervalYellowCardsData: IDrawerProps["boxes"] = {
  sections: [
    {
      key: "15'",
      data: [
        { name: "Over 1.5", odds: 1.5 },
        { name: "Under 1.5", odds: 2.2 },
      ],
    },
    {
      key: "30'",
      data: [
        { name: "Over 1.5", odds: 1.9 },
        { name: "Under 1.5", odds: 2.5 },
      ],
    },
    {
      key: "45'",
      data: [
        { name: "Over 1.5", odds: 1.5 },
        { name: "Under 1.5", odds: 2.2 },
      ],
    },
    {
      key: "60'",
      data: [
        { name: "Over 1.5", odds: 1.9 },
        { name: "Under 1.5", odds: 2.5 },
      ],
    },
    {
      key: "75'",
      data: [
        { name: "Over 1.5", odds: 1.5 },
        { name: "Under 1.5", odds: 2.2 },
      ],
    },
    {
      key: "90'",
      data: [
        { name: "Over 1.5", odds: 1.9 },
        { name: "Under 1.5", odds: 2.5 },
      ],
    },
  ],
};

const intervalCombinedCornersData: IDrawerProps["boxes"] = {
  sections: [
    {
      key: "15'",
      data: [
        { name: "Over 7.5", odds: 1.5 },
        { name: "Under 7.5", odds: 2.2 },
      ],
    },
    {
      key: "30'",
      data: [
        { name: "Over 7.5", odds: 1.9 },
        { name: "Under 7.5", odds: 2.5 },
      ],
    },
    {
      key: "45'",
      data: [
        { name: "Over 7.5", odds: 1.5 },
        { name: "Under 7.5", odds: 2.2 },
      ],
    },
    {
      key: "60'",
      data: [
        { name: "Over 7.5", odds: 1.9 },
        { name: "Under 7.5", odds: 2.5 },
      ],
    },
    {
      key: "75'",
      data: [
        { name: "Over 7.5", odds: 1.5 },
        { name: "Under 7.5", odds: 2.2 },
      ],
    },
    {
      key: "90'",
      data: [
        { name: "Over 7.5", odds: 1.9 },
        { name: "Under 7.5", odds: 2.5 },
      ],
    },
  ],
};

export default function Page(_params: { params: { id: string } }) {
  return (
    <main className="flex flex-col gap-2 text-xs">
      <Banner
        home={{ name: "Spain", url: "/spain.png" }}
        away={{ name: "Italy", url: "/italy.png" }}
        date="20/06/2024"
        time="21:00"
      />
      <Menu />
      <div className="flex flex-col overflow-x-scroll gap-3 no-scrollbar">
        <Accordion title="Main" active arrow>
          <div className="flex flex-col gap-2 pt-1 pb-4">
            <Drawer
              active
              title="Match result"
              boxes={oneXTwoData}
            />
            <Drawer
              title="Draw no bet"
              boxes={drawNoBetData}
            />
            <Drawer
              title="Double chance"
              boxes={doubleChanceData}
            />
            <Drawer
              title="Both teams to score"
              boxes={bothTeamsToScoreData}
            />
          </div>
        </Accordion>
        <Accordion title="Goals" arrow>
          <div className="flex flex-col gap-2 pt-1 pb-4">
            <Drawer
              title="Spain goals - over"
              boxes={spainGoalData}
            />
            <Drawer
              title="Italy goals - over"
              boxes={italyGoalData}
            />
            <Drawer
              title="Spain goals - under"
              boxes={spainGoalData}
            />
            <Drawer
              title="Italy goals - under"
              boxes={italyGoalData}
            />
            <Drawer
              title="Total goals"
              boxes={totalGoalsData}
            />
            <Drawer
              title="Goals - handicap"
              boxes={goalHandicapData}
            />
          </div>
        </Accordion>
        <Accordion title="Asian" arrow>
          <div className="flex flex-col gap-2 pt-1 pb-4">
            <Drawer
              title="Handicap - 1x2 (1)"
              boxes={handicapOneXTwoOneData}
            />
            <Drawer
              title="Handicap - 1x2 (2)"
              boxes={handicapOneXTwoTwoData}
            />
            <Drawer
              title="Handicap - 1-2 (0.5)"
              boxes={handicapOneXTwoHalfData}
            />
            <Drawer
              title="Handicap - Total"
              boxes={handicapTotalData}
            />
          </div>
        </Accordion>
        <Accordion title="Extra" arrow>
          <div className="flex flex-col gap-2 pt-1 pb-4">
            <Drawer
              title="Yellow Cards"
              boxes={yellowCardsData}
            />
            <Drawer
              title="Red Cards"
              boxes={redCardsData}
            />
            <Drawer
              title="Combined Corners"
              boxes={combinedCornersData}
            />
            <Drawer
              title="Throws in - Spain"
              boxes={throwsInSpainData}
            />
            <Drawer
              title="Throws in - Italy"
              boxes={throwsInItalyData}
            />
            <Drawer
              title="Goal kick - Spain"
              boxes={goalKickSpainData}
            />
            <Drawer
              title="Goal kick - Italy"
              boxes={goalKickItalyData}
            />
            <Drawer
              title="Head goals - Spain"
              boxes={headGoalsSpainData}
            />
            <Drawer
              title="Head goals - Italy"
              boxes={headGoalsItalyData}
            />
            <Drawer
              title="First Assist"
              boxes={assistsData}
            />
            <Drawer
              title="Penalty Kick"
              boxes={penaltyKickData}
            />
          </div>
        </Accordion>
        <Accordion title="15 minutes" arrow>
          <div className="flex flex-col gap-2 pt-1 pb-4">
            <Drawer
              title="Interval 1x2 15'"
              boxes={lead15Data}
            />
            <Drawer
              title="Interval over/under goals 15'"
              boxes={intervalOverUnderData}
            />
            <Drawer
              title="Interval yellow cards 15'"
              boxes={intervalYellowCardsData}
            />
            <Drawer
              title="Interval combined corners 15'"
              boxes={intervalCombinedCornersData}
            />
          </div>
        </Accordion>
      </div>
      <Footer />
    </main>
  );
}
