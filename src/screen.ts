// Screens of the app.
export interface Link {
  x: number,
  y: number,
  width: number,
  height: number,
  link: string,
}

export interface Screen {
  src: string,
  height: number,
  links: Array<Link>,
}

// Map from links to screens.
const screens: Record<string, Screen> ={
  "home-no-search-inbox": {
    src: "/app-home-no-search-inbox.jpg",
    height: 9740,
    links: [
      { x: 0, y: 115, width: 180, height: 180, link: "menu", },
      { x: 0, y: 760, width: 480, height: 450, link: "krankmeldung", },
      { x: 480, y: 760, width: 480, height: 450, link: "dokument", },
      { x: 0, y: 1200, width: 480, height: 450, link: "bescheinigung", },
      { x: 480, y: 1200, width: 480, height: 450, link: "meine-antraege", },
      { x: 0, y: 1650, width: 480, height: 450, link: "versichertenstatus", },
      { x: 0, y: 2266, width: 480, height: 450, link: "meine-daten", },
      { x: 480, y: 2266, width: 480, height: 450, link: "gesundheitskarte", },
      { x: 0, y: 2885, width: 480, height: 450, link: "gesundheitsdaten", },
      { x: 480, y: 2885, width: 480, height: 450, link: "medikation", },
      { x: 0, y: 3336, width: 480, height: 450, link: "vorsorge", },
      { x: 480, y: 3336, width: 480, height: 450, link: "impfungen", },
      { x: 0, y: 3785, width: 480, height: 450, link: "eau-bescheinigung", },
  ],
  },
  "menu": {
    src: "/app-menu.jpg",
    height: 3494,
    links: [{ x: 0, y: 450, width: 960, height: 170, link: "home-no-search-inbox", }],
  },
  "krankmeldung": {
    src: "/app-krankmeldung.jpg",
    height: 2079,
    links: [{ x: 0, y: 0, width: 350, height: 350, link: "home-no-search-inbox", }],
  },
  "dokument": {
    src: "/app-dokument.jpg",
    height: 2079,
    links: [{ x: 0, y: 0, width: 350, height: 350, link: "home-no-search-inbox", }],
  },
  "bescheinigung": {
    src: "/app-bescheinigung.jpg",
    height: 2079,
    links: [{ x: 0, y: 0, width: 350, height: 350, link: "home-no-search-inbox", }],
  },
  "meine-antraege": {
    src: "/app-meine-antraege.jpg",
    height: 2079,
    links: [{ x: 0, y: 0, width: 350, height: 350, link: "home-no-search-inbox", }],
  },
  "postfach": {
    src: "/app-postfach.jpg",
    height: 2079,
    links: [{ x: 0, y: 0, width: 350, height: 350, link: "home-no-search-inbox", }],
  },
  "versichertenstatus": {
    src: "/app-versichertenstatus.jpg",
    height: 2079,
    links: [{ x: 0, y: 0, width: 350, height: 350, link: "home-no-search-inbox", }],
  },
  "meine-daten": {
    src: "/meine-daten.jpg",
    height: 2079,
    links: [{ x: 0, y: 0, width: 350, height: 350, link: "home-no-search-inbox", }],
  },
  "gesundheitskarte": {
    src: "/app-gesundheitskarte.jpg",
    height: 2079,
    links: [{ x: 0, y: 0, width: 350, height: 350, link: "home-no-search-inbox", }],
  },
  "gesundheitsdaten": {
    src: "/app-gesundheitsdaten.jpg",
    height: 2079,
    links: [{ x: 0, y: 0, width: 350, height: 350, link: "home-no-search-inbox", }],
  },
  "medikation": {
    src: "/app-medikation.jpg",
    height: 2079,
    links: [{ x: 0, y: 0, width: 350, height: 350, link: "home-no-search-inbox", }],
  },
  "vorsorge": {
    src: "/app-vorsorge.jpg",
    height: 2079,
    links: [{ x: 0, y: 0, width: 350, height: 350, link: "home-no-search-inbox", }],
  },
  "impfungen": {
    src: "/app-impfungen.jpg",
    height: 2079,
    links: [{ x: 0, y: 0, width: 350, height: 350, link: "home-no-search-inbox", }],
  },
  "eau-bescheinigungen": {
    src: "/app-eau-bescheinigungen.jpg",
    height: 2079,
    links: [{ x: 0, y: 0, width: 350, height: 350, link: "home-no-search-inbox", }],
  },

}

export default screens;