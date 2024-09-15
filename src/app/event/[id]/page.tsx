import Drawer, { type IDrawerProps } from "@/components/events/Drawer";
import Players, { IPlayerProps } from "@/components/events/Players";
import { faker } from "@faker-js/faker";

import Accordion from "@/components/events/Accordion";
import Banner from "@/components/events/Banner";
import Footer from "@/components/Footer";
import Menu from "@/components/events/Menu";

import available from "@/utils/data/available.json" with { type: "json" };

const oneXTwoData: IDrawerProps["boxes"] = {
  sections: [
    {
      key: "Full Time",
      data: [
        { name: "Home", odds: 1.5 },
        { name: "X", odds: 2.2 },
        { name: "Away", odds: 3.3 },
      ],
    },
    {
      key: "1st Half",
      data: [
        { name: "Home", odds: 1.9 },
        { name: "X", odds: 2.5 },
        { name: "Away", odds: 3.1 },
      ],
    },
    {
      key: "2nd Half",
      data: [
        { name: "Home", odds: 1.5 },
        { name: "X", odds: 2.2 },
        { name: "Away", odds: 3.3 },
      ],
    },
  ],
};

const drawNoBetData: IDrawerProps["boxes"] = {
  sections: [
    {
      key: "Full Time",
      data: [
        { name: "Home", odds: 1.5 },
        { name: "Away", odds: 2.2 },
      ],
    },
    {
      key: "1st Half",
      data: [
        { name: "Home", odds: 1.9 },
        { name: "Away", odds: 2.5 },
      ],
    },
    {
      key: "2nd Half",
      data: [
        { name: "Home", odds: 1.5 },
        { name: "Away", odds: 2.2 },
      ],
    },
  ],
};

const doubleChanceData: IDrawerProps["boxes"] = {
  sections: [
    {
      key: "Full time",
      data: [
        { name: "Home/X", odds: 1.5 },
        { name: "Home/Away", odds: 2.2 },
        { name: "X/Away", odds: 3.3 },
      ],
    },
    {
      key: "1st Half",
      data: [
        { name: "Home/X", odds: 1.9 },
        { name: "Home/Away", odds: 2.5 },
        { name: "X/Away", odds: 3.1 },
      ],
    },
    {
      key: "2nd Half",
      data: [
        { name: "Home/X", odds: 1.5 },
        { name: "Home/Away", odds: 2.2 },
        { name: "X/Away", odds: 3.3 },
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

const homeGoalData: IDrawerProps["boxes"] = {
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

const awayGoalData: IDrawerProps["boxes"] = {
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
        { name: "Home -1", odds: 1.5 },
        { name: "Away +1", odds: 2.2 },
      ],
    },
    {
      key: "1st Half",
      data: [
        { name: "Home -1", odds: 1.9 },
        { name: "Away +1", odds: 2.5 },
      ],
    },
    {
      key: "2nd Half",
      data: [
        { name: "Home -1", odds: 1.5 },
        { name: "Away +1", odds: 2.2 },
      ],
    },
  ],
};

const handicapOneXTwoOneData: IDrawerProps["boxes"] = {
  sections: [
    {
      key: "Full time",
      data: [
        { name: "Home - 1", odds: 1.5 },
        { name: "X - 1 (Away)", odds: 2.2 },
        { name: "Away + 1", odds: 3.3 },
      ],
    },
    {
      key: "1st Half",
      data: [
        { name: "Home - 1", odds: 1.9 },
        { name: "X - 1 (Away)", odds: 2.5 },
        { name: "Away + 1", odds: 3.1 },
      ],
    },
    {
      key: "2nd Half",
      data: [
        { name: "Home - 1", odds: 1.5 },
        { name: "X - 1 (Away)", odds: 2.2 },
        { name: "Away + 1", odds: 3.3 },
      ],
    },
  ],
};

const handicapOneXTwoTwoData: IDrawerProps["boxes"] = {
  sections: [
    {
      key: "Full time",
      data: [
        { name: "Home + 1", odds: 1.5 },
        { name: "X - 1 (Away)", odds: 2.2 },
        { name: "Away - 1", odds: 3.3 },
      ],
    },
    {
      key: "1st Half",
      data: [
        { name: "Home + 1", odds: 1.9 },
        { name: "X - 1 (Away)", odds: 2.5 },
        { name: "Away - 1", odds: 3.1 },
      ],
    },
    {
      key: "2nd Half",
      data: [
        { name: "Home + 1", odds: 1.5 },
        { name: "X - 1 (Away)", odds: 2.2 },
        { name: "Away - 1", odds: 3.3 },
      ],
    },
  ],
};

const handicapOneXTwoHalfData: IDrawerProps["boxes"] = {
  sections: [
    {
      key: "Full time",
      data: [
        { name: "Home - 0.5", odds: 1.5 },
        { name: "Away + 0.5", odds: 3.3 },
      ],
    },
    {
      key: "1st Half",
      data: [
        { name: "Home - 0.5", odds: 1.9 },
        { name: "Away + 0.5", odds: 3.1 },
      ],
    },
    {
      key: "2nd Half",
      data: [
        { name: "Home - 0.5", odds: 1.5 },
        { name: "Away + 0.5", odds: 3.3 },
      ],
    },
  ],
};

const handicapTotalData: IDrawerProps["boxes"] = {
  sections: [
    {
      key: "Home",
      data: [
        { name: "Home + 1", odds: 1.5 },
        { name: "Home - 1", odds: 2.2 },
      ],
    },
    {
      key: "Away",
      data: [
        { name: "Away + 1", odds: 1.9 },
        { name: "Away - 1", odds: 2.5 },
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

const throwsInHomeData: IDrawerProps["boxes"] = {
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

const throwsInAwayData: IDrawerProps["boxes"] = {
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

const goalKickHomeData: IDrawerProps["boxes"] = {
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

const goalKickAwayData: IDrawerProps["boxes"] = {
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

const headGoalsHomeData: IDrawerProps["boxes"] = {
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

const headGoalsAwayData: IDrawerProps["boxes"] = {
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
      key: "First Assist - Home",
      data: [
        { name: faker.person.fullName(), odds: 1.5 },
        { name: faker.person.fullName(), odds: 2.2 },
        { name: faker.person.fullName(), odds: 3.3 },
      ],
    },
    {
      key: "First Assist - Away",
      data: [
        { name: faker.person.fullName(), odds: 1.9 },
        { name: faker.person.fullName(), odds: 2.5 },
        { name: faker.person.fullName(), odds: 3.1 },
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
        { name: "Home", odds: 1.5 },
        { name: "X", odds: 2.2 },
        { name: "Away", odds: 3.3 },
      ],
    },
    {
      key: "30'",
      data: [
        { name: "Home", odds: 1.9 },
        { name: "X", odds: 2.5 },
        { name: "Away", odds: 3.1 },
      ],
    },
    {
      key: "45'",
      data: [
        { name: "Home", odds: 1.5 },
        { name: "X", odds: 2.2 },
        { name: "Away", odds: 3.3 },
      ],
    },
    {
      key: "60'",
      data: [
        { name: "Home", odds: 1.9 },
        { name: "X", odds: 2.5 },
        { name: "Away", odds: 3.1 },
      ],
    },
    {
      key: "75'",
      data: [
        { name: "Home", odds: 1.5 },
        { name: "X", odds: 2.2 },
        { name: "Away", odds: 3.3 },
      ],
    },
    {
      key: "90'",
      data: [
        { name: "Home", odds: 1.9 },
        { name: "X", odds: 2.5 },
        { name: "Away", odds: 3.1 },
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
    key: "Home goals - over",
    data: homeGoalData,
  },
  {
    key: "Away goals - over",
    data: awayGoalData,
  },
  {
    key: "Home goals - under",
    data: homeGoalData,
  },
  {
    key: "Away goals - under",
    data: awayGoalData,
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
    key: "Throws in - Home",
    data: throwsInHomeData,
  },
  {
    key: "Throws in - Away",
    data: throwsInAwayData,
  },
  {
    key: "Goal kick - Home",
    data: goalKickHomeData,
  },
  {
    key: "Goal kick - Away",
    data: goalKickAwayData,
  },
  {
    key: "Head goals - Home",
    data: headGoalsHomeData,
  },
  {
    key: "Head goals - Away",
    data: headGoalsAwayData,
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

const homePlayers: IPlayerProps["players"] = [
  { name: faker.person.fullName() },
  ...Array.from(
    { length: 11 },
    () => ({
      name: faker.person.fullName(),
    }),
  ),
];

const awayPlayers: IPlayerProps["players"] = [
  { name: faker.person.fullName() },
  ...Array.from(
    { length: 11 },
    () => ({
      name: faker.person.fullName(),
    }),
  ),
];

export default function Page({ params: { id } }: { params: { id: string } }) {
  const left = available.find((event) => event.id === +id)!;
  const right = available.find((event) =>
    event.id > available.length ? 1 : event.id === +id + 1
  )!;

  return (
    <main className="flex flex-col gap-2 text-xs">
      <Banner
        home={{ name: left.name, url: left.image }}
        away={{ name: right.name, url: right.image }}
        date={new Date().toLocaleDateString()}
        time={new Date().toLocaleTimeString()}
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
          team="Home"
          players={homePlayers}
        />
        <Players
          team="Away"
          players={awayPlayers}
        />
      </div>
      <Footer />
    </main>
  );
}
