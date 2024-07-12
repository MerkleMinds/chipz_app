import Drawer, { type IDrawerProps } from "@/components/events/Drawer";
import Players, { IPlayerProps } from "@/components/events/Players";

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

const mainSection: {
  key: string;
  data: IDrawerProps["boxes"];
}[] = [
  {
    key: "Match result",
    data: oneXTwoData,
  },
  {
    key: "Draw no bet",
    data: drawNoBetData,
  },
  {
    key: "Double chance",
    data: doubleChanceData,
  },
  {
    key: "Both teams to score",
    data: bothTeamsToScoreData,
  },
];

const goalsData: {
  key: string;
  data: IDrawerProps["boxes"];
}[] = [
  {
    key: "Spain goals - over",
    data: spainGoalData,
  },
  {
    key: "Italy goals - over",
    data: italyGoalData,
  },
  {
    key: "Spain goals - under",
    data: spainGoalData,
  },
  {
    key: "Italy goals - under",
    data: italyGoalData,
  },
  {
    key: "Total goals",
    data: totalGoalsData,
  },
  {
    key: "Goals - handicap",
    data: goalHandicapData,
  },
];

const asianData: {
  key: string;
  data: IDrawerProps["boxes"];
}[] = [
  {
    key: "Handicap - 1x2 (1)",
    data: handicapOneXTwoOneData,
  },
  {
    key: "Handicap - 1x2 (2)",
    data: handicapOneXTwoTwoData,
  },
  {
    key: "Handicap - 1-2 (0.5)",
    data: handicapOneXTwoHalfData,
  },
  {
    key: "Handicap - Total",
    data: handicapTotalData,
  },
];

const extraData: {
  key: string;
  data: IDrawerProps["boxes"];
}[] = [
  {
    key: "Yellow Cards",
    data: yellowCardsData,
  },
  {
    key: "Red Cards",
    data: redCardsData,
  },
  {
    key: "Combined Corners",
    data: combinedCornersData,
  },
  {
    key: "Throws in - Spain",
    data: throwsInSpainData,
  },
  {
    key: "Throws in - Italy",
    data: throwsInItalyData,
  },
  {
    key: "Goal kick - Spain",
    data: goalKickSpainData,
  },
  {
    key: "Goal kick - Italy",
    data: goalKickItalyData,
  },
  {
    key: "Head goals - Spain",
    data: headGoalsSpainData,
  },
  {
    key: "Head goals - Italy",
    data: headGoalsItalyData,
  },
  {
    key: "First Assist",
    data: assistsData,
  },
  {
    key: "Penalty Kick",
    data: penaltyKickData,
  },
];

const fifteenMinutesData: {
  key: string;
  data: IDrawerProps["boxes"];
}[] = [
  {
    key: "Interval 1x2 15'",
    data: lead15Data,
  },
  {
    key: "Interval over/under goals 15'",
    data: intervalOverUnderData,
  },
  {
    key: "Interval yellow cards 15'",
    data: intervalYellowCardsData,
  },
  {
    key: "Interval combined corners 15'",
    data: intervalCombinedCornersData,
  },
];

const spainPlayers: IPlayerProps["players"] = [
  { name: "U. Simón" },
  { name: "C. Azpilicueta" },
  { name: "A. Laporte" },
  { name: "P. Torres" },
  { name: "J. Alba" },
  { name: "S. Busquets" },
  { name: "K. Resurrección" },
  { name: "P. González" },
  { name: "F. Torres" },
  { name: "Á. Morata" },
  { name: "D. Olmo" },
  { name: "D. de Gea" },
  { name: "E. García" },
  { name: "R. Hernández" },
  { name: "M. Oyarzabal" },
  { name: "P. Sarabia" },
];

const italyPlayers: IPlayerProps["players"] = [
  { name: "G. Donnarumma" },
  { name: "G. Di Lorenzo" },
  { name: "L. Bonucci" },
  { name: "G. Chiellini" },
  { name: "L. Spinazzola" },
  { name: "N. Barella" },
  { name: "J. Frello" },
  { name: "M. Verratti" },
  { name: "F. Chiesa" },
  { name: "C. Immobile" },
  { name: "L. Insigne" },
  { name: "S. Sirigu" },
  { name: "A. Florenzi" },
  { name: "M. Locatelli" },
  { name: "A. Belotti" },
  { name: "D. Berardi" },
];

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
            {mainSection.map((section, i) => (
              <Drawer
                active={i === 0}
                key={section.key}
                title={section.key}
                boxes={section.data}
              />
            ))}
          </div>
        </Accordion>
        <Accordion title="Goals" arrow>
          <div className="flex flex-col gap-2 pt-1 pb-4">
            {goalsData.map((section) => (
              <Drawer
                key={section.key}
                title={section.key}
                boxes={section.data}
              />
            ))}
          </div>
        </Accordion>
        <Accordion title="Asian" arrow>
          <div className="flex flex-col gap-2 pt-1 pb-4">
            {asianData.map((section) => (
              <Drawer
                key={section.key}
                title={section.key}
                boxes={section.data}
              />
            ))}
          </div>
        </Accordion>
        <Accordion title="Extra" arrow>
          <div className="flex flex-col gap-2 pt-1 pb-4">
            {extraData.map((section) => (
              <Drawer
                key={section.key}
                title={section.key}
                boxes={section.data}
              />
            ))}
          </div>
        </Accordion>
        <Accordion title="15 minutes" arrow>
          <div className="flex flex-col gap-2 pt-1 pb-4">
            {fifteenMinutesData.map((section) => (
              <Drawer
                key={section.key}
                title={section.key}
                boxes={section.data}
              />
            ))}
          </div>
        </Accordion>
        <Players
          team="Spain"
          players={spainPlayers}
        />
        <Players
          team="Italy"
          players={italyPlayers}
        />
      </div>
      <Footer />
    </main>
  );
}
