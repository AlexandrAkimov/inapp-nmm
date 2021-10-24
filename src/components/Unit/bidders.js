export const bidders = [
  {
    bidder: "appnexus",
    paused: false,
    params: [
      {
        key: "placementId",
        value: "",
        type: "int",
        placeholder: "Placement ID - Example: 234234",
      },
    ],
    geo: []
  },
  {
    bidder: "gumgum",
    paused: false,
    params: [
      {
        key: "zone",
        value: "",
        type: "string",
      },
    ],
    geo: []
  },
  {
    bidder: "ix",
    paused: false,
    params: [
      {
        key: "siteId",
        value: "",
        type: "string",
      },
      {
        key: "size",
        isSize: true, 
        value: "",
        type: "array.integer",
      },
    ],
    geo: []
  },
  {
    bidder: "openx",
    paused: false,
    params: [
      {
        key: "platform",
        value: "",
        type: "string",
      },
      {
        key: "unit",
        value: "",
        type: "string",
      },
    ],
    geo: []
  },
  {
    bidder: "pubmatic",
    paused: false,
    params: [
      {
        key: "publisherId",
        value: "",
        type: "string",
        placeholder: "Publisher ID - Example: 32572",
      },
      {
        key: "adSlot",
        value: "",
        type: "string",
        placeholder: "Unit ID - Example: 38519891",
      },
      {
        key: "kadfloor",
        value: "",
        type: "string",
        placeholder: "Bid Floor - Example: 1.75",
      },
    ],
    geo: []
  },
  {
    bidder: "rhythmone",
    paused: false,
    params: [
      {
        key: "placementId",
        value: "",
        type: "string",
      },
      {
        key: "floor",
        value: "",
        type: "float",
      },
    ],
    geo: []
  },
  {
    bidder: "rubicon",
    paused: false,
    params: [
      {
        key: "accountId",
        value: "",
        type: "string",
      },
      {
        key: "siteId",
        value: "",
        type: "string",
      },
      {
        key: "zoneId",
        value: "",
        type: "string",
      },
      {
        key: "position",
        value: "",
        type: "string",
        isList: true
      },
    ],
    geo: []
  },
  {
    bidder: "triplelift",
    paused: false,
    params: [
      {
        key: "inventoryCode",
        value: "",
        type: "string",
      },
      {
        key: "floor",
        value: "",
        type: "float",
        isBidfloor: true,
        isMoney: true
      },
    ],
    geo: []
  },
  {
    bidder: "yieldmo",
    paused: false,
    params: [
      {
        key: "placementId",
        value: "",
        type: "string",
      },
    ],
    geo: []
  },
  {
    bidder: "audienceNetwork",
    paused: false,
    params: [
      {
        key: "placementId",
        value: "",
        type: "string",
      },
      {
        key: "publisherId",
        value: "",
        type: "string",
      },
    ],
    geo: []
  },
  {
    bidder: "direct ad",
    paused: false,
    params: [
      {
        key: "URL",
        value: "",
        type: "string",
        placeholder: "Enter URL",
      },
    ],
    geo: []
  },
]
