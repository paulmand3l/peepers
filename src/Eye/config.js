export const features = {
  upperLid: [
    { x: 0,     y: 240/4 },
    { x: 240/2, y: 0 },
    { x: 240,   y: 240/4},
  ],
  lowerLid: [
    { x: 0,     y: 3*240/4 },
    { x: 240/2, y: 240 },
    { x: 240,   y: 3*240/4 },
  ]
};

export const muscles = {
  superiorTarsal: {
    strength: 20,
    stroke: 10,
    origin: { x: 240/2, y: -240 },
    attachments: {
      upperLid: [.2, 1, .2],
    }
  },
  inferiorTarsal: {
    strength: 20,
    stroke: 10,
    origin: { x: 240/2, y: 2*240 },
    strength: 20,
    stroke: 10,
    attachments: {
      lowerLid: [.2, 1, .2],
    }
  },
  levatorPalpabraeSuperioris: {
    strength: 50,
    stroke: 240/2,
    origin: { x: 240/2, y: -240 },
    attachments: {
      upperLid: [.2, 1, .2],
    }
  },
  superiorOrbicularisOculi: {
    strength: 50,
    stroke: 240/2,
    origin: { x: 240/2, y: -240 },
    attachments: {
      upperLid: [.75, 1, .75]
    }
  },
  inferiorOrbicularisOculi: {
    strength: 50,
    stroke: 240/2,
    origin: { x: 240/2, y: 2*240 },
    attachments: {
      lowerLid: [.75, 1, .75],
    }
  },
  corrugator: {
    strength: 50,
    stroke: 240/4,
    origin: { x: -240, y: 0 },
    attachments: {
      upperLid: [1, .5, 0],
    },
  },
  procerus: {
    strength: 50,
    stroke: 240/4,
    origin: { x: -120, y: 120},
    attachments: {
      upperLid: [1, .5, 0],
    }
  },
  medialFrontalis: {
    strength: 30,
    stroke: 240/2,
    origin: { x: 0, y: -240*3},
    attachments: {
      upperLid: [1, .5, 0],
    }
  },
  lateralFrontalis: {
    strength: 30,
    stroke: 240/2,
    origin: { x: 240, y: -240*3},
    attachments: {
      upperLid: [0, .5, 1],
    }
  },
  levatorLabii: {
    strength: 30,
    stroke: 240/3,
    origin: { x: 0, y: -120 },
    attachments: {
      lowerLid: [1, .5, 0],
    }
  },
  zygomaticus: {
    strength: 30,
    stroke: 240/2,
    origin: { x: 3 * 240, y: 120 },
    attachments: {
      lowerLid: [.5, .8, .1],
    }
  }
}


export const recipes = {
  positive: {
    superiorTarsal: 1,
    inferiorTarsal: 1,
    levatorLabii: 1,
    zygomaticus: 1,
  },
  negative: {
    superiorTarsal: .5,
    inferiorTarsal: .5,
    superiorOrbicularisOculi: .5,
    inferiorOrbicularisOculi: .5,
    corrugator: .5,
    medialFrontalis: .5,
  },

  inward: {
    superiorTarsal: .5,
    inferiorTarsal: .5,
    levatorPalpabraeSuperioris: .5,
  },
  outward: {
    superiorOrbicularisOculi: 1,
    inferiorOrbicularisOculi: 1,
  },

  future: {

  },
  past: {

  },

  surprise: {
    superiorTarsal: 1,
    inferiorTarsal: 1,
    levatorPalpabraeSuperioris: 1,
    medialFrontalis: 1,
    lateralFrontalis: 1,
  }
}
