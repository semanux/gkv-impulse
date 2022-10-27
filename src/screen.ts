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
  "home-no-search": {
    src: "/app-home-no-search.jpg",
    height: 9740,
    links: [
      { x: 0, y: 115, width: 180, height: 180, link: "menu", },
      { x: 0, y: 760, width: 480, height: 440, link: "krankmeldung", },
      { x: 480, y: 760, width: 480, height: 440, link: "dokument", },
      { x: 0, y: 1200, width: 480, height: 440, link: "bescheinigung", },
      { x: 480, y: 1200, width: 480, height: 440, link: "meine-antraege", },
      { x: 0, y: 1655, width: 480, height: 440, link: "postfach", },
      { x: 480, y: 1655, width: 480, height: 440, link: "postfach", },
      { x: 0, y: 2100, width: 480, height: 440, link: "versichertenstatus", },
      { x: 0, y: 2250, width: 480, height: 440, link: "meine-daten", },
      { x: 480, y: 2250, width: 480, height: 440, link: "gesundheitskarte", },
      { x: 0, y: 3340, width: 480, height: 440, link: "gesundheitsdaten", },
      { x: 480, y: 3340, width: 480, height: 440, link: "medikation", },
      { x: 0, y: 3790, width: 480, height: 440, link: "vorsorge", },
      { x: 480, y: 3790, width: 480, height: 440, link: "impfungen", },
      { x: 0, y: 4240, width: 480, height: 440, link: "eau-bescheinigung", },
  ],
  },
  "menu": {
    src: "/app-menu.jpg",
    height: 3494,
    links: [{ x: 0, y: 450, width: 960, height: 170, link: "home-no-search", }],
  },
  "krankmeldung": {
    src: "/app-krankmeldung.jpg",
    height: 2079,
    links: [{ x: 0, y: 0, width: 350, height: 350, link: "home-no-search", }],
  },
  "dokument": {
    src: "/app-dokument.jpg",
    height: 2079,
    links: [{ x: 0, y: 0, width: 350, height: 350, link: "home-no-search", }],
  },
  "bescheinigung": {
    src: "/app-bescheinigung.jpg",
    height: 2079,
    links: [{ x: 0, y: 0, width: 350, height: 350, link: "home-no-search", }],
  },
  "meine-antraege": {
    src: "/app-meine-antraege.jpg",
    height: 2079,
    links: [{ x: 0, y: 0, width: 350, height: 350, link: "home-no-search", }],
  },
  "postfach": {
    src: "/app-postfach.jpg",
    height: 2079,
    links: [{ x: 0, y: 0, width: 350, height: 350, link: "home-no-search", }],
  },
  "versichtertenstatus": {
    src: "/app-versichtertenstatus.jpg",
    height: 2079,
    links: [{ x: 0, y: 0, width: 350, height: 350, link: "home-no-search", }],
  },
  "meine-daten": {
    src: "/meine-daten.jpg",
    height: 2079,
    links: [{ x: 0, y: 0, width: 350, height: 350, link: "home-no-search", }],
  },
  "gesundheitskarte": {
    src: "/app-gesundheitskarte.jpg",
    height: 2079,
    links: [{ x: 0, y: 0, width: 350, height: 350, link: "home-no-search", }],
  },
  "gesundheitsdaten": {
    src: "/app-gesundheitsdaten.jpg",
    height: 2079,
    links: [{ x: 0, y: 0, width: 350, height: 350, link: "home-no-search", }],
  },
  "medikation": {
    src: "/app-medikation.jpg",
    height: 2079,
    links: [{ x: 0, y: 0, width: 350, height: 350, link: "home-no-search", }],
  },
  "vorsorge": {
    src: "/app-vorsorge.jpg",
    height: 2079,
    links: [{ x: 0, y: 0, width: 350, height: 350, link: "home-no-search", }],
  },
  "impfungen": {
    src: "/app-impfungen.jpg",
    height: 2079,
    links: [{ x: 0, y: 0, width: 350, height: 350, link: "home-no-search", }],
  },
  "eau-bescheinigungen": {
    src: "/app-eau-bescheinigungen.jpg",
    height: 2079,
    links: [{ x: 0, y: 0, width: 350, height: 350, link: "home-no-search", }],
  },

}

export default screens;