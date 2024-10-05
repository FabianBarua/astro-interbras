export interface Root {
  products: Category[];
}

export interface Category {
  id: string;
  name: string;
  children: Children[];
  description: string;
  shortDescription: string;
}

export interface Children {
  id: string;
  name: string;
  popular: boolean;
  info: Info;
  variants: Variant[];
}

export interface Info {
  review: string;
  included: string | null;
  specs: string;
}

export interface Variant {
  id: string;
  name: string;
  color: string;
  photos: string[];
}

const airfryer: Category = {
  id: "airfryer",
  name: "airfryer.name",
  description: "airfryer.description",
  shortDescription: "airfryer.shortDescription",
  children: [
    {
      id: "s10",
      name: "airfryer.children.s10.name",
      popular: true,
      info: {
        review: "airfryer.children.s10.info.review",
        included: null,
        specs: "airfryer.children.s10.info.specs",
      },
      variants: [
        {
          id: "s10-1",
          name: "Airfryer S10 - 1",
          color: "colors.black",
          photos: ["/productos/airfryer/s10-v1-1.webp"],
        },
        {
          id: "s10-2",
          name: "Airfryer S10 - 2",
          color: "colors.white",
          photos: ["/productos/airfryer/s10-v2-1.webp"],
        },
      ],
    },
    {
      id: "s20",
      name: "airfryer.children.s20.name",
      popular: false,
      info: {
        review: "airfryer.children.s20.info.review",
        included: null,
        specs: "airfryer.children.s20.info.specs",
      },
      variants: [
        {
          id: "s20-1",
          name: "Airfryer S20 - 1",
          color: "colors.black",
          photos: ["/productos/airfryer/s20-v1-1.webp"],
        },
        {
          id: "s20-2",
          name: "Airfryer S20 - 2",
          color: "colors.white",
          photos: ["/productos/airfryer/s20-v2-1.webp"],
        },
      ],
    },
    {
      id: "s30",
      name: "airfryer.children.s30.name",
      popular: false,
      info: {
        review: "airfryer.children.s30.info.review",
        included: null,
        specs: "airfryer.children.s30.info.specs",
      },
      variants: [
        {
          id: "s30-1",
          name: "Airfryer S30 - 1",
          color: "colors.inox",
          photos: ["/productos/airfryer/s30-v1-1.webp"],
        },
      ],
    },
    {
      id: "s40",
      name: "airfryer.children.s40.name",
      popular: false,
      info: {
        review: "airfryer.children.s40.info.review",
        included: null,
        specs: "airfryer.children.s40.info.specs",
      },
      variants: [
        {
          id: "s40-1",
          name: "Airfryer S40 - 1",
          color: "colors.black",
          photos: ["/productos/airfryer/s40-v1-1.webp"],
        },
      ],
    },
  ],
};

const scooters: Category = {
  id: "scooters",
  name: "scooters.name",
  description: "scooters.description",
  shortDescription: "scooters.shortDescription",
  children: [
    {
      id: "8.5",
      name: "scooters.children.85.name",
      popular: true,
      info: {
        review: "scooters.children.85.info.review",
        included: null,
        specs: "scooters.children.85.info.specs",
      },
      variants: [
        {
          id: "8.5-1",
          name: "Scooter 8.5 - 1",
          color: "colors.black",
          photos: ["/productos/scooters/8.5-v1-1.webp"],
        },
      ],
    },
    {
      id: "10.5pro",
      name: "scooters.children.10pro.name",
      popular: false,
      info: {
        review: "scooters.children.10pro.info.review",
        included: null,
        specs: "scooters.children.10pro.info.specs",
      },
      variants: [
        {
          id: "10.5pro-1",
          name: "Scooter 10.5 Pro - 1",
          color: "colors.black",
          photos: ["/productos/scooters/10.5pro-v1-1.webp"],
        },
      ],
    },
    {
      id: "cross",
      name: "scooters.children.cross.name",
      popular: false,
      info: {
        review: "scooters.children.cross.info.review",
        included: null,
        specs: "scooters.children.cross.info.specs",
      },
      variants: [
        {
          id: "cross-1",
          name: "Scooter Cross - 1",
          color: "colors.black",
          photos: ["/productos/scooters/cross-v1-1.webp"],
        },
      ],
    },
    {
      id: "crosspro",
      name: "scooters.children.crosspro.name",
      popular: false,
      info: {
        review: "scooters.children.crosspro.info.review",
        included: null,
        specs: "scooters.children.crosspro.info.specs",
      },
      variants: [
        {
          id: "crosspro-1",
          name: "Scooter Cross Pro - 1",
          color: "colors.black",
          photos: ["/productos/scooters/crosspro-v1-1.webp"],
        },
      ],
    },
  ],
};

const aires: Category = {
  id: "aires",
  name: "aires.name",
  description: "aires.description",
  shortDescription: "aires.shortDescription",
  children: [
    {
      id: "itb-12000iv",
      name: "aires.children.1.name",
      popular: false,
      info: {
        review: "aires.children.1.info.review",
        included: null,
        specs: "aires.children.1.info.specs",
      },
      variants: [
        {
          id: "itb-12000iv-1",
          name: "ITB 12000IV - 1",
          color: "colors.white",
          photos: ["/productos/aires/general.webp"],
        },
      ],
    },
    {
      id: "itp-12000iv",
      name: "aires.children.2.name",
      popular: false,
      info: {
        review: "aires.children.2.info.review",
        included: null,
        specs: "aires.children.2.info.specs",
      },
      variants: [
        {
          id: "itp-12000iv-1",
          name: "ITP 12000IV - 1",
          color: "colors.white",
          photos: ["/productos/aires/general.webp"],
        },
      ],
    },
    {
      id: "itb-12000of",
      name: "aires.children.3.name",
      popular: false,
      info: {
        review: "aires.children.3.info.review",
        included: null,
        specs: "aires.children.3.info.specs",
      },
      variants: [
        {
          id: "itp-12000iv-1",
          name: "ITB 12000OF - 1",
          color: "colors.white",
          photos: ["/productos/aires/general.webp"],
        },
      ],
    },
    {
      id: "itp-12000of",
      name: "aires.children.4.name",
      popular: false,
      info: {
        review: "aires.children.4.info.review",
        included: null,
        specs: "aires.children.4.info.specs",
      },
      variants: [
        {
          id: "itp-12000iv-1",
          name: "ITP 12000OF - 1",
          color: "colors.white",
          photos: ["/productos/aires/general.webp"],
        },
      ],
    },
    {
      id: "itb-18000iv",
      name: "aires.children.5.name",
      popular: false,
      info: {
        review: "aires.children.5.info.review",
        included: null,
        specs: "aires.children.5.info.specs",
      },
      variants: [
        {
          id: "itb-18000iv-1",
          name: "ITP 12000OF - 1",
          color: "colors.white",
          photos: ["/productos/aires/general.webp"],
        },
      ],
    },
    {
      id: "itb-24000iv",
      name: "aires.children.6.name",
      popular: false,
      info: {
        review: "aires.children.6.info.review",
        included: null,
        specs: "aires.children.6.info.specs",
      },
      variants: [
        {
          id: "itb-24000iv-1",
          name: "ITB 24000IV - 1",
          color: "colors.white",
          photos: ["/productos/aires/general.webp"],
        },
      ],
    },
  ],
};

const tvs: Category = {
  id: "tvs",
  name: "tvs.name",
  description: "tvs.description",
  shortDescription: "tvs.shortDescription",
  children: [
    {
      id: "IN3200TV",
      name: "tvs.children.1.name",
      popular: false,
      info: {
        review: "tvs.children.1.info.review",
        included: null,
        specs: "tvs.children.1.info.specs",
      },
      variants: [
        {
          id: "IN3200TV-1",
          name: "IN3200TV - 1",
          color: "colors.black",
          photos: [
            "/productos/tvs/IN3200TV-1.webp",
            "/productos/tvs/IN3200TV-2.webp",
            "/productos/tvs/IN3200TV-3.webp",
          ],
        },
      ],
    },
    {
      id: "IN4300TV",
      name: "tvs.children.2.name",
      popular: false,
      info: {
        review: "tvs.children.2.info.review",
        included: null,
        specs: "tvs.children.2.info.specs",
      },
      variants: [
        {
          id: "IN4300TV-1",
          name: "IN4300TV - 1",
          color: "colors.black",
          photos: [
            "/productos/tvs/IN4300TV-1.webp",
            "/productos/tvs/IN4300TV-2.webp",
            "/productos/tvs/IN4300TV-3.webp",
            "/productos/tvs/IN4300TV-4.webp",
          ],
        },
      ],
    },
    {
      id: "IN5000TV",
      name: "tvs.children.3.name",
      popular: false,
      info: {
        review: "tvs.children.3.info.review",
        included: null,
        specs: "tvs.children.3.info.specs",
      },
      variants: [
        {
          id: "IN5000TV-1",
          name: "IN5000TV - 1",
          color: "colors.black",
          photos: [
            "/productos/tvs/IN5000TV-1.webp",
            "/productos/tvs/IN5000TV-2.webp",
            "/productos/tvs/IN5000TV-3.webp",
            "/productos/tvs/IN5000TV-4.webp",
          ],
        },
      ],
    },
    {
      id: "IN5500TV",
      name: "tvs.children.4.name",
      popular: false,
      info: {
        review: "tvs.children.4.info.review",
        included: null,
        specs: "tvs.children.4.info.specs",
      },
      variants: [
        {
          id: "IN5500TV-1",
          name: "IN5500TV - 1",
          color: "colors.black",
          photos: [
            "/productos/tvs/IN5500TV-1.webp",
            "/productos/tvs/IN5500TV-2.webp",
            "/productos/tvs/IN5500TV-3.webp",
            "/productos/tvs/IN5500TV-4.webp",
          ],
        },
      ],
    },
    {
      id: "IN6500TV",
      name: "tvs.children.5.name",
      popular: false,
      info: {
        review: "tvs.children.5.info.review",
        included: null,
        specs: "tvs.children.5.info.specs",
      },
      variants: [
        {
          id: "IN6500TV-1",
          name: "IN6500TV - 1",
          color: "colors.black",
          photos: [
            "/productos/tvs/IN6500TV-1.webp",
            "/productos/tvs/IN6500TV-2.webp",
            "/productos/tvs/IN6500TV-3.webp",
            "/productos/tvs/IN6500TV-4.webp",
          ],
        },
      ],
    },
    {
      id: "IN7500TV",
      name: "tvs.children.6.name",
      popular: false,
      info: {
        review: "tvs.children.6.info.review",
        included: null,
        specs: "tvs.children.6.info.specs",
      },
      variants: [
        {
          id: "IN7500TV-1",
          name: "IN7500TV - 1",
          color: "colors.black",
          photos: [
            "/productos/tvs/IN7500TV-1.webp",
            "/productos/tvs/IN7500TV-2.webp",
            "/productos/tvs/IN7500TV-3.webp",
            "/productos/tvs/IN7500TV-4.webp",
          ],
        },
      ],
    },
    {
      id: "IN8500TV",
      name: "tvs.children.7.name",
      popular: false,
      info: {
        review: "tvs.children.7.info.review",
        included: null,
        specs: "tvs.children.7.info.specs",
      },
      variants: [
        {
          id: "IN8500TV-1",
          name: "IN8500TV - 1",
          color: "colors.black",
          photos: [
            "/productos/tvs/IN8500TV-1.webp",
            "/productos/tvs/IN8500TV-2.webp",
            "/productos/tvs/IN8500TV-3.webp",
            "/productos/tvs/IN8500TV-4.webp",
          ],
        },
      ],
    },
  ],
};

const mixteras: Category = {
  id: "mixteras",
  name: "mixteras.name",
  description: "mixteras.description",
  shortDescription: "mixteras.shortDescription",
  children: [
    {
      id: "G10",
      name: "mixteras.children.G10.name",
      popular: false,
      info: {
        review: "mixteras.children.G10.info.review",
        included: null,
        specs: "mixteras.children.G10.info.specs",
      },
      variants: [
        {
          id: "G10",
          name: "G10",
          color: "colors.black",
          photos: ["/productos/mixteras/G10-1.webp"],
        },
      ],
    },
    {
      id: "G20",
      name: "mixteras.children.G20.name",
      popular: false,
      info: {
        review: "mixteras.children.G20.info.review",
        included: null,
        specs: "mixteras.children.G20.info.specs",
      },
      variants: [
        {
          id: "G20",
          name: "G20",
          color: "colors.black",
          photos: ["/productos/mixteras/G20-1.webp"],
        },
      ],
    },
    {
      id: "G30",
      name: "mixteras.children.G30.name",
      popular: false,
      info: {
        review: "mixteras.children.G30.info.review",
        included: null,
        specs: "mixteras.children.G30.info.specs",
      },
      variants: [
        {
          id: "G30",
          name: "G30",
          color: "colors.black",
          photos: ["/productos/mixteras/G30-1.webp"],
        },
      ],
    },
    {
      id: "G40",
      name: "mixteras.children.G40.name",
      popular: false,
      info: {
        review: "mixteras.children.G40.info.review",
        included: null,
        specs: "mixteras.children.G40.info.specs",
      },
      variants: [
        {
          id: "G40",
          name: "G40",
          color: "colors.black",
          photos: ["/productos/mixteras/G40-1.webp"],
        },
      ],
    },
    {
      id: "G50",
      name: "mixteras.children.G50.name",
      popular: false,
      info: {
        review: "mixteras.children.G50.info.review",
        included: null,
        specs: "mixteras.children.G50.info.specs",
      },
      variants: [
        {
          id: "G50",
          name: "G50",
          color: "colors.black",
          photos: ["/productos/mixteras/G50-1.webp"],
        },
      ],
    },
  ],
};

const cocinas: Category = {
  id: "cocinas",
  name: "cocinas.name",
  description: "cocinas.description",
  shortDescription: "cocinas.shortDescription",
  children: [
    {
      id: "C10",
      name: "cocinas.children.C10.name",
      popular: false,
      info: {
        review: "cocinas.children.C10.info.review",
        included: null,
        specs: "cocinas.children.C10.info.specs",
      },
      variants: [
        {
          id: "C10",
          name: "C10",
          color: "colors.white",
          photos: ["/productos/cocinas/C10-1.webp"],
        },
      ],
    },
    {
      id: "C20",
      name: "cocinas.children.C20.name",
      popular: false,
      info: {
        review: "cocinas.children.C20.info.review",
        included: null,
        specs: "cocinas.children.C20.info.specs",
      },
      variants: [
        {
          id: "C20",
          name: "C20",
          color: "colors.black",
          photos: ["/productos/cocinas/C20-1.webp"],
        },
      ],
    },
    {
      id: "C30",
      name: "Cocina electrica C30",
      popular: false,
      info: {
        review: "cocinas.children.C30.info.review",
        included: null,
        specs: "cocinas.children.C30.info.specs",
      },
      variants: [
        {
          id: "C30",
          name: "C30",
          color: "colors.black",
          photos: ["/productos/cocinas/C30-1.webp"],
        },
      ],
    },
  ],
};

const hervidoras: Category = {
  id: "hervidoras",
  name: "hervidoras.name",
  description: "hervidoras.description",
  shortDescription: "hervidoras.shortDescription",
  children: [
    {
      id: "T10",
      name: "hervidoras.children.T10.name",
      popular: false,
      info: {
        review: "hervidoras.children.T10.info.review",
        included: null,
        specs: "hervidoras.children.T10.info.specs",
      },
      variants: [
        {
          id: "T10",
          name: "T10",
          color: "Inox",
          photos: ["/productos/hervidoras/T10-1.webp"],
        },
      ],
    },
    {
      id: "T20",
      name: "hervidoras.children.T20.name",
      popular: false,
      info: {
        review: "hervidoras.children.T20.info.review",
        included: null,
        specs: "hervidoras.children.T20.info.specs",
      },
      variants: [
        {
          id: "T20",
          name: "T20",
          color: "colors.white",
          photos: ["/productos/hervidoras/T20-1.webp"],
        },
      ],
    },
    {
      id: "T30",
      name: "hervidoras.children.T30.name",
      popular: false,
      info: {
        review: "hervidoras.children.T30.info.review",
        included: null,
        specs: "hervidoras.children.T30.info.specs",
      },
      variants: [
        {
          id: "T30",
          name: "T30",
          color: "colors.black",
          photos: ["/productos/hervidoras/T30-1.webp"],
        },
      ],
    },
  ],
};

const cafeteras: Category = {
  id: "cafeteras",
  name: "cafeteras.name",
  description: "cafeteras.description",
  shortDescription: "cafeteras.shortDescription",
  children: [
    {
      id: "E10",
      name: "cafeteras.children.E10.name",
      popular: false,
      info: {
        review: "cafeteras.children.E10.info.review",
        included: null,
        specs: "cafeteras.children.E10.info.specs",
      },
      variants: [
        {
          id: "E10",
          name: "E10",
          color: "colors.inox",
          photos: ["/productos/cafeteras/E10-1.webp"],
        },
      ],
    },
  ],
};

const planchas: Category = {
  id: "planchas",
  name: "planchas.name",
  description: "planchas.description",
  shortDescription: "planchas.shortDescription",
  children: [
    {
      id: "F10",
      name: "planchas.children.F10.name",
      popular: false,
      info: {
        review: "planchas.children.F10.info.review",
        included: null,
        specs: "planchas.children.F10.info.specs",
      },
      variants: [
        {
          id: "F10",
          name: "F10",
          color: "colors.RedAndBlack",
          photos: ["/productos/planchas/F10-1.webp"],
        },
      ],
    },
    {
      id: "F20",
      name: "planchas.children.F20.name",
      popular: false,
      info: {
        review: "planchas.children.F20.info.review",
        included: null,
        specs: "planchas.children.F20.info.specs",
      },
      variants: [
        {
          id: "F20",
          name: "F20",
          color: "colors.RedAndBlack",
          photos: ["/productos/planchas/F20-1.webp"],
        },
      ],
    },
    {
      id: "F30",
      name: "planchas.children.F30.name",
      popular: false,
      info: {
        review: "planchas.children.F30.info.review",
        included: null,
        specs: "planchas.children.F30.info.specs",
      },
      variants: [
        {
          id: "F30",
          name: "F30",
          color: "colors.BlueAndWhite",
          photos: ["/productos/planchas/F30-1.webp"],
        },
      ],
    },
    {
      id: "F40",
      name: "planchas.children.F40.name",
      popular: false,
      info: {
        review: "planchas.children.F40.info.review",
        included: null,
        specs: "planchas.children.F40.info.specs",
      },
      variants: [
        {
          id: "F40",
          name: "F40",
          color: "colors.GrayAndBronze",
          photos: ["/productos/planchas/F40-1.webp"],
        },
      ],
    },
    {
      id: "F50",
      name: "planchas.children.F50.name",
      popular: false,
      info: {
        review: "planchas.children.F50.info.review",
        included: null,
        specs: "planchas.children.F50.info.specs",
      },
      variants: [
        {
          id: "F50",
          name: "F50",
          color: "colors.black",
          photos: ["/productos/planchas/F50-1.webp"],
        },
      ],
    },
  ],
};

const licuadoras: Category = {
  id: "licuadoras",
  name: "licuadoras.name",
  description: "licuadoras.description",
  shortDescription: "licuadoras.shortDescription",
  children: [
    {
      id: "L10",
      name: "licuadoras.children.L10.name",
      popular: false,
      info: {
        review: "licuadoras.children.L10.info.review",
        included: "licuadoras.children.L10.info.included",
        specs: "licuadoras.children.L10.info.specs",
      },
      variants: [
        {
          id: "L10",
          name: "L10",
          color: "colors.white",
          photos: ["/productos/licuadoras/L10-1.webp"],
        },
      ],
    },
    {
      id: "L20",
      name: "licuadoras.children.L20.name",
      popular: false,
      info: {
        review: "licuadoras.children.L20.info.review",
        included: "licuadoras.children.L20.info.included",
        specs: "licuadoras.children.L20.info.specs",
      },
      variants: [
        {
          id: "L20",
          name: "L20",
          color: "colors.white",
          photos: [
            "/productos/licuadoras/L20-1.webp",
            "/productos/licuadoras/L20-2.webp",
            "/productos/licuadoras/L20-3.webp",
          ],
        },
      ],
    },
    {
      id: "L30",
      name: "licuadoras.children.L30.name",
      popular: false,
      info: {
        review: "licuadoras.children.L30.info.review",
        included: "licuadoras.children.L30.info.included",
        specs: "licuadoras.children.L30.info.specs",
      },
      variants: [
        {
          id: "L30",
          name: "L30",
          color: "colors.black",
          photos: ["/productos/licuadoras/L30-1.webp"],
        },
      ],
    },
    {
      id: "L40",
      name: "licuadoras.children.L40.name",
      popular: false,
      info: {
        review: "licuadoras.children.L40.info.review",
        included: "licuadoras.children.L40.info.included",
        specs: "licuadoras.children.L40.info.specs",
      },
      variants: [
        {
          id: "L40",
          name: "L40",
          color: "colors.black",
          photos: [
            "/productos/licuadoras/L40-1.webp",
            "/productos/licuadoras/L40-2.webp",
            "/productos/licuadoras/L40-3.webp",
          ],
        },
      ],
    },
  ],
};

const beauty: Category = {
  id: "beauty",
  name: "beauty.name",
  description: "beauty.description",
  shortDescription: "beauty.shortDescription",
  children: [
    {
      id: "603D",
      name: "beauty.children.603D.name",
      popular: false,
      info: {
        review: "beauty.children.603D.info.review",
        included: null,
        specs: "beauty.children.603D.info.specs",
      },
      variants: [
        {
          id: "603D",
          name: "603D",
          color: "colors.black",
          photos: ["/productos/beauty/603D-1.webp"],
        },
      ],
    },
    {
      id: "HB40",
      name: "beauty.children.HB40.name",
      popular: false,
      info: {
        review: "beauty.children.HB40.info.review",
        included: null,
        specs: "beauty.children.HB40.info.specs",
      },
      variants: [
        {
          id: "HB40",
          name: "HB40",
          color: "colors.black",
          photos: ["/productos/beauty/HB40-1.webp"],
        },
      ],
    },
    {
      id: "HD008",
      name: "beauty.children.HD008.name",
      popular: false,
      info: {
        review: "beauty.children.HD008.info.review",
        included: null,
        specs: "beauty.children.HD008.info.specs",
      },
      variants: [
        {
          id: "HD008",
          name: "HD008",
          color: "colors.black",
          photos: ["/productos/beauty/HD008-1.webp"],
        },
      ],
    },
    {
      id: "RFCD865",
      name: "beauty.children.RFCD865.name",
      popular: false,
      info: {
        review: "beauty.children.RFCD865.info.review",
        included: null,
        specs: "beauty.children.RFCD865.info.specs",
      },
      variants: [
        {
          id: "RFCD865",
          name: "RFCD865",
          color: "colors.golden",
          photos: ["/productos/beauty/RFCD865-1.webp"],
        },
      ],
    },
  ],
};

const batidoras: Category = {
  id: "batidoras",
  name: "batidoras.name",
  description: "batidoras.description",
  shortDescription: "batidoras.shortDescription",
  children: [
    {
      id: "B10",
      name: "batidoras.children.B10.name",
      popular: false,
      info: {
        review: "batidoras.children.B10.info.review",
        included: null,
        specs: "batidoras.children.B10.info.specs",
      },
      variants: [
        {
          id: "B10",
          name: "B10",
          color: "colors.blankAndWhite",
          photos: ["/productos/batidoras/B10-1.webp"],
        },
      ],
    },
    {
      id: "B20",
      name: "batidoras.children.B20.name",
      popular: false,
      info: {
        review: "batidoras.children.B20.info.review",
        included: null,
        specs: "batidoras.children.B20.info.specs",
      },
      variants: [
        {
          id: "B20",
          name: "B20",
          color: "colors.blackAndGray",
          photos: ["/productos/batidoras/B20-1.webp"],
        },
      ],
    },
    {
      id: "B30",
      name: "batidoras.children.B30.name",
      popular: false,
      info: {
        review: "batidoras.children.B30.info.review",
        included: null,
        specs: "batidoras.children.B30.info.specs",
      },
      variants: [
        {
          id: "B30",
          name: "B30",
          color: "colors.black",
          photos: ["/productos/batidoras/B30-1.webp"],
        },
      ],
    },
  ],
};

const arroceras: Category = {
  id: "arroceras",
  name: "arroceras.name",
  description: "arroceras.description",
  shortDescription: "arroceras.shortDescription",
  children: [
    {
      id: "A10",
      name: "arroceras.children.A10.name",
      popular: false,
      info: {
        review: "arroceras.children.A10.info.review",
        included: "arroceras.children.A10.info.included",
        specs: "arroceras.children.A10.info.specs",
      },
      variants: [
        {
          id: "A10",
          name: "A10",
          color: "Inox",
          photos: ["/productos/arroceras/A10-1.webp"],
        },
      ],
    },
    {
      id: "P10",
      name: "arroceras.children.P10.name",
      popular: false,
      info: {
        review: "arroceras.children.P10.info.review",
        included: null,
        specs: "arroceras.children.P10.info.specs",
      },
      variants: [
        {
          id: "P10",
          name: "P10",
          color: "colors.inox",
          photos: ["/productos/arroceras/P10-1.webp"],
        },
      ],
    },
  ],
};

const bebederos: Category = {
  id: "bebederos",
  name: "bebederos.name",
  description: "bebederos.description",
  shortDescription: "bebederos.shortDescription",
  children: [
    {
      id: "W10",
      name: "bebederos.children.W10.name",
      popular: false,
      info: {
        review: "bebederos.children.W10.info.review",
        included: null,
        specs: "bebederos.children.W10.info.specs",
      },
      variants: [
        {
          id: "W10",
          name: "W10",
          color: "colors.white",
          photos: ["/productos/bebederos/W10-1.webp"],
        },
      ],
    },
  ],
};

export const data: Root = {
  products: [
    tvs,
    scooters,
    aires,
    airfryer,
    mixteras,
    cocinas,
    hervidoras,
    cafeteras,
    planchas,
    licuadoras,
    beauty,
    batidoras,
    arroceras,
    bebederos,
  ],
};

export interface Urls {
  name: string;
  url: string;
}

export const getUrls = (): Urls[] => {
  const urls: Urls[] = data.products.map((product) => {
    return {
      name: product.name,
      url: "/productos/" + product.id,
    };
  });
  return urls;
};

export const getCategories = (): Category[] => {
  return data.products;
};

export const getCategory = ({ id }: { id: string }): Category => {
  const product = data.products.find((product) => product.id === id);
  return product as Category;
};

export const  getProductsByCategory = ({ id }: { id: string }): Category => {
  const products = data.products.filter((product) => product.id === id)[0];
  return products;
};
