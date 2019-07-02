import CMS from "netlify-cms";

CMS.registerEditorComponent({
  // Internal id of the component
  id: "customImage",
  // Visible label
  label: "Custom image",
  // Fields the user need to fill out when adding an instance of the component
  fields: [
    { name: "src", label: "Image", widget: "image" },
    { name: "alt", label: "Alt", widget: "string" },
    { name: "width", label: "Width (px), Optional", widget: "string" },
    {
      name: "size",
      label: "Size",
      widget: "select",
      options: [
        {
          label: "tiny",
          value: "tiny"
        },
        {
          label: "small",
          value: "small"
        },
        {
          label: "medium",
          value: "medium"
        },
        {
          label: "large",
          value: "large"
        }
      ]
    },
    {
      name: "align",
      label: "Align",
      widget: "select",
      options: [
        {
          label: "left",
          value: "left"
        },
        {
          label: "center",
          value: "center"
        },
        {
          label: "right",
          value: "right"
        }
      ]
    }
  ],
  // Pattern to identify a block as being an instance of this component

  pattern: /^start-custom-image(([\S\s])*)end-custom-image$/,
  // Function to extract data elements from the regexp match
  fromBlock: function(match) {
    console.log(match);
    let src = "";
    let width = "";
    let size = "";
    let alt = "";

    for (let i = 1; i < match.length; i += 2) {
      if (match[i] !== undefined) {
        if (match[i].indexOf("src") !== -1) {
          src = match[i + 1];
        } else if (match[i].indexOf("size") !== -1) {
          size = match[i + 1];
        } else if (match[i].indexOf("width") !== -1) {
          width = match[i + 1];
        } else if (match[i].indexOf("alt") !== -1) {
          alt = match[i + 1];
        }
      }
    }

    return {
      src,
      width,
      size,
      alt
    };
  },
  // Function to create a text block from an instance of this component
  toBlock: function(obj) {
    // prettier-ignore
    return `start-custom-image(size:${obj.size}|align:${obj.align}|width:${obj.width}|src:${obj.src}|alt:${obj.alt})end-custom-image`;
  },
  // Preview output for this component. Can either be a string or a React component
  // (component gives better render performance)
  toPreview: function(obj) {
    const output = `
            <img src=${obj.src} ${obj.width ? `width: ${obj.width}` : ""} alt=${
      obj.alt
    }>
        `;
    return output;
  }
});

// CMS.registerEditorComponent({
//   // Internal id of the component
//   id: "customImage",
//   // Visible label
//   label: "Custom image",
//   // Fields the user need to fill out when adding an instance of the component
//   fields: [
//     { name: "src", label: "Image", widget: "image" },
//     { name: "alt", label: "Alt", widget: "string" },
//     { name: "width", label: "Width (px), Optional", widget: "string" },
//     {
//       name: "size",
//       label: "Size",
//       widget: "select",
//       options: [
//         {
//           label: "tiny",
//           value: "tiny"
//         },
//         {
//           label: "small",
//           value: "small"
//         },
//         {
//           label: "medium",
//           value: "medium"
//         },
//         {
//           label: "large",
//           value: "large"
//         }
//       ]
//     },
//     {
//       name: "align",
//       label: "Align",
//       widget: "select",
//       options: [
//         {
//           label: "left",
//           value: "left"
//         },
//         {
//           label: "center",
//           value: "center"
//         },
//         {
//           label: "right",
//           value: "right"
//         }
//       ]
//     }
//   ],
//   // Pattern to identify a block as being an instance of this component

//   pattern: /^<div class="custom-image-container"(\S)*?>(\S)*?<\/div>$/,
//   // Function to extract data elements from the regexp match
//   fromBlock: function(match) {
//     console.log(match);
//     let src = "";
//     let width = "";
//     let size = "";
//     let alt = "";

//     for (let i = 1; i < match.length; i += 2) {
//       if (match[i] !== undefined) {
//         if (match[i].indexOf("src") !== -1) {
//           src = match[i + 1];
//         } else if (match[i].indexOf("size") !== -1) {
//           size = match[i + 1];
//         } else if (match[i].indexOf("width") !== -1) {
//           width = match[i + 1];
//         } else if (match[i].indexOf("alt") !== -1) {
//           alt = match[i + 1];
//         }
//       }
//     }

//     return {
//       src,
//       width,
//       size,
//       alt
//     };
//   },
//   // Function to create a text block from an instance of this component
//   toBlock: function(obj) {
//     // prettier-ignore
//     return `<div class="custom-image-container"${obj.size ? obj.size : ""}><img src="${obj.src}" ${obj.width ? `width="${obj.width}"` : ""} alt="${obj.alt}"></div>`;
//   },
//   // Preview output for this component. Can either be a string or a React component
//   // (component gives better render performance)
//   toPreview: function(obj) {
//     const output = `
//         <img src=${obj.src} ${obj.width ? `width: ${obj.width}` : ""} alt=${
//       obj.alt
//     }>
//     `;
//     return output;
//   }
// });
