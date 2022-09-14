// Used for creating brand-new wiki pages.
export const BLANK_PAGE = {
    title: "",
    history: {
        0: {
            comment: "Page Created",
            user: "",
            created: "",
            content: {
                box: {
                    devNum: 1,
                    platNum: 0,
                    relNum: 1,
                    clientNum: 1,
                    tagNum: 1,


                    cover: {
                        link: "",
                        alt: ""
                    },

                    website: {
                        link: "",
                        alt: ""
                    },

                    developers: {
                        0: {
                            link: "",
                            alt: "",
                        }
                    },

                    publisher: {
                        link: "",
                        alt: ""
                    },

                    platforms: {},

                    releases: {
                        0: {
                            client: "",
                            date: ""
                        }
                    },

                    clients: {
                        0: {
                            link: "",
                            alt: ""
                        }
                    },

                    tags: {
                        0: ""
                    }
                },
                summary: {
                    0: ""
                },
                sumNum: 1,
                subNum: 1,
                subs: {
                    external: {
                        links: {
                            0: {
                                link: "",
                                alt: ""
                            }
                        },
                        linkNum: 0
                    }
                }
            }
        }
    }
}

// Blank game object used to created new pages.
export const BLANK_GAME = {
    title: "",
    created: "",
    views: 0,
    cover: "",
    publisher: "",
    developers: {},
    platforms: {},
    tags: {}
}