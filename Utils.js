export class Utils
{
static async GetDivFromHtmlFile(htmlFilePath, dataName)
{
    const response = await fetch(htmlFilePath);

    if (!response.ok)
    {
        throw new Error(
            `Failed to load HTML file: ${response.status} ${response.statusText}`
        );
    }

    const htmlText = await response.text();

    // Parse the HTML without inserting it into the main document DOM.
    const parser = new DOMParser();
    const document = parser.parseFromString(htmlText, "text/html");

    // Find the DIV with the requested data-name.
    const div = document.querySelector(
        `div[data-name="${CSS.escape(dataName)}"]`
    );

    if (!div)
    {
        throw new Error(
            `DIV with data-name="${dataName}" was not found.`
        );
    }

    return div;
}

static ClearGridCell(dataName)
{
    const cell = document.querySelector(
        `div[data-name="${CSS.escape(dataName)}"]`
    );

    if (!cell)
    {
        throw new Error(
            `Grid cell with data-name="${dataName}" was not found.`
        );
    }

    while (cell.firstElementChild)
    {
        cell.removeChild(cell.firstElementChild);
    }
}

static ClearContainer(dataName)
{
    const container = document.querySelector(
        `div[data-name="${CSS.escape(dataName)}"]`
    );

    if (!container)
    {
        throw new Error(
            `Container DIV with data-name="${dataName}" was not found.`
        );
    }

    while (container.firstElementChild)
    {
        container.removeChild(container.firstElementChild);
    }
}

static AppendElementToGridCell(element, dataName)
{
    if (!(element instanceof Element))
    {
        throw new TypeError("element must be a DOM element.");
    }

    const cell = document.querySelector(
        `div[data-name="${CSS.escape(dataName)}"]`
    );

    if (!cell)
    {
        throw new Error(
            `Grid cell with data-name="${dataName}" was not found.`
        );
    }

    cell.appendChild(element);
}

static AppendElementToContainer(element, dataName)
{
    if (!(element instanceof Element))
    {
        throw new TypeError("element must be a DOM element.");
    }

    const container = document.querySelector(
        `div[data-name="${CSS.escape(dataName)}"]`
    );

    if (!container)
    {
        throw new Error(
            `Container DIV with data-name="${dataName}" was not found.`
        );
    }

    container.appendChild(element);
    }

    static Subscribe(parentElement, dataName, eventName, handler)
    {
        const element = parentElement.querySelector(
            `[data-name="${CSS.escape(dataName)}"]`
        );

        if (!element)
        {
            throw new Error(
                `Element with data-name="${dataName}" was not found.`
            );
        }

        element.addEventListener(eventName, handler);
    }
}