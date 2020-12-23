import { inspect } from "util";
import { page } from ".";

type NodeData =
  | string
  | undefined
  | {
      name?: string;
      value?: NodeData;
      children?: NodeData[];
    }
  | NodeData[];

function getDataSnapshotPageFunction(elements: Element[]) {
  function getNodeName(element: Element): string | undefined {
    return element.id;
  }

  function getNodeData(node: Node): NodeData {
    if (node.nodeType === Node.TEXT_NODE) {
      return node.textContent?.trim();
    }

    const children = Array.prototype.map
      .call(node.childNodes, getNodeData)
      .filter(Boolean) as NodeData[];
    const name = getNodeName(node as Element);

    if (!children.length) {
      return;
    }

    if (children.length === 1) {
      if (name) {
        return { name, value: children[0] };
      }

      if (typeof children[0] === "string") {
        return;
      }

      return children[0];
    }

    if (!name) {
      return children;
    }

    return { name, children };
  }

  const data = elements
    .map(getNodeData)
    .map((elementData) =>
      typeof elementData === "object" &&
      elementData !== null &&
      "children" in elementData
        ? elementData.children
        : elementData
    );

  return JSON.stringify(data.length > 1 ? data : data[0]);
}

export async function getDataSnapshot(selector: string): Promise<string> {
  return inspect(
    JSON.parse(await page.$$eval(selector, getDataSnapshotPageFunction)),
    {
      depth: null,
    }
  );
}
