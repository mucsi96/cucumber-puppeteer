import { inspect } from "util";
import { page } from ".";

type NodeData =
  | string
  | null
  | undefined
  | {
      name?: string;
      value?: string | null;
      children?: NodeData;
    }
  | NodeData[];

function getDataSnapshotPageFunction(elements: Element[]) {
  function getNodeName(element: Element): string | undefined {
    return element.id;
  }

  function getNodeData(node: Node): NodeData {
    const children = Array.prototype.map
      .call(node.childNodes, getNodeData)
      .filter(Boolean) as NodeData[];
    const name = getNodeName(node as Element);

    if (!name) {
      if (!children.length) {
        return null;
      }

      if (children.length === 1) {
        return children[0];
      }

      return children;
    }

    if (!children.length) {
      return { name, value: node.textContent };
    }

    if (children.length === 1) {
      return { name, children: children[0] };
    }

    return { name, children };
  }

  const data = elements.map(getNodeData).map((elementData) => {
    if (
      typeof elementData !== "object" ||
      elementData === null ||
      Array.isArray(elementData)
    ) {
      return elementData;
    }

    if (elementData.children) {
      return elementData.children;
    }

    return elementData.value;
  });

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
