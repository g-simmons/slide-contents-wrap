// Define a function to wrap the contents of each slide inside a div, except for the first child
window.RevealSlideContentsWrap = function () {
  return {
    id: "RevealSlideContentsWrap",
    init: function (deck) {
      // Get an array of all the slides in the deck
      const slides = deck.getSlides();

      // For each slide, get its children and the first child element
      slides.forEach((slide) => {
        const children = slide.children;
        const firstChild = children[0];

        // If the first child element is an H2 header, wrap the rest of the children in a div
        if (firstChild.tagName === "H2") {
          const otherChildren = Array.from(children).slice(1);
          const wrapper = document.createElement("div");
          wrapper.classList.add("slide-contents-wrap");
          otherChildren.forEach((child) => {
            wrapper.appendChild(child);
          });
          slide.appendChild(wrapper);

          // Define a function to dynamically resize the wrapper to fit the slide
          const resizeSlide = function () {
            // Calculate the slide height as a fixed value (700) minus the height of the first child element
            const slideHeight = 700 - firstChild.offsetHeight;

            // Get the current height of the wrapper div
            const wrapperheight = wrapper.offsetHeight;

            // Calculate the scale factor needed to fit the wrapper content inside the slide height
            const scaleFactor = wrapperheight > slideHeight ? slideHeight / wrapperheight : 1;

            // Apply the scale transform to the wrapper div
            wrapper.style.transform = `scale(${scaleFactor})`;
            wrapper.style.transformOrigin = 'top left';
          };

          // Bind the resize function to the window load, resize, and slidechanged events
          window.addEventListener('load', resizeSlide);
          window.addEventListener('resize', resizeSlide);
          deck.on('slidechanged', resizeSlide);
        }
      });
    },
  };
};
