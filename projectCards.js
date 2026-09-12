import projects from "./projects.js";


/* =========================================================
   CREATE TAG GROUP
   ========================================================= */

function createTagGroup(tags) {

    const group = document.createElement("div");

    group.className = "tag-group";

    tags.forEach(tagText => {

        const tag = document.createElement("span");

        tag.className = "tag";
        tag.textContent = tagText;

        group.appendChild(tag);

    });

    return group;
}


/* =========================================================
   CREATE PROJECT CARD
   ========================================================= */

function createProjectCard(project) {

    /* ---------------------------------------------------------
       CARD
       --------------------------------------------------------- */

    const card = document.createElement("article");

    card.className = "project-card";


    /* ---------------------------------------------------------
       IMAGE CONTAINER
       --------------------------------------------------------- */

    const imageContainer =
        document.createElement("div");

    imageContainer.className =
        "project-image-container";


    /* ---------------------------------------------------------
       IMAGE
       --------------------------------------------------------- */

    const image =
        document.createElement("img");

    image.className =
        "project-image";

    image.src =
        project.images[0];

    image.alt =
        project.title;


    /* ---------------------------------------------------------
       IMAGE COUNTER
       --------------------------------------------------------- */

    const imageCounter =
        document.createElement("div");

    imageCounter.className =
        "image-counter";

    imageCounter.textContent =
        `1 / ${project.images.length}`;


    imageContainer.appendChild(image);
    imageContainer.appendChild(imageCounter);


    /* ---------------------------------------------------------
       CONTENT
       --------------------------------------------------------- */

    const content =
        document.createElement("div");

    content.className =
        "project-content";


    /* ---------------------------------------------------------
       TITLE
       --------------------------------------------------------- */

    const title =
        document.createElement("h2");

    title.className =
        "project-title";

    title.textContent =
        project.title;


    /* ---------------------------------------------------------
       SUMMARY
       --------------------------------------------------------- */

    const summary =
        document.createElement("p");

    summary.className =
        "project-summary";

    summary.textContent =
        project.summary;


    /* ---------------------------------------------------------
       TAG CONTAINER
       --------------------------------------------------------- */

    const tagsContainer =
        document.createElement("div");

    tagsContainer.className =
        "tags-container";


    /* ---------------------------------------------------------
       TAG TRACK
       --------------------------------------------------------- */

    const tagsTrack =
        document.createElement("div");

    tagsTrack.className =
        "tags-track";


    /*
     * Two identical groups are required for the
     * continuous scrolling animation.
     */

    const firstGroup =
        createTagGroup(project.tags);

    const secondGroup =
        createTagGroup(project.tags);


    tagsTrack.appendChild(firstGroup);
    tagsTrack.appendChild(secondGroup);

    tagsContainer.appendChild(tagsTrack);


    /* ---------------------------------------------------------
       BUILD CONTENT
       --------------------------------------------------------- */

    content.appendChild(title);
    content.appendChild(summary);
    content.appendChild(tagsContainer);


    /* ---------------------------------------------------------
       BUILD CARD
       --------------------------------------------------------- */

    card.appendChild(imageContainer);
    card.appendChild(content);


    /* =========================================================
       IMAGE SLIDESHOW
       ========================================================= */

    let currentImageIndex = 0;


    function changeImage() {

        /*
         * No slideshow necessary if there is only one image.
         */

        if (project.images.length <= 1) {
            return;
        }


        /*
         * Fade out current image.
         */

        image.classList.add("changing");


        setTimeout(() => {

            currentImageIndex++;


            /*
             * Return to first image after the last one.
             */

            if (
                currentImageIndex >=
                project.images.length
            ) {

                currentImageIndex = 0;

            }


            /*
             * Change image.
             */

            image.src =
                project.images[currentImageIndex];


            /*
             * Update counter.
             */

            imageCounter.textContent =
                `${currentImageIndex + 1} / ${project.images.length}`;


            /*
             * Fade image back in.
             */

            image.classList.remove("changing");

        }, 250);

    }


    /*
     * Each card gets its own slideshow timer.
     */

    setInterval(changeImage, 4000);


    return card;
}


/* =========================================================
   CREATE ALL PROJECT CARDS
   ========================================================= */

function createProjectCards() {

    const cards = projects.map(project => {

        return createProjectCard(project);

    });

    return cards;
}


/* =========================================================
   EXPORT
   ========================================================= */

export default createProjectCards;
