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
          label: "Very tiny",
          value: "very-tiny"
        },
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
          label: "medium",
          value: "medium"
        },
        {
          label: "large",
          value: "large"
        },
        {
          label: "very large",
          value: "very-large"
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
    },
    {
      name: "description",
      label: "Description",
      widget: "string"
    }
  ],
  // Pattern to identify a block as being an instance of this component

  pattern: /^start-custom-image(([\S\s])*)end-custom-image$/,
  // Function to extract data elements from the regexp match
  fromBlock: function(match) {
    const attributes = {
      src: "",
      size: "",
      width: "",
      alt: "",
      align: "",
      description: "",
      shadow: ""
    };
    const attributesString = match["input"].match(/\((.*?)\)/);

    if (attributesString) {
      const attributesSplitted = attributesString[1].split("|");
      attributesSplitted.forEach(a => {
        const [attrName, attrValue] = a.split(":");
        if (!attrValue || attrValue === "undefined") {
          attributes[attrName] = "";
        } else {
          attributes[attrName] = attrValue;
        }
      });
    }

    return attributes;
  },
  // Function to create a text block from an instance of this component
  toBlock: function(obj) {
    // prettier-ignore
    return `start-custom-image(size:${obj.size}|align:${obj.align}|width:${
      obj.width
    }|src:${obj.src}|alt:${obj.alt}|description:${obj.description}|shadow:${obj.shadow})end-custom-image`;
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

CMS.registerEditorComponent({
  // Internal id of the component
  id: "importantText",
  // Visible label
  label: "Important text",
  // Fields the user need to fill out when adding an instance of the component
  fields: [
    { name: "text", label: "text", widget: "string" },
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

  pattern: /^start-important-text(([\S\s])*)end-important-text$/,
  // Function to extract data elements from the regexp match
  fromBlock: function(match) {
    const attributes = {
      text: ""
    };
    const attributesString = match["input"].match(/\((.*?)\)/);

    if (attributesString) {
      const attributesSplitted = attributesString[1].split("|");
      attributesSplitted.forEach(a => {
        const [attrName, attrValue] = a.split(":");
        if (!attrValue || attrValue === "undefined") {
          attributes[attrName] = "";
        } else {
          attributes[attrName] = attrValue;
        }
      });
    }

    return attributes;
  },
  // Function to create a text block from an instance of this component
  toBlock: function(obj) {
    // prettier-ignore
    return `start-important-text(text:${obj.text}|align:${obj.align})end-important-text`;
  },
  // Preview output for this component. Can either be a string or a React component
  // (component gives better render performance)
  toPreview: function(obj) {
    const output = `<div><span>${obj.text}</span></div>`;
    return output;
  }
});
